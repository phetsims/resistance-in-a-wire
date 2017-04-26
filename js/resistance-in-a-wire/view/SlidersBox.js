// Copyright 2016-2017, University of Colorado Boulder

/**
 * Container for sliders and adjacent text
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 * @author John Blanco (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Slider = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/Slider' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var RichText = require( 'SCENERY_PHET/RichText' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );

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
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  var resistanceString = require( 'string!RESISTANCE_IN_A_WIRE/resistance' );
  var resistivityString = require( 'string!RESISTANCE_IN_A_WIRE/resistivity' );
  var resistivitySymbolString = require( 'string!RESISTANCE_IN_A_WIRE/resistivitySymbol' );

  // constants
  var FONT_FAMILY = 'Times New Roman';
  var PANEL_WIDTH = 360;
  var PANEL_HEIGHT = 458;

  /**
   * @param {ResistanceInAWireModel} model
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function SlidersBox( model, tandem, options ) {

    Node.call( this );

    // xy grid that controls where the sliders and associated labels appear, values empirically determined
    // TODO: name these?
    var yCoords = [ 78, 118, 388, 453 ];
    var xCoords = [ 65, 180, 295 ];

    var resistivityText = new Text( Util.toFixed( model.resistivityProperty.value, 2 ), {
      font: new PhetFont( 30 ),
      textAlign: 'end',
      textAnchor: 'end',
      fill: ResistanceInAWireConstants.BLACK_COLOR,
      centerX: xCoords[ 0 ],
      top: yCoords[ 2 ],
      tandem: tandem.createTandem( 'resistivityValueText' )
    } );
    var lengthText = new Text( Util.toFixed( model.lengthProperty.value, 2 ), {
      font: new PhetFont( 28 ),
      textAlign: 'end',
      textAnchor: 'end',
      fill: '#000',
      centerX: xCoords[ 1 ],
      top: yCoords[ 2 ],
      tandem: tandem.createTandem( 'lengthValueText' )
    } );
    var areaText = new Text( Util.toFixed( model.areaProperty.value, 2 ), {
      font: new PhetFont( 28 ),
      textAlign: 'end',
      textAnchor: 'end',
      fill: ResistanceInAWireConstants.BLACK_COLOR,
      centerX: xCoords[ 2 ],
      top: yCoords[ 2 ],
      tandem: tandem.createTandem( 'areaValueText' )
    } );

    // TODO: use Panel and correct container structuring
    this.addChild( new Rectangle( 0, 0, PANEL_WIDTH, PANEL_HEIGHT, 12, 12, {
      fill: '#FFF',
      stroke: '#000',
      lineWidth: 3,
      tandem: tandem.createTandem( 'panel' )
    } ) );

    // add the dynamic title that indicates the resistance
    var dynamicResistanceTitle = new Text( '', {
      font: new PhetFont( 28 ),
      fill: '#F00',
      maxWidth: PANEL_WIDTH * 0.9,
      top: 12,
      tandem: tandem.createTandem( 'dynamicResistanceTitle' )
    } );
    this.addChild( dynamicResistanceTitle );

    // Update the title when the resistance changes. This does not need an unlink because it exists for the life of the sim.
    model.resistanceProperty.link( function( resistance ) {
      var numDecimalDigits = 2;
      if ( resistance > 9 ) {
        numDecimalDigits = 1;
      }
      if ( resistance > 99 ) {
        numDecimalDigits = 0;
      }
      dynamicResistanceTitle.text = StringUtils.format(
        pattern0Label1Value2UnitsString,
        resistanceString,
        Util.toFixed( resistance, numDecimalDigits ),
        ohmString
      );
      dynamicResistanceTitle.centerX = PANEL_WIDTH / 2;
    } );

    // Calculate a max width for the textual labels so that the labels don't overlap or go outside the bounds of the
    // box.  The multiplier is empirically determined.
    var maxTextWidth = PANEL_WIDTH * 0.25;

    this.addChild( new Text( resistivitySymbolString, {
      font: new PhetFont( { family: FONT_FAMILY, size: 60 } ),
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: xCoords[ 0 ],
      centerY: yCoords[ 0 ],
      maxWidth: maxTextWidth,
      tandem: tandem.createTandem( 'resistivitySymbolText' )
    } ) );
    this.addChild( new Text( resistivityString, {
      font: new PhetFont( 16 ),
      textAlign: 'center',
      textAnchor: 'middle',
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: xCoords[ 0 ],
      top: yCoords[ 1 ],
      maxWidth: maxTextWidth,
      tandem: tandem.createTandem( 'resistivityText' )
    } ) );
    this.addChild( resistivityText );
    this.addChild( new Text( StringUtils.format( pattern0ResistanceUnits1LengthUnitsString, ohmsSymbolString, cmString ), {
      font: new PhetFont( 30 ),
      textAlign: 'start',
      textAnchor: 'start',
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: xCoords[ 0 ],
      bottom: yCoords[ 3 ],
      maxWidth: maxTextWidth,
      tandem: tandem.createTandem( 'resistivityUnitText' )
    } ) );

    this.addChild( new Text( lengthSymbolString, {
      font: new PhetFont( { family: FONT_FAMILY, size: 60 } ),
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: xCoords[ 1 ],
      centerY: yCoords[ 0 ],
      maxWidth: maxTextWidth,
      tandem: tandem.createTandem( 'lengthSymbolText' )
    } ) );
    this.addChild( new Text( lengthString, {
      font: new PhetFont( 16 ),
      textAlign: 'center',
      textAnchor: 'middle',
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: xCoords[ 1 ],
      top: yCoords[ 1 ],
      maxWidth: maxTextWidth,
      tandem: tandem.createTandem( 'lengthText' )
    } ) );
    this.addChild( lengthText );
    this.addChild( new Text( cmString, {
      font: new PhetFont( 28 ),
      textAlign: 'start',
      textAnchor: 'start',
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: xCoords[ 1 ],
      bottom: yCoords[ 3 ],
      maxWidth: maxTextWidth,
      tandem: tandem.createTandem( 'lengthUnitsText' )
    } ) );

    this.addChild( new Text( areaSymbolString, {
      font: new PhetFont( { family: FONT_FAMILY, size: 60 } ),
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: xCoords[ 2 ],
      centerY: yCoords[ 0 ],
      maxWidth: maxTextWidth,
      tandem: tandem.createTandem( 'areaSymbolText' )
    } ) );
    this.addChild( new Text( areaString, {
      font: new PhetFont( 16 ),
      textAlign: 'center',
      textAnchor: 'middle',
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: xCoords[ 2 ],
      top: yCoords[ 1 ],
      maxWidth: maxTextWidth,
      tandem: tandem.createTandem( 'areaText' )
    } ) );
    this.addChild( areaText );
    this.addChild( new RichText( cmString + '<sup>2</sup>', {
      font: new PhetFont( 28 ),
      textAlign: 'start',
      textAnchor: 'start',
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: xCoords[ 2 ],
      bottom: yCoords[ 3 ],
      maxWidth: maxTextWidth,
      tandem: tandem.createTandem( 'areaUnitText' )
    } ) );

    this.addChild( new Slider( xCoords[ 0 ], model.resistivityProperty,
      ResistanceInAWireConstants.RESISTIVITY_RANGE, tandem.createTandem( 'resistivitySlider' ) ) );
    this.addChild( new Slider( xCoords[ 1 ], model.lengthProperty,
      ResistanceInAWireConstants.LENGTH_RANGE, tandem.createTandem( 'lengthSlider' ) ) );
    this.addChild( new Slider( xCoords[ 2 ], model.areaProperty,
      ResistanceInAWireConstants.AREA_RANGE, tandem.createTandem( 'areaSlider' ) ) );

    // Update the text when property values change. This does not need an unlink because it exists for the life of the sim.
    model.resistivityProperty.link( function( value ) {
      resistivityText.text = Util.toFixed( value, 2 );
      resistivityText.centerX = xCoords[ 0 ];
    } );
    model.lengthProperty.link( function( value ) {
      lengthText.text = Util.toFixed( value, 2 );
      lengthText.centerX = xCoords[ 1 ];
    } );
    model.areaProperty.link( function( value ) {
      areaText.text = Util.toFixed( value, 2 );
      areaText.centerX = xCoords[ 2 ];
    } );

    // pass options through
    this.mutate( options );
  }

  resistanceInAWire.register( 'SlidersBox', SlidersBox );

  return inherit( Node, SlidersBox );
} );