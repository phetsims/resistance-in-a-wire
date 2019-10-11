// Copyright 2017-2019, University of Colorado Boulder

/**
 * Panel for sliders, readouts and adjacent text
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 * @author John Blanco (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Panel = require( 'SUN/Panel' );
  const resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  const ResistanceInAWireA11yStrings = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireA11yStrings' );
  const ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  const ResistanceInAWireModel = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/model/ResistanceInAWireModel' );
  const ResistanceSoundGenerator = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/ResistanceSoundGenerator' );
  const SliderUnit = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/SliderUnit' );
  const soundManager = require( 'TAMBO/soundManager' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );
  const Utterance = require( 'SCENERY_PHET/accessibility/Utterance' );
  const utteranceQueue = require( 'SCENERY_PHET/accessibility/utteranceQueue' );

  // strings
  const areaString = require( 'string!RESISTANCE_IN_A_WIRE/area' );
  const areaSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/areaSymbol' );
  const cmString = require( 'string!RESISTANCE_IN_A_WIRE/cm' );
  const lengthString = require( 'string!RESISTANCE_IN_A_WIRE/length' );
  const lengthSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/lengthSymbol' );
  const ohmString = require( 'string!RESISTANCE_IN_A_WIRE/ohm' );
  const pattern0Label1Value2UnitsString = require( 'string!RESISTANCE_IN_A_WIRE/pattern.0label.1value.2units' );
  const pattern0ResistanceUnits1LengthUnitsString = require( 'string!RESISTANCE_IN_A_WIRE/pattern.0resistanceUnits.1lengthUnits' );
  const resistanceString = require( 'string!RESISTANCE_IN_A_WIRE/resistance' );
  const resistivityString = require( 'string!RESISTANCE_IN_A_WIRE/resistivity' );
  const symbolOhmsString = require( 'string!SCENERY_PHET/symbol.ohms' );
  const symbolResistivityString = require( 'string!SCENERY_PHET/symbol.resistivity' );

  // a11y strings (not ready for i18n)
  const resistivityUnitsPatternString = ResistanceInAWireA11yStrings.resistivityUnitsPatternString.value;
  const lengthUnitsPatternString = ResistanceInAWireA11yStrings.lengthUnitsPatternString.value;
  const areaUnitsPatternString = ResistanceInAWireA11yStrings.areaUnitsPatternString.value;
  const resistivitySliderLabelString = ResistanceInAWireA11yStrings.resistivitySliderLabelString.value;
  const lengthSliderLabelString = ResistanceInAWireA11yStrings.lengthSliderLabelString.value;
  const areaSliderLabelString = ResistanceInAWireA11yStrings.areaSliderLabelString.value;
  const sliderControlsString = ResistanceInAWireA11yStrings.sliderControlsString.value;
  const slidersDescriptionString = ResistanceInAWireA11yStrings.slidersDescriptionString.value;
  const sizeChangeAlertPatternString = ResistanceInAWireA11yStrings.sizeChangeAlertPatternString.value;
  const letterRhoString = ResistanceInAWireA11yStrings.letterRhoString.value;
  const letterLString = ResistanceInAWireA11yStrings.letterLString.value;
  const letterAString = ResistanceInAWireA11yStrings.letterAString.value;
  const growsString = ResistanceInAWireA11yStrings.growsString.value;
  const shrinksString = ResistanceInAWireA11yStrings.shrinksString.value;
  const growsALotString = ResistanceInAWireA11yStrings.growsALotString.value;
  const shrinksALotString = ResistanceInAWireA11yStrings.shrinksALotString.value;

  // constants
  const SLIDER_SPACING = 50;

  // a11y - if resistance changes 2 * the range of the resistance / the number of relative size descriptions, larger change
  // is signified in description
  const LARGE_RESISTANCE_DELTA = ( ( ResistanceInAWireModel.getResistanceRange().max - ResistanceInAWireModel.getResistanceRange().min ) / ResistanceInAWireConstants.RELATIVE_SIZE_STRINGS.length ) * 2;

  /**
   * @param {ResistanceInAWireModel} model
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function ControlPanel( model, tandem, options ) {

    options = merge( {
      xMargin: 30,
      yMargin: 20,
      lineWidth: 3,
      resize: false,
      tandem: tandem,
      preventFit: true,

      // a11y
      tagName: 'ul',
      labelTagName: 'h3',
      labelContent: sliderControlsString,
      descriptionContent: slidersDescriptionString
    }, options );

    // Add the dynamic title that indicates the resistance.
    const resistanceReadout = new Text( '', {
      font: ResistanceInAWireConstants.READOUT_FONT,
      fill: ResistanceInAWireConstants.RED_COLOR,
      maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH * 4.7,
      tandem: tandem.createTandem( 'resistanceReadout' )
    } );

    // Set the resistance readout to its initial value, then set the position.  Previously, the readout position was
    // re-centered every time the resistance changed, but it was decided that this looked too jumpy, so now it's
    // positioned only once, see https://github.com/phetsims/resistance-in-a-wire/issues/181.
    resistanceReadout.text = getResistanceReadoutText( model.resistanceProperty.value );
    resistanceReadout.centerX = 0;

    // Update the resistance readout when the resistance changes.
    model.resistanceProperty.link( function( resistance ) {
      resistanceReadout.text = getResistanceReadoutText( resistance );
    } );

    // a11y - when using a slider, we store the initial value on start drag so that we can describe size change after
    // interaction
    let resistanceOnStart = model.resistanceProperty.get();

    // a11y - an utterance for whenever physical values change
    const changeUtterance = new Utterance();

    // Create and add the resistivity slider with readout and labels.
    let rhoOnStart = model.resistivityProperty.get();
    const resistivitySlider = new SliderUnit(
      model.resistivityProperty,
      ResistanceInAWireConstants.RESISTIVITY_RANGE,
      symbolResistivityString,
      resistivityString,
      StringUtils.format( pattern0ResistanceUnits1LengthUnitsString, symbolOhmsString, cmString ),
      resistivitySliderLabelString,
      tandem.createTandem( 'resistivitySlider' ), {
        sliderOptions: {
          keyboardStep: 0.05, // ohm-cm
          shiftKeyStep: 0.01, // ohms-cm
          a11yCreateAriaValueText: value => StringUtils.fillIn( resistivityUnitsPatternString, { value: value } ),
          startDrag: function() {
            rhoOnStart = model.resistivityProperty.get();
            resistanceOnStart = model.resistanceProperty.get();
          },
          endDrag: function() {
            const resistance = model.resistanceProperty.get();
            const deltaRho = model.resistivityProperty.get() - rhoOnStart;
            const deltaResistance = resistance - resistanceOnStart;

            // announce to assistive technology if there is a change - no need to queue many alerts when pressing keys
            // rapidly
            if ( deltaRho && deltaResistance ) {
              changeUtterance.alert = getSizeChangeAlert( resistance, deltaResistance, deltaRho, letterRhoString );
              utteranceQueue.addToBack( changeUtterance );
            }
          }
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
        sliderOptions: {
          keyboardStep: 1.0, // cm
          shiftKeyboardStep: 0.01, // cm
          a11yCreateAriaValueText: value => StringUtils.fillIn( lengthUnitsPatternString, { value: value } ),
          startDrag: function() {
            lengthOnStart = model.lengthProperty.get();
            resistanceOnStart = model.resistanceProperty.get();
          },
          endDrag: function() {
            const resistance = model.resistanceProperty.get();
            const deltaLength = model.lengthProperty.get() - lengthOnStart;
            const deltaResistance = resistance - resistanceOnStart;

            // announce to assistive technology if there is a change - no need to queue many alerts when pressing keys
            // rapidly
            if ( deltaLength && deltaResistance ) {
              changeUtterance.alert = getSizeChangeAlert( resistance, deltaResistance, deltaLength, letterLString );
              utteranceQueue.addToBack( changeUtterance );
            }
          }
        }
      }
    );

    // Create and add the area slider with readout and labels. For keyboard dragging, the range ranges doesn't split into even steps,
    // so we calculate a keyboard step by breaking the range into 100.
    let areaOnStart = model.areaProperty.get();
    const areaSlider = new SliderUnit(
      model.areaProperty,
      ResistanceInAWireConstants.AREA_RANGE,
      areaSymbolString,
      areaString,
      cmString + '<sup>2</sup>',
      areaSliderLabelString,
      tandem.createTandem( 'areaSlider' ), {
        sliderOptions: {
          keyboardStep: 1.0, // cm^2
          shiftKeyboardStep: 0.01, // cm^2
          a11yCreateAriaValueText: value => StringUtils.fillIn( areaUnitsPatternString, { value: value } ),
          startDrag: function() {
            areaOnStart = model.areaProperty.get();
            resistanceOnStart = model.resistanceProperty.get();
          },
          endDrag: function() {
            const resistance = model.resistanceProperty.get();
            const deltaArea = model.areaProperty.get() - areaOnStart;
            const deltaResistance = resistance - resistanceOnStart;

            // announce to assistive technology if there is a change - no need to queue many alerts when pressing keys
            // rapidly
            if ( deltaArea && deltaResistance ) {
              changeUtterance.alert = getSizeChangeAlert( resistance, deltaResistance, deltaArea, letterAString );
              utteranceQueue.addToBack( changeUtterance );
            }
          }
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
      areaSlider: areaSlider,
      resetInProgressProperty: model.resetInProgressProperty
    } ) );

    // layout for the panel, HBox cannot be used because 'bottom' alignment cannot align RichText in SliderUnit
    lengthSlider.left = resistivitySlider.right + SLIDER_SPACING;
    areaSlider.left = lengthSlider.right + SLIDER_SPACING;
    sliders.centerX = 0;
    resistanceReadout.bottom = sliders.top - 12;

    // Because ControlPanel extends Panel, it needs pass a content node into its constructor to surround.
    // Add everything to the content node, then pass content to the Panel.call().
    const content = new Node( {
      children: [ resistanceReadout, sliders ],
      tandem: tandem.createTandem( 'content' )
    } );

    Panel.call( this, content, options );
  }

  resistanceInAWire.register( 'ControlPanel', ControlPanel );

  /**
   * Get a description for whether a letter grows or shrinks. Optionally, if the size changes enough, an additional
   * fragment is included that signifies this. Will return something like
   *
   * 'grows'
   * 'shrinks'
   * 'grows a lot'
   * 'shrinks a lot'
   *
   * @param {number} delta
   * @param {boolean} describeLargeChanges
   * @returns {string}
   */
  function getSizeChangeFromDelta( delta, describeLargeChanges ) {
    assert && assert( delta !== 0, 'trying to describe no change in size' );
    let description;

    const useALot = ( describeLargeChanges && Math.abs( delta ) > LARGE_RESISTANCE_DELTA );

    if ( delta > 0 ) {
      description = useALot ? growsALotString : growsString;
    }
    else if ( delta < 0 ) {
      description = useALot ? shrinksALotString : shrinksString;
    }

    return description;
  }

  /**
   * Get a full alert for size letter size and how R changes as well. Will return something like
   *
   * "As letter rho grows, letter R grows. Resistance no 0.667 ohms." or
   * "As letter A grows, letter R shrinks a lot. Resistance now 1.20 ohms"
   *
   * @param {number} resistance - current value of resistance
   * @param {number} deltaResistance - change in
   * @param {number} otherDelta - change in other variable, resistivity, length, or area
   * @param {string} letterString - the letter with size changes to describe
   * @returns {string}
   */
  function getSizeChangeAlert( resistance, deltaResistance, otherDelta, letterString ) {
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
   * get the string that should be shown on the resistance readout for a given resistance value
   * @param {number} resistance
   * @returns {string}
   */
  function getResistanceReadoutText( resistance ) {

    // the number of digits shown varies based on the range
    const numDecimalDigits = resistance >= 100 ? 0 : // Over 100, show no decimal points, like 102
                             resistance >= 10 ? 1 : // between 10.0 and 99.9, show 2 decimal points
                             resistance < 0.001 ? 4 : // when less than 0.001, show 4 decimals, see #125
                             resistance < 1 ? 3 : // when less than 1, show 3 decimal places, see #125
                             2; // Numbers less than 10 show 2 decimal points, like 8.35

    return StringUtils.format(
      pattern0Label1Value2UnitsString,
      resistanceString,
      Util.toFixed( resistance, numDecimalDigits ),
      ohmString
    );
  }

  return inherit( Panel, ControlPanel );
} );