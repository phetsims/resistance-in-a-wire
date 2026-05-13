// Copyright 2017-2026, University of Colorado Boulder

/**
 * Panel for sliders, readouts and adjacent text
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 * @author John Blanco (PhET Interactive Simulations)
 */

import Utils from '../../../../dot/js/Utils.js';
import optionize, { type EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import SceneryPhetFluent from '../../../../scenery-phet/js/SceneryPhetFluent.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Panel, { type PanelOptions } from '../../../../sun/js/Panel.js';
import soundManager from '../../../../tambo/js/soundManager.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Utterance from '../../../../utterance-queue/js/Utterance.js';
import ResistanceInAWireStrings from '../../ResistanceInAWireStrings.js';
import ResistanceInAWireModel from '../model/ResistanceInAWireModel.js';
import ResistanceInAWireConstants from '../ResistanceInAWireConstants.js';
import ResistanceSoundGenerator from './ResistanceSoundGenerator.js';
import SliderUnit from './SliderUnit.js';

type SelfOptions = EmptySelfOptions;
type ControlPanelOptions = SelfOptions & PanelOptions;

const areaString = ResistanceInAWireStrings.area;
const areaSymbolString = ResistanceInAWireStrings.areaSymbol;
const cmString = ResistanceInAWireStrings.cm;
const lengthString = ResistanceInAWireStrings.length;
const lengthSymbolString = ResistanceInAWireStrings.lengthSymbol;
const ohmString = ResistanceInAWireStrings.ohm;
const pattern0Label1Value2UnitsString = ResistanceInAWireStrings.pattern[ '0label' ][ '1value' ][ '2units' ];
const pattern0ResistanceUnits1LengthUnitsString = ResistanceInAWireStrings.pattern[ '0resistanceUnits' ][ '1lengthUnits' ];
const resistanceString = ResistanceInAWireStrings.resistance;
const resistivityString = ResistanceInAWireStrings.resistivity;
const symbolOhmsStringProperty = SceneryPhetFluent.symbol.ohmsStringProperty;
const symbolResistivityStringProperty = SceneryPhetFluent.symbol.resistivityStringProperty;

const resistivityUnitsPatternString = ResistanceInAWireStrings.a11y.wire.resistivityUnitsPattern;
const lengthUnitsPatternString = ResistanceInAWireStrings.a11y.controls.lengthUnitsPattern;
const areaUnitsPatternString = ResistanceInAWireStrings.a11y.controls.areaUnitsPattern;
const resistivitySliderLabelString = ResistanceInAWireStrings.a11y.controls.resistivitySliderLabel;
const lengthSliderLabelString = ResistanceInAWireStrings.a11y.controls.lengthSliderLabel;
const areaSliderLabelString = ResistanceInAWireStrings.a11y.controls.areaSliderLabel;
const sliderControlsString = ResistanceInAWireStrings.a11y.controls.sliderControls;
const slidersDescriptionString = ResistanceInAWireStrings.a11y.controls.slidersDescription;
const sizeChangeAlertPatternString = ResistanceInAWireStrings.a11y.controls.sizeChangeAlertPattern;
const letterRhoString = ResistanceInAWireStrings.a11y.controls.letterRho;
const letterLString = ResistanceInAWireStrings.a11y.controls.letterL;
const letterAString = ResistanceInAWireStrings.a11y.controls.letterA;
const growsString = ResistanceInAWireStrings.a11y.equation.alerts.grows;
const shrinksString = ResistanceInAWireStrings.a11y.equation.alerts.shrinks;
const growsALotString = ResistanceInAWireStrings.a11y.equation.alerts.growsALot;
const shrinksALotString = ResistanceInAWireStrings.a11y.equation.alerts.shrinksALot;

// constants
const SLIDER_SPACING = 50;

// pdom - if resistance changes 2 * the range of the resistance / the number of relative size descriptions, larger change
// is signified in description
const LARGE_RESISTANCE_DELTA = ( ( ResistanceInAWireModel.getResistanceRange().max - ResistanceInAWireModel.getResistanceRange().min ) / ResistanceInAWireConstants.RELATIVE_SIZE_STRINGS.length ) * 2;

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
      accessibleHeading: sliderControlsString,
      accessibleHelpText: slidersDescriptionString
    }, providedOptions );

    // Add the dynamic title that indicates the resistance.
    const resistanceText = new Text( '', {
      font: ResistanceInAWireConstants.READOUT_FONT,
      fill: ResistanceInAWireConstants.RED_COLOR,
      maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH * 4.7,
      tandem: tandem.createTandem( 'resistanceText' )
    } );

    // Set the resistance readout to its initial value, then set the position.  Previously, the readout position was
    // re-centered every time the resistance changed, but it was decided that this looked too jumpy, so now it's
    // positioned only once, see https://github.com/phetsims/resistance-in-a-wire/issues/181.
    resistanceText.string = getResistanceReadoutText( model.resistanceProperty.value );
    resistanceText.centerX = 0;

    // Update the resistance readout when the resistance changes.
    model.resistanceProperty.link( resistance => {
      resistanceText.string = getResistanceReadoutText( resistance );
    } );

    // pdom - when using a slider, we store the initial value on start drag so that we can describe size change after
    // interaction
    let resistanceOnStart = model.resistanceProperty.get();

    // pdom - an utterance for whenever physical values change
    const changeUtterance = new Utterance();

    // Create and add the resistivity slider with readout and labels.
    let rhoOnStart = model.resistivityProperty.get();
    const resistivitySlider = new SliderUnit(
      model.resistivityProperty,
      ResistanceInAWireConstants.RESISTIVITY_RANGE,
      symbolResistivityStringProperty,
      resistivityString,
      StringUtils.format( pattern0ResistanceUnits1LengthUnitsString, symbolOhmsStringProperty.value, cmString ),
      resistivitySliderLabelString,
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
            changeUtterance.alert = getSizeChangeAlert( resistance, deltaResistance, deltaRho, letterRhoString );
            resistivitySlider.addAccessibleContextResponse( changeUtterance );
          }
        },
        sliderOptions: {
          keyboardStep: 0.05, // ohm-cm
          createAriaValueText: ( value: number ) => StringUtils.fillIn( resistivityUnitsPatternString, { value: value } )
        }
      }
    );

    // Create and add the length slider with readout and labels.
    let lengthOnStart = model.lengthProperty.get();
    const lengthSlider = new SliderUnit(
      model.lengthProperty,
      ResistanceInAWireConstants.LENGTH_RANGE,
      lengthSymbolString,
      lengthString,
      cmString,
      lengthSliderLabelString,
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
            changeUtterance.alert = getSizeChangeAlert( resistance, deltaResistance, deltaLength, letterLString );
            lengthSlider.addAccessibleContextResponse( changeUtterance );
          }
        },
        sliderOptions: {
          createAriaValueText: ( value: number ) => StringUtils.fillIn( lengthUnitsPatternString, { value: value } )
        }
      }
    );

    // Create and add the area slider with readout and labels. For keyboard dragging, the range doesn't split into
    // even steps, so SliderUnit's default round-to-step behavior is used.
    let areaOnStart = model.areaProperty.get();
    const areaSlider = new SliderUnit(
      model.areaProperty,
      ResistanceInAWireConstants.AREA_RANGE,
      areaSymbolString,
      areaString,
      `${cmString}<sup>2</sup>`,
      areaSliderLabelString,
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
            changeUtterance.alert = getSizeChangeAlert( resistance, deltaResistance, deltaArea, letterAString );
            areaSlider.addAccessibleContextResponse( changeUtterance );
          }
        },
        sliderOptions: {
          createAriaValueText: ( value: number ) => StringUtils.fillIn( areaUnitsPatternString, { value: value } )
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
function getSizeChangeFromDelta( delta: number, describeLargeChanges: boolean ): string {
  assert && assert( delta !== 0, 'trying to describe no change in size' );

  const useALot = ( describeLargeChanges && Math.abs( delta ) > LARGE_RESISTANCE_DELTA );

  return delta > 0 ? ( useALot ? growsALotString : growsString ) :
         ( useALot ? shrinksALotString : shrinksString );
}

/**
 * Returns a full alert for a variable's size change and how R changes as well. Will return something like:
 *
 * "As letter rho grows, letter R grows. Resistance now 0.667 ohms." or
 * "As letter A grows, letter R shrinks a lot. Resistance now 1.20 ohms."
 */
function getSizeChangeAlert( resistance: number, deltaResistance: number, otherDelta: number, letterString: string ): string {
  const resistanceChangeString = getSizeChangeFromDelta( deltaResistance, true /* include 'a lot' */ );
  const letterChangeString = getSizeChangeFromDelta( otherDelta, false /* don't include 'a lot */ );

  return StringUtils.fillIn( sizeChangeAlertPatternString, {
    letter: letterString,
    letterChange: letterChangeString,
    rChange: resistanceChangeString,
    resistance: ResistanceInAWireConstants.getFormattedResistanceValue( resistance )
  } );
}

/**
 * Returns the string that should be shown on the resistance readout for a given resistance value.
 */
function getResistanceReadoutText( resistance: number ): string {

  // the number of digits shown varies based on the range
  const numDecimalDigits = resistance >= 100 ? 0 : // Over 100, show no decimal points, like 102
                           resistance >= 10 ? 1 : // between 10.0 and 99.9, show 2 decimal points
                           resistance < 0.001 ? 4 : // when less than 0.001, show 4 decimals, see #125
                           resistance < 1 ? 3 : // when less than 1, show 3 decimal places, see #125
                           2; // Numbers less than 10 show 2 decimal points, like 8.35

  return StringUtils.format(
    pattern0Label1Value2UnitsString,
    resistanceString,
    Utils.toFixed( resistance, numDecimalDigits ),
    ohmString
  );
}
