// Copyright 2017, University of Colorado Boulder

/**
 * Panel for sliders, readouts and adjacent text
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 * @author John Blanco (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireA11yStrings = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireA11yStrings' );
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  var ResistanceInAWireModel = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/model/ResistanceInAWireModel' );
  var SliderUnit = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/SliderUnit' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var Utterance = require( 'SCENERY_PHET/accessibility/Utterance' );
  var utteranceQueue = require( 'SCENERY_PHET/accessibility/utteranceQueue' );

  // strings
  var areaString = require( 'string!RESISTANCE_IN_A_WIRE/area' );
  var areaSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/areaSymbol' );
  var cmString = require( 'string!RESISTANCE_IN_A_WIRE/cm' );
  var lengthString = require( 'string!RESISTANCE_IN_A_WIRE/length' );
  var lengthSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/lengthSymbol' );
  var ohmString = require( 'string!RESISTANCE_IN_A_WIRE/ohm' );
  var pattern0Label1Value2UnitsString = require( 'string!RESISTANCE_IN_A_WIRE/pattern.0label.1value.2units' );
  var pattern0ResistanceUnits1LengthUnitsString = require( 'string!RESISTANCE_IN_A_WIRE/pattern.0resistanceUnits.1lengthUnits' );
  var resistanceString = require( 'string!RESISTANCE_IN_A_WIRE/resistance' );
  var resistivityString = require( 'string!RESISTANCE_IN_A_WIRE/resistivity' );

  // a11y strings (not ready for i18n)
  var resistivityUnitsPatternString = ResistanceInAWireA11yStrings.resistivityUnitsPatternString.value;
  var lengthUnitsPatternString = ResistanceInAWireA11yStrings.lengthUnitsPatternString.value;
  var areaUnitsPatternString = ResistanceInAWireA11yStrings.areaUnitsPatternString.value;
  var resistivitySliderLabelString = ResistanceInAWireA11yStrings.resistivitySliderLabelString.value;
  var lengthSliderLabelString = ResistanceInAWireA11yStrings.lengthSliderLabelString.value;
  var areaSliderLabelString = ResistanceInAWireA11yStrings.areaSliderLabelString.value;
  var sliderControlsString = ResistanceInAWireA11yStrings.sliderControlsString.value;
  var slidersDescriptionString = ResistanceInAWireA11yStrings.slidersDescriptionString.value;
  var sizeChangeAlertPatternString = ResistanceInAWireA11yStrings.sizeChangeAlertPatternString.value;
  var letterRhoString = ResistanceInAWireA11yStrings.letterRhoString.value;
  var letterLString = ResistanceInAWireA11yStrings.letterLString.value;
  var letterAString = ResistanceInAWireA11yStrings.letterAString.value;
  var growsString = ResistanceInAWireA11yStrings.growsString.value;
  var shrinksString = ResistanceInAWireA11yStrings.shrinksString.value;
  var growsALotString = ResistanceInAWireA11yStrings.growsALotString.value;
  var shrinksALotString = ResistanceInAWireA11yStrings.shrinksALotString.value;

  // constants
  var SLIDER_SPACING = 50;

  // a11y - if resistance changes 2 * the range of the resistance / the number of relative size descriptions, larger change
  // is signified in description
  var LARGE_RESISTANCE_DELTA = ( ( ResistanceInAWireModel.getResistanceRange().max - ResistanceInAWireModel.getResistanceRange().min ) / ResistanceInAWireConstants.RELATIVE_SIZE_STRINGS.length ) * 2;

  /**
   * @param {ResistanceInAWireModel} model
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function ControlPanel( model, tandem, options ) {

    options = _.extend( {
      xMargin: 30,
      yMargin: 20,
      lineWidth: 3,
      resize: false,
      tandem: tandem,
      preventFit: true,

      // a11y
      tagName: 'ul',
      labelTagName: 'h3',
      accessibleLabel: sliderControlsString,
      accessibleDescription: slidersDescriptionString,
      prependLabels: true
    }, options );

    // Add the dynamic title that indicates the resistance.
    var resistanceReadout = new Text( '', {
      font: ResistanceInAWireConstants.READOUT_FONT,
      fill: ResistanceInAWireConstants.RED_COLOR,
      maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH * 4.7,
      centerX: 0,
      tandem: tandem.createTandem( 'resistanceReadout' )
    } );

    // Update the resistance readout when the resistance changes.
    model.resistanceProperty.link( function( resistance ) {

      var numDecimalDigits = resistance >= 100 ? 0 : // Over 100, show no decimal points, like 102
                             resistance >= 10 ? 1 : // between 10.0 and 99.9, show 2 decimal points
                             resistance < 0.001 ? 4 : // when less than 0.001, show 4 decimals, see #125
                             resistance < 1 ? 3 : // when less than 1, show 3 decimal places, see #125
                             2; // Numbers less than 10 show 2 decimal points, like 8.35

      resistanceReadout.text = StringUtils.format(
        pattern0Label1Value2UnitsString,
        resistanceString,
        Util.toFixed( resistance, numDecimalDigits ),
        ohmString );
      resistanceReadout.centerX = 0;
    } );

    // a11y - when using a slider, we store the initial value on start drag so that we can describe size change after
    // interaction
    var resistanceOnStart = model.resistanceProperty.get();

    // Create and add the resistivity slider with readout and labels.
    var rhoOnStart = model.resistivityProperty.get();
    var resistivitySlider = new SliderUnit(
      model.resistivityProperty,
      ResistanceInAWireConstants.RESISTIVITY_RANGE,
      MathSymbols.RHO,
      resistivityString,
      StringUtils.format( pattern0ResistanceUnits1LengthUnitsString, MathSymbols.OHMS, cmString ),
      resistivitySliderLabelString,
      tandem.createTandem( 'resistivitySlider' ), {
        keyboardStep: 0.05, // ohm-cm
        shiftKeyStep: 0.01, // ohms-cm
        accessibleValuePattern: resistivityUnitsPatternString,
        startDrag: function() {
          rhoOnStart = model.resistivityProperty.get();
          resistanceOnStart = model.resistanceProperty.get();
        },
        endDrag: function() {
          var resistance = model.resistanceProperty.get();
          var deltaRho = model.resistivityProperty.get() - rhoOnStart;
          var deltaResistance = resistance - resistanceOnStart;

          // announce to assistive technology if there is a change - no need to queue many alerts when pressing keys
          // rapidly
          if ( deltaRho ) {
            utteranceQueue.addToBack( new Utterance( getSizeChangeAlert( resistance, deltaResistance, deltaRho, letterRhoString ), {
              typeId: 'rhoChangeAlert'
            } ) );
          }
        }
      }
    );

    // Create and add the length slider with readout and labels.
    var lengthOnStart = model.lengthProperty.get();
    var lengthSlider = new SliderUnit(
      model.lengthProperty,
      ResistanceInAWireConstants.LENGTH_RANGE,
      lengthSymbolString,
      lengthString,
      cmString,
      lengthSliderLabelString,
      tandem.createTandem( 'lengthSlider' ), {
        keyboardStep: 1.0, // cm
        shiftKeyboardStep: 0.01, // cm
        accessibleValuePattern: lengthUnitsPatternString,
        startDrag: function() {
          lengthOnStart = model.lengthProperty.get();
          resistanceOnStart = model.resistanceProperty.get();
        },
        endDrag: function() {
          var resistance = model.resistanceProperty.get();
          var deltaLength = model.lengthProperty.get() - lengthOnStart;
          var deltaResistance = resistance - resistanceOnStart;

          // announce to assistive technology if there is a change - no need to queue many alerts when pressing keys
          // rapidly
          if ( deltaLength ) {
            utteranceQueue.addToBack( new Utterance( getSizeChangeAlert( resistance, deltaResistance, deltaLength, letterLString ), {
              typeId: 'rhoChangeAlert'
            } ) );
          }
        }
      }
    );

    // Create and add the area slider with readout and labels. For keyboard dragging, the range ranges doesn't split into even steps,
    // so we calculate a keyboard step by breaking the range into 100.
    var areaOnStart = model.areaProperty.get();
    var areaSlider = new SliderUnit(
      model.areaProperty,
      ResistanceInAWireConstants.AREA_RANGE,
      areaSymbolString,
      areaString,
      cmString + '<sup>2</sup>',
      areaSliderLabelString,
      tandem.createTandem( 'areaSlider' ), {
        keyboardStep: 1.0, // cm^2
        shiftKeyboardStep: 0.01, // cm^2
        accessibleValuePattern: areaUnitsPatternString,
        startDrag: function() {
          areaOnStart = model.areaProperty.get();
          resistanceOnStart = model.resistanceProperty.get();
        },
        endDrag: function() {
          var resistance = model.resistanceProperty.get();
          var deltaArea = model.areaProperty.get() - areaOnStart;
          var deltaResistance = resistance - resistanceOnStart;

          // announce to assistive technology if there is a change - no need to queue many alerts when pressing keys
          // rapidly
          if ( deltaArea ) {
            utteranceQueue.addToBack( new Utterance( getSizeChangeAlert( resistance, deltaResistance, deltaArea, letterAString ), {
              typeId: 'rhoChangeAlert'
            } ) );
          }
        }
      }
    );

    var sliders = new Node( {
      children: [ resistivitySlider, lengthSlider, areaSlider ]
    } );

    // layout for the panel, HBox cannot be used because 'bottom' alignment cannot align RichText in SliderUnit
    lengthSlider.left = resistivitySlider.right + SLIDER_SPACING;
    areaSlider.left = lengthSlider.right + SLIDER_SPACING;
    sliders.centerX = 0;
    resistanceReadout.bottom = sliders.top - 12;

    // Because ControlPanel extends Panel, it needs pass a content node into its constructor to surround.
    // Add everything to the content node, then pass content to the Panel.call().
    var content = new Node( {
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
   * @return {string}
   */
  var getSizeChangeFromDelta = function( delta, describeLargeChanges ) {
    assert && assert ( delta !== 0, 'trying to describe no change in size' );
    var description;

    var useALot = ( describeLargeChanges && Math.abs( delta ) > LARGE_RESISTANCE_DELTA );

    if ( delta > 0 ) {
      description = useALot ? growsALotString : growsString;
    }
    else if ( delta < 0 ){
      description = useALot ? shrinksALotString : shrinksString;
    }

    return description;
  };

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
   * @return {string}
   */
  var getSizeChangeAlert = function( resistance, deltaResistance, otherDelta, letterString ) {
    var resistanceChangeString = getSizeChangeFromDelta( deltaResistance, true /*include 'a lot' */ );
    var letterChangeString = getSizeChangeFromDelta( otherDelta, false /*dont include 'a lot */ );

    return StringUtils.fillIn( sizeChangeAlertPatternString, {
      letter: letterString,
      letterChange: letterChangeString,
      rChange: resistanceChangeString,
      resistance: ResistanceInAWireConstants.getFormattedResistanceValue( resistance )
    } );
  };

  return inherit( Panel, ControlPanel );
} );