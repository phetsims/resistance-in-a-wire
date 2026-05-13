// Copyright 2017-2026, University of Colorado Boulder

/**
 * Panel for sliders, readouts and adjacent text
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 * @author John Blanco (PhET Interactive Simulations)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import optionize, { type EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import SceneryPhetFluent from '../../../../scenery-phet/js/SceneryPhetFluent.js';
import { centimetersSquaredUnit } from '../../../../scenery-phet/js/units/centimetersSquaredUnit.js';
import { centimetersUnit } from '../../../../scenery-phet/js/units/centimetersUnit.js';
import { ohmCentimetersUnit } from '../../../../scenery-phet/js/units/ohmCentimetersUnit.js';
import { ohmsUnit } from '../../../../scenery-phet/js/units/ohmsUnit.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Panel, { type PanelOptions } from '../../../../sun/js/Panel.js';
import soundManager from '../../../../tambo/js/soundManager.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Utterance from '../../../../utterance-queue/js/Utterance.js';
import ResistanceInAWireFluent from '../../ResistanceInAWireFluent.js';
import ResistanceInAWireModel from '../model/ResistanceInAWireModel.js';
import ResistanceInAWireConstants from '../ResistanceInAWireConstants.js';
import ResistanceSoundGenerator from './ResistanceSoundGenerator.js';
import SliderUnit from './SliderUnit.js';

type SelfOptions = EmptySelfOptions;
type ControlPanelOptions = SelfOptions & PanelOptions;

const areaStringProperty = ResistanceInAWireFluent.areaStringProperty;
const areaSymbolStringProperty = ResistanceInAWireFluent.areaSymbolStringProperty;
const cmStringProperty = ResistanceInAWireFluent.cmStringProperty;
const lengthStringProperty = ResistanceInAWireFluent.lengthStringProperty;
const lengthSymbolStringProperty = ResistanceInAWireFluent.lengthSymbolStringProperty;
const ohmStringProperty = ResistanceInAWireFluent.ohmStringProperty;
const pattern0Label1Value2UnitsStringProperty = ResistanceInAWireFluent.pattern[ '0label' ][ '1value' ][ '2unitsStringProperty' ];
const pattern0ResistanceUnits1LengthUnitsStringProperty = ResistanceInAWireFluent.pattern[ '0resistanceUnits' ][ '1lengthUnitsStringProperty' ];
const resistanceStringProperty = ResistanceInAWireFluent.resistanceStringProperty;
const resistivityStringProperty = ResistanceInAWireFluent.resistivityStringProperty;
const symbolOhmsStringProperty = SceneryPhetFluent.symbol.ohmsStringProperty;
const symbolResistivityStringProperty = SceneryPhetFluent.symbol.resistivityStringProperty;

const resistivitySliderLabelStringProperty = ResistanceInAWireFluent.a11y.controls.resistivitySliderLabelStringProperty;
const lengthSliderLabelStringProperty = ResistanceInAWireFluent.a11y.controls.lengthSliderLabelStringProperty;
const areaSliderLabelStringProperty = ResistanceInAWireFluent.a11y.controls.areaSliderLabelStringProperty;
const sliderControlsStringProperty = ResistanceInAWireFluent.a11y.controls.sliderControlsStringProperty;
const slidersDescriptionStringProperty = ResistanceInAWireFluent.a11y.controls.slidersDescriptionStringProperty;
const sizeChangeAlertPattern = ResistanceInAWireFluent.a11y.controls.sizeChangeAlertPattern;

// constants
const SLIDER_SPACING = 50;

const ACCESSIBLE_SLIDER_VALUE_OPTIONS = {
  decimalPlaces: ResistanceInAWireConstants.SLIDER_READOUT_DECIMALS,
  showTrailingZeros: false,
  showIntegersAsIntegers: true
};

// pdom - if resistance changes 2 * the range of the resistance / the number of relative size descriptions, larger change
// is signified in description
const LARGE_RESISTANCE_DELTA = ( ( ResistanceInAWireModel.getResistanceRange().max - ResistanceInAWireModel.getResistanceRange().min ) / ResistanceInAWireConstants.RELATIVE_SIZE_KEYS.length ) * 2;

type LetterKey = 'rho' | 'length' | 'area';
type SizeChangeKey = 'grows' | 'shrinks' | 'growsALot' | 'shrinksALot';

export default class ControlPanel extends Panel {
  public constructor( model: ResistanceInAWireModel, tandem: Tandem, providedOptions?: ControlPanelOptions ) {
    const options = optionize<ControlPanelOptions, SelfOptions, PanelOptions>()( {
      xMargin: 30,
      yMargin: 20,
      lineWidth: 3,
      resize: false,
      tandem: tandem,
      preventFit: true,

      // pdom
      tagName: 'ul',
      accessibleHeading: sliderControlsStringProperty,
      accessibleHelpText: slidersDescriptionStringProperty
    }, providedOptions );

    const resistanceReadoutStringProperty = new PatternStringProperty( pattern0Label1Value2UnitsStringProperty, {
      label: resistanceStringProperty,
      value: model.resistanceProperty,
      units: ohmStringProperty
    }, {

      // This pattern still uses StringUtils.format placeholders ({0}, {1}, {2}) in the string file. formatNames maps
      // those numbered placeholders to the named values above without changing the existing translation key or pattern.
      formatNames: [ 'label', 'value', 'units' ],
      maps: {
        value: resistance => ResistanceInAWireConstants.getFormattedResistanceValue( resistance )
      },
      tandem: tandem.createTandem( 'resistanceReadoutStringProperty' )
    } );

    // Add the dynamic title that indicates the resistance.
    const resistanceText = new Text( resistanceReadoutStringProperty, {
      font: ResistanceInAWireConstants.READOUT_FONT,
      fill: ResistanceInAWireConstants.RED_COLOR,
      maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH * 4.7,
      tandem: tandem.createTandem( 'resistanceText' )
    } );

    // Previously, the readout position was re-centered every time the resistance changed, but it was decided that this
    // looked too jumpy, so now it's positioned only once, see https://github.com/phetsims/resistance-in-a-wire/issues/181.
    resistanceText.centerX = 0;

    // pdom - when using a slider, we store the initial value on start drag so that we can describe size change after
    // interaction
    let resistanceOnStart = model.resistanceProperty.get();

    // pdom - an utterance for whenever physical values change
    const changeUtterance = new Utterance();

    // Create and add the resistivity slider with readout and labels.
    const resistivityUnitStringProperty = new PatternStringProperty( pattern0ResistanceUnits1LengthUnitsStringProperty, {
      resistanceUnits: symbolOhmsStringProperty,
      lengthUnits: cmStringProperty
    }, {

      // This pattern still uses StringUtils.format placeholders ({0}, {1}) in the string file. formatNames maps those
      // numbered placeholders to named values so we can keep the existing key and pattern intact for translations.
      formatNames: [ 'resistanceUnits', 'lengthUnits' ],
      tandem: tandem.createTandem( 'resistivityUnitStringProperty' )
    } );

    let rhoOnStart = model.resistivityProperty.get();
    const resistivitySlider = new SliderUnit(
      model.resistivityProperty,
      ResistanceInAWireConstants.RESISTIVITY_RANGE,
      symbolResistivityStringProperty,
      resistivityStringProperty,
      resistivityUnitStringProperty,
      resistivitySliderLabelStringProperty,
      tandem.createTandem( 'resistivitySlider' ), {
        startDrag: () => {
          rhoOnStart = model.resistivityProperty.get();
          resistanceOnStart = model.resistanceProperty.get();
        },
        endDrag: () => {
          const resistance = model.resistanceProperty.get();
          const deltaRho = model.resistivityProperty.get() - rhoOnStart;
          const deltaResistance = resistance - resistanceOnStart;

          // announce to assistive technology if there is a change - no need to queue many alerts when pressing keys
          // rapidly
          if ( deltaRho && deltaResistance ) {
            changeUtterance.alert = getSizeChangeAlert( resistance, deltaResistance, deltaRho, 'rho' );
            resistivitySlider.addAccessibleContextResponse( changeUtterance );
          }
        },
        sliderOptions: {
          keyboardStep: 0.05, // ohm-cm
          createAriaValueText: ( value: number ) => ohmCentimetersUnit.getAccessibleString( value, ACCESSIBLE_SLIDER_VALUE_OPTIONS )
        }
      }
    );

    // Create and add the length slider with readout and labels.
    let lengthOnStart = model.lengthProperty.get();
    const lengthSlider = new SliderUnit(
      model.lengthProperty,
      ResistanceInAWireConstants.LENGTH_RANGE,
      lengthSymbolStringProperty,
      lengthStringProperty,
      cmStringProperty,
      lengthSliderLabelStringProperty,
      tandem.createTandem( 'lengthSlider' ), {
        startDrag: () => {
          lengthOnStart = model.lengthProperty.get();
          resistanceOnStart = model.resistanceProperty.get();
        },
        endDrag: () => {
          const resistance = model.resistanceProperty.get();
          const deltaLength = model.lengthProperty.get() - lengthOnStart;
          const deltaResistance = resistance - resistanceOnStart;

          // announce to assistive technology if there is a change - no need to queue many alerts when pressing keys
          // rapidly
          if ( deltaLength && deltaResistance ) {
            changeUtterance.alert = getSizeChangeAlert( resistance, deltaResistance, deltaLength, 'length' );
            lengthSlider.addAccessibleContextResponse( changeUtterance );
          }
        },
        sliderOptions: {
          createAriaValueText: ( value: number ) => centimetersUnit.getAccessibleString( value, ACCESSIBLE_SLIDER_VALUE_OPTIONS )
        }
      }
    );

    // Create and add the area slider with readout and labels. For keyboard dragging, the range doesn't split into
    // even steps, so SliderUnit's default round-to-step behavior is used.
    let areaOnStart = model.areaProperty.get();
    const areaUnitStringProperty = new DerivedStringProperty( [ cmStringProperty ], cmString => `${cmString}<sup>2</sup>`, {
      tandem: tandem.createTandem( 'areaUnitStringProperty' )
    } );

    const areaSlider = new SliderUnit(
      model.areaProperty,
      ResistanceInAWireConstants.AREA_RANGE,
      areaSymbolStringProperty,
      areaStringProperty,
      areaUnitStringProperty,
      areaSliderLabelStringProperty,
      tandem.createTandem( 'areaSlider' ), {
        startDrag: () => {
          areaOnStart = model.areaProperty.get();
          resistanceOnStart = model.resistanceProperty.get();
        },
        endDrag: () => {
          const resistance = model.resistanceProperty.get();
          const deltaArea = model.areaProperty.get() - areaOnStart;
          const deltaResistance = resistance - resistanceOnStart;

          // announce to assistive technology if there is a change - no need to queue many alerts when pressing keys
          // rapidly
          if ( deltaArea && deltaResistance ) {
            changeUtterance.alert = getSizeChangeAlert( resistance, deltaResistance, deltaArea, 'area' );
            areaSlider.addAccessibleContextResponse( changeUtterance );
          }
        },
        sliderOptions: {
          createAriaValueText: ( value: number ) => centimetersSquaredUnit.getAccessibleString( value, ACCESSIBLE_SLIDER_VALUE_OPTIONS )
        }
      }
    );

    const sliders = new Node( {
      children: [ resistivitySlider, lengthSlider, areaSlider ]
    } );

    // add the sound generator for the resistance level
    soundManager.addSoundGenerator( new ResistanceSoundGenerator( {
      resistanceProperty: model.resistanceProperty,
      resistivityProperty: model.resistivityProperty,
      resistivitySlider: resistivitySlider,
      lengthProperty: model.lengthProperty,
      lengthSlider: lengthSlider,
      areaProperty: model.areaProperty,
      areaSlider: areaSlider
    } ) );

    // layout for the panel, HBox cannot be used because 'bottom' alignment cannot align RichText in SliderUnit
    lengthSlider.left = resistivitySlider.right + SLIDER_SPACING;
    areaSlider.left = lengthSlider.right + SLIDER_SPACING;
    sliders.centerX = 0;
    resistanceText.bottom = sliders.top - 12;

    // Because ControlPanel extends Panel, it needs pass a content node into its constructor to surround.
    // Add everything to the content node, then pass content to the Panel.call().
    const content = new Node( {
      children: [ resistanceText, sliders ],
      tandem: tandem.createTandem( 'content' )
    } );

    super( content, options );
  }
}

/**
 * Returns a description for whether a letter grows or shrinks. For resistance changes, an additional phrase is
 * included when the change is large enough to be pedagogically useful. Will return something like:
 *
 * 'grows'
 * 'shrinks'
 * 'grows a lot'
 * 'shrinks a lot'
 */
function getSizeChangeFromDelta( delta: number, describeLargeChanges: boolean ): SizeChangeKey {
  assert && assert( delta !== 0, 'trying to describe no change in size' );

  const useALot = ( describeLargeChanges && Math.abs( delta ) > LARGE_RESISTANCE_DELTA );

  return delta > 0 ? ( useALot ? 'growsALot' : 'grows' ) :
         ( useALot ? 'shrinksALot' : 'shrinks' );
}

/**
 * Returns a full alert for a variable's size change and how R changes as well. Will return something like:
 *
 * "As letter rho grows, letter R grows. Resistance now 0.667 ohms." or
 * "As letter A grows, letter R shrinks a lot. Resistance now 1.20 ohms."
 */
function getSizeChangeAlert( resistance: number, deltaResistance: number, otherDelta: number, letterKey: LetterKey ): string {
  const resistanceChangeKey = getSizeChangeFromDelta( deltaResistance, true /* include 'a lot' */ );
  const letterChangeKey = getSizeChangeFromDelta( otherDelta, false /* don't include 'a lot */ );

  return sizeChangeAlertPattern.format( {
    letter: letterKey,
    letterChange: letterChangeKey,
    rChange: resistanceChangeKey,
    resistance: ohmsUnit.getAccessibleString( resistance, {
      decimalPlaces: ResistanceInAWireConstants.getResistanceDecimals( resistance ),
      showTrailingZeros: false,
      showIntegersAsIntegers: true
    } )
  } );
}
