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
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireA11yStrings = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireA11yStrings' );
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  var SliderUnit = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/SliderUnit' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // strings
  var areaString = require( 'string!RESISTANCE_IN_A_WIRE/area' );
  var areaSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/areaSymbol' );
  var cmString = require( 'string!RESISTANCE_IN_A_WIRE/cm' );
  var lengthString = require( 'string!RESISTANCE_IN_A_WIRE/length' );
  var lengthSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/lengthSymbol' );
  var ohmsSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/ohmsSymbol' );
  var ohmString = require( 'string!RESISTANCE_IN_A_WIRE/ohm' );
  var pattern0Label1Value2UnitsString = require( 'string!RESISTANCE_IN_A_WIRE/pattern.0label.1value.2units' );
  var pattern0ResistanceUnits1LengthUnitsString = require( 'string!RESISTANCE_IN_A_WIRE/pattern.0resistanceUnits.1lengthUnits' );
  var resistanceString = require( 'string!RESISTANCE_IN_A_WIRE/resistance' );
  var resistivityString = require( 'string!RESISTANCE_IN_A_WIRE/resistivity' );
  var resistivitySymbolString = require( 'string!RESISTANCE_IN_A_WIRE/resistivitySymbol' );

  // a11y strings (not ready for i18n)
  var resistivityUnitsPatternString = ResistanceInAWireA11yStrings.resistivityUnitsPatternString;
  var lengthUnitsPatternString = ResistanceInAWireA11yStrings.lengthUnitsPatternString;
  var areaUnitsPatternString = ResistanceInAWireA11yStrings.areaUnitsPatternString;
  var resistivitySliderLabelString = ResistanceInAWireA11yStrings.resistivitySliderLabelString;
  var lengthSliderLabelString = ResistanceInAWireA11yStrings.lengthSliderLabelString;
  var areaSliderLabelString = ResistanceInAWireA11yStrings.areaSliderLabelString;

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
      preventFit: true // used to avoid jostling in the control panel when the the resistance changes quickly, see https://github.com/phetsims/ohms-law/issues/68
    }, options );

    // Add the dynamic title that indicates the resistance.
    var resistanceReadout = new Text( '', {
      font: ResistanceInAWireConstants.READOUT_FONT,
      fill: ResistanceInAWireConstants.RED_COLOR,
      maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH * 4.9,
      centerX: 0,
      tandem: tandem.createTandem( 'resistanceReadout' )
    } );

    // Update the resistance readout when the resistance changes.
    model.resistanceProperty.link( function( resistance ) {

      var numDecimalDigits = resistance >= 100 ? 0 : // Over 100, show no decimal points, like 102
                             resistance >= 10 ? 1 : // between 10.0 and 99.9, show 2 decimal points
                             2; // Numbers less than 10 show 2 decimal points, like 8.35

      resistanceReadout.text = StringUtils.format(
        pattern0Label1Value2UnitsString,
        resistanceString,
        Util.toFixed( resistance, numDecimalDigits ),
        ohmString );
      resistanceReadout.centerX = 0;
    } );

    // Create and add the resistivity slider with readout and labels.
    var resistivitySlider = new SliderUnit(
      model.resistivityProperty,
      ResistanceInAWireConstants.RESISTIVITY_RANGE,
      resistivitySymbolString,
      resistivityString,
      StringUtils.format( pattern0ResistanceUnits1LengthUnitsString, ohmsSymbolString, cmString ),
      resistivitySliderLabelString,
      tandem.createTandem( 'resistivitySlider' ), {
        maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH,
        keyboardStep: 0.05, // ohm-cm
        shiftKeyStep: 0.01, // ohms-cm
        accessibleValuePattern: resistivityUnitsPatternString
      }
    );

    // Create and add the length slider with readout and labels.
    var lengthSlider = new SliderUnit(
      model.lengthProperty,
      ResistanceInAWireConstants.LENGTH_RANGE,
      lengthSymbolString,
      lengthString,
      cmString,
      lengthSliderLabelString,
      tandem.createTandem( 'lengthSlider' ), {
        maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH,
        keyboardStep: 1.0, // cm
        shiftKeyboardStep: 0.01, // cm
        accessibleValuePattern: lengthUnitsPatternString
      }
    );

    // Create and add the area slider with readout and labels. For keyboard dragging, the range ranges doesn't split into even steps,
    // so we calculate a keyboard step by breaking the range into 100.
    var areaSlider = new SliderUnit(
      model.areaProperty,
      ResistanceInAWireConstants.AREA_RANGE,
      areaSymbolString,
      areaString,
      cmString + '<sup>2</sup>',
      areaSliderLabelString,
      tandem.createTandem( 'areaSlider' ), {
        maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH,
        keyboardStep: 1.0, // cm^2
        shiftKeyboardStep: 0.01, // cm^2
        accessibleValuePattern: areaUnitsPatternString
      }
    );

    var sliders = new HBox( {
      spacing: 48, // empirically determined
      children: [ resistivitySlider, lengthSlider, areaSlider ],
      centerX: 0,

      // a11y
      tagName: 'ul'
    } );

    resistanceReadout.bottom = sliders.top - 10;

    // Because ControlPanel extends Panel, it needs pass a content node into its constructor to surround.
    // Add everything to the content node, then pass content to the Panel.call().
    var content = new Node( {
      children: [ resistanceReadout, sliders ],
      tandem: tandem.createTandem( 'content' )
    } );

    Panel.call( this, content, options );
  }

  resistanceInAWire.register( 'ControlPanel', ControlPanel );

  return inherit( Panel, ControlPanel );
} );