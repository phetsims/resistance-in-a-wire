// Copyright 2018-2026, University of Colorado Boulder

/**
 * A sound generator used to indicate the resistance level in the RIAW simulation.  This uses the values for the
 * resistivity, length, and area of the wire to decide WHEN to generate a sound, and the value of the resistance to
 * determine the nature of the sound to be generated.
 *
 * NOTE:
 * This class is intentionally more specific than Slider's built-in value change sound support. It tracks each
 * slider's current bin state, plays on bin transitions or rmin/max, and every keyboard driven value change.
 * It maps pitch from resulting resistance rather than from the slider value itself.
 *
 * Slider's built-in ValueChangeSoundPlayer can approximate this with threshold and custom playback rate mapping.
 * But it does not preserve the exact stateful bin behavior. Matching exactly through Slider options would require
 * pushing sim-specific state and interaction mode logic into the abstraction, which isn't a good fit. Keeping the
 * custom generator preserves the initial design exactly and avoids a hacky layer around Slider.
 *
 * @author John Blanco
 */

import type { PropertyLazyLinkListener, TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import optionize from '../../../../phet-core/js/optionize.js';
import SoundClip, { type SoundClipOptions } from '../../../../tambo/js/sound-generators/SoundClip.js';
import brightMarimbaShort_mp3 from '../../../../tambo/sounds/brightMarimbaShort_mp3.js';
import ResistanceInAWireConstants from '../ResistanceInAWireConstants.js';
import type SliderUnit from './SliderUnit.js';

type SelfOptions = {
  resistanceProperty: TReadOnlyProperty<number>;
  resistivityProperty: TReadOnlyProperty<number>;
  resistivitySlider: SliderUnit;
  lengthProperty: TReadOnlyProperty<number>;
  lengthSlider: SliderUnit;
  areaProperty: TReadOnlyProperty<number>;
  areaSlider: SliderUnit;
};

type ResistanceSoundGeneratorConfig = SelfOptions & SoundClipOptions;

// constants
const BINS_PER_SLIDER = 9; // odd numbers generally work best because a bin then spans the middle initial value
const MIN_RESISTANCE = ResistanceInAWireConstants.RESISTANCE_RANGE.min;
const MAX_RESISTANCE = ResistanceInAWireConstants.RESISTANCE_RANGE.max;
const MIN_RESISTIVITY = ResistanceInAWireConstants.RESISTIVITY_RANGE.min;
const MAX_RESISTIVITY = ResistanceInAWireConstants.RESISTIVITY_RANGE.max;
const MIN_AREA = ResistanceInAWireConstants.AREA_RANGE.min;
const MAX_AREA = ResistanceInAWireConstants.AREA_RANGE.max;
const MIN_LENGTH = ResistanceInAWireConstants.LENGTH_RANGE.min;
const MAX_LENGTH = ResistanceInAWireConstants.LENGTH_RANGE.max;

export default class ResistanceSoundGenerator extends SoundClip {

  private readonly disposeResistanceSoundGenerator: () => void;

  /**
   * @param config - includes property values for the wire and the sliders that control each value.
   */
  public constructor( config: ResistanceSoundGeneratorConfig ) {

    const resolvedConfig = optionize<ResistanceSoundGeneratorConfig, SelfOptions, SoundClipOptions>()( {
      initialOutputLevel: 0.5,
      rateChangesAffectPlayingSounds: false
    }, config );

    super( brightMarimbaShort_mp3, resolvedConfig );

    // Function to map the resistance to a playback speed and play the sound.
    const playResistanceSound = () => {

      if ( this.fullyEnabled ) {

        // normalize the resistance value between 0 and 1, taking into account several orders of magnitude
        const normalizedResistance = Math.log( resolvedConfig.resistanceProperty.value / MIN_RESISTANCE ) /
                                     Math.log( MAX_RESISTANCE / MIN_RESISTANCE );

        // map the normalized resistance value to a playback rate for the sound clip
        const playbackRate = Math.pow( 2, ( 1 - normalizedResistance ) * 3 ) / 3;

        this.setPlaybackRate( playbackRate );
        this.play();
      }
    };

    // Objects that monitor the parameter and play the sound, references kept for disposal.
    const resistivityMonitor = new ParameterMonitor(
      resolvedConfig.resistivityProperty,
      resolvedConfig.resistivitySlider,
      new Range( MIN_RESISTIVITY, MAX_RESISTIVITY ),
      playResistanceSound
    );
    const lengthMonitor = new ParameterMonitor(
      resolvedConfig.lengthProperty,
      resolvedConfig.lengthSlider,
      new Range( MIN_LENGTH, MAX_LENGTH ),
      playResistanceSound
    );
    const areaMonitor = new ParameterMonitor(
      resolvedConfig.areaProperty,
      resolvedConfig.areaSlider,
      new Range( MIN_AREA, MAX_AREA ),
      playResistanceSound
    );

    this.disposeResistanceSoundGenerator = () => {
      resistivityMonitor.dispose();
      lengthMonitor.dispose();
      areaMonitor.dispose();
    };
  }

  public override dispose(): void {
    this.disposeResistanceSoundGenerator();
    super.dispose();
  }
}

class BinSelector {

  private readonly minValue: number;
  private readonly maxValue: number;
  private readonly span: number;
  private readonly numBins: number;

  /**
   * Inner type for placing values in a bin.
   */
  public constructor( minValue: number, maxValue: number, numBins: number ) {

    // parameter checking
    assert && assert( maxValue > minValue );
    assert && assert( numBins > 0 );

    this.minValue = minValue;
    this.maxValue = maxValue;
    this.span = this.maxValue - this.minValue;
    this.numBins = numBins;

  }

  /**
   * Put the provided value in a bin.
   */
  public selectBin( value: number ): number {
    assert && assert( value <= this.maxValue );
    assert && assert( value >= this.minValue );

    // this calculation means that values on the boundaries will go into the higher bin except for the max value
    const proportion = ( value - this.minValue ) / this.span;
    return Math.min( Math.floor( proportion * this.numBins ), this.numBins - 1 );
  }

}

class ParameterMonitor {

  private readonly valueProperty: TReadOnlyProperty<number>;
  private readonly valuePropertyListener: PropertyLazyLinkListener<number>;

  /**
   * Inner type for monitoring a parameter and playing a sound when warranted.
   */
  public constructor( valueProperty: TReadOnlyProperty<number>,
                      sliderUnit: SliderUnit,
                      parameterRange: Range,
                      generateSound: () => void ) {
    const binSelector = new BinSelector( parameterRange.min, parameterRange.max, BINS_PER_SLIDER );
    let selectedBin = binSelector.selectBin( valueProperty.value );

    this.valueProperty = valueProperty;

    this.valuePropertyListener = ( parameterValue: number ) => {
      const bin = binSelector.selectBin( parameterValue );

      // Play the sound if a change has occurred due to keyboard interaction, if the area value has moved to a new bin,
      // or if a min or max has been reached.
      if ( sliderUnit.keyboardDraggingProperty.value || bin !== selectedBin ||
           parameterValue === parameterRange.min || parameterValue === parameterRange.max ) {
        generateSound();
      }
      selectedBin = bin;
    };

    // Hook up the listener.
    valueProperty.lazyLink( this.valuePropertyListener );
  }

  public dispose(): void {
    this.valueProperty.unlink( this.valuePropertyListener );
  }
}
