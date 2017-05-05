// Copyright 2016-2017, University of Colorado Boulder

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
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var SliderUnit = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/SliderUnit' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );

  // strings
  var areaString = require( 'string!RESISTANCE_IN_A_WIRE/area' );
  var areaSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/areaSymbol' );
  var cmString = require( 'string!RESISTANCE_IN_A_WIRE/cm' );
  var lengthString = require( 'string!RESISTANCE_IN_A_WIRE/length' );
  var lengthSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/lengthSymbol' );
  var ohmString = require( 'string!RESISTANCE_IN_A_WIRE/ohm' );
  var ohmsSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/ohmsSymbol' );
  var pattern0Label1Value2UnitsString = require( 'string!RESISTANCE_IN_A_WIRE/pattern.0label.1value.2units' );
  var pattern0ResistanceUnits1LengthUnitsString = require( 'string!RESISTANCE_IN_A_WIRE/pattern.0resistanceUnits.1lengthUnits' );
  var resistanceString = require( 'string!RESISTANCE_IN_A_WIRE/resistance' );
  var resistivityString = require( 'string!RESISTANCE_IN_A_WIRE/resistivity' );
  var resistivitySymbolString = require( 'string!RESISTANCE_IN_A_WIRE/resistivitySymbol' );

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
      tandem: tandem
    }, options );

    // Add the dynamic title that indicates the resistance.
    var resistanceReadout = new Text( '', {
      font: ResistanceInAWireConstants.READOUT_FONT,
      fill: ResistanceInAWireConstants.RED_COLOR,
      maxWidth: ResistanceInAWireConstants.SLIDERS_HORIZONTAL_SEPARATION * 2.5,
      top: 12,
      tandem: tandem.createTandem( 'resistanceReadout' )
    } );

    // Update the title when the resistance changes.
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
      tandem.createTandem( 'resistivitySlider' )
    );

    // Create and add the length slider with readout and labels.
    var lengthSlider = new SliderUnit(
      model.lengthProperty,
      ResistanceInAWireConstants.LENGTH_RANGE,
      lengthSymbolString,
      lengthString,
      cmString,
      tandem.createTandem( 'lengthSlider' )
    );

    // Create and add the area slider with readout and labels.
    var areaSlider = new SliderUnit(
      model.areaProperty,
      ResistanceInAWireConstants.AREA_RANGE,
      areaSymbolString,
      areaString,
      cmString + '<sup>2</sup>',
      tandem.createTandem( 'areaSlider' )
    );

    // Set the horizontal position of the sliders, defining the middle slider as zero.
    lengthSlider.centerX = 0;
    resistivitySlider.centerX = lengthSlider.centerX - ResistanceInAWireConstants.SLIDERS_HORIZONTAL_SEPARATION;
    areaSlider.centerX = lengthSlider.centerX + ResistanceInAWireConstants.SLIDERS_HORIZONTAL_SEPARATION;

    // Because ControlPanel extends Panel, it needs pass a content node into its constructor to surround.
    // Add everything to the content node, then pass content to the Panel.call().
    var content = new Node( {
      children: [ resistanceReadout, resistivitySlider, lengthSlider, areaSlider ],
      tandem: tandem.createTandem( 'content' )
    } );

    Panel.call( this, content, options );
  }

  resistanceInAWire.register( 'ControlPanel', ControlPanel );

  return inherit( Panel, ControlPanel );
} );