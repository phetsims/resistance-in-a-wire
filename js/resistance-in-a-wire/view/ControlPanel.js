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
   * @constructor
   */
  function ControlPanel( model, tandem ) {

    var content = new Node();

    // add the dynamic title that indicates the resistance
    var resistanceReadout = new Text( '', {
      font: ResistanceInAWireConstants.READOUT_FONT,
      fill: ResistanceInAWireConstants.RED_COLOR,
      maxWidth: ResistanceInAWireConstants.SLIDERS_HORIZONTAL_SEPARATION * 2.5,
      top: 12
    } );
    content.addChild( resistanceReadout );

    // update the title when the resistance changes
    model.resistanceProperty.link( function( resistance ) {
      var numDecimalDigits = 2;
      if ( resistance > 9 ) {
        numDecimalDigits = 1;
      }
      if ( resistance > 99 ) {
        numDecimalDigits = 0;
      }
      resistanceReadout.text = StringUtils.format(
        pattern0Label1Value2UnitsString,
        resistanceString,
        Util.toFixed( resistance, numDecimalDigits ),
        ohmString );
      resistanceReadout.centerX = 0;
    } );

    // create the resistivity slider with readout and labels
    var resistivitySlider = new SliderUnit(
      model.resistivityProperty,
      ResistanceInAWireConstants.RESISTIVITY_RANGE,
      resistivitySymbolString,
      resistivityString,
      StringUtils.format( pattern0ResistanceUnits1LengthUnitsString, ohmsSymbolString, cmString ),
      tandem.createTandem( 'resistivitySlider' ) );

    // create the length slider with readout and labels
    var lengthSlider = new SliderUnit(
      model.lengthProperty,
      ResistanceInAWireConstants.LENGTH_RANGE,
      lengthSymbolString,
      lengthString,
      cmString,
      tandem.createTandem( 'lengthSlider' ) );

    // create the area slider with readout and labels
    var areaSlider = new SliderUnit(
      model.areaProperty,
      ResistanceInAWireConstants.AREA_RANGE,
      areaSymbolString,
      areaString,
      cmString + '<sup>2</sup>',
      tandem.createTandem( 'areaSlider' ) );

    content.addChild( resistivitySlider );
    content.addChild( lengthSlider );
    content.addChild( areaSlider );

    // set the horizontal position of the sliders, defining the middle slider as zero
    lengthSlider.centerX = 0;
    resistivitySlider.centerX = lengthSlider.centerX - ResistanceInAWireConstants.SLIDERS_HORIZONTAL_SEPARATION;
    areaSlider.centerX = lengthSlider.centerX + ResistanceInAWireConstants.SLIDERS_HORIZONTAL_SEPARATION;

    Panel.call( this, content, {
      xMargin: 30,
      yMargin: 20,
      lineWidth: 3,
      resize: false,
      tandem: tandem.createTandem( 'containingPanel' )
    } );
  }

  resistanceInAWire.register( 'ControlPanel', ControlPanel );

  return inherit( Panel, ControlPanel, {} );
} );