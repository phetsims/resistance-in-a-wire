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
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var WhiteBox = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/WhiteBox' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );

  // images
  var sliderImage = require( 'image!RESISTANCE_IN_A_WIRE/slider.png' );

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

  /**
   * @param {ResistanceInAWireModel} model
   * @param {Object} [options]
   * @constructor
   */
  function SlidersBox( model, options ) {

    Node.call( this );

    var panelWidth = 360;
    var panelHeight = 458;
    var textResistivity;
    var textLength;
    var textArea;
    this.addChild( new WhiteBox( 0, 0, panelWidth, panelHeight ) );

    // add the dynamic title that indicates the resistance
    var dynamicTitle = new Text( '', {
      font: new PhetFont( 28 ),
      fill: '#F00',
      maxWidth: panelWidth * 0.9,
      top: 12
    } );
    this.addChild( dynamicTitle );

    // update the title when the resistance changes
    model.resistanceProperty.link( function( resistance ) {
      var numDecimalDigits = 2;
      if ( resistance > 9 ) {
        numDecimalDigits = 1;
      }
      if ( resistance > 99 ) {
        numDecimalDigits = 0;
      }
      dynamicTitle.text = StringUtils.format(
        pattern0Label1Value2UnitsString,
        resistanceString,
        Util.toFixed( resistance, numDecimalDigits ),
        ohmString );
      dynamicTitle.centerX = panelWidth / 2;
    } );

    // xy grid that controls where the sliders and associated labels appear, values empirically determined
    var yCoords = [ 78, 118, 388, 453 ];
    var xCoords = [ 65, 180, 295 ];

    // Calculate a max width for the textual labels so that the labels don't overlap or go outside the bounds of the
    // box.  The multiplier is empirically determined.
    var maxTextWidth = panelWidth * 0.25;

    this.addChild( new Text( resistivitySymbolString, {
      font: new PhetFont( { family: FONT_FAMILY, size: 60 } ),
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: xCoords[ 0 ],
      centerY: yCoords[ 0 ],
      maxWidth: maxTextWidth
    } ) );
    this.addChild( new Text( resistivityString, {
      font: new PhetFont( 16 ),
      textAlign: 'center',
      textAnchor: 'middle',
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: xCoords[ 0 ],
      top: yCoords[ 1 ],
      maxWidth: maxTextWidth
    } ) );
    this.addChild( textResistivity = new Text( Util.toFixed( model.resistivityProperty.value, 2 ), {
      font: new PhetFont( 30 ),
      textAlign: 'end',
      textAnchor: 'end',
      fill: ResistanceInAWireConstants.BLACK_COLOR,
      centerX: xCoords[ 0 ],
      top: yCoords[ 2 ]
    } ) );
    this.addChild( new Text( StringUtils.format( pattern0ResistanceUnits1LengthUnitsString, ohmsSymbolString, cmString ), {
      font: new PhetFont( 30 ),
      textAlign: 'start',
      textAnchor: 'start',
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: xCoords[ 0 ],
      bottom: yCoords[ 3 ],
      maxWidth: maxTextWidth
    } ) );

    this.addChild( new Text( lengthSymbolString, {
      font: new PhetFont( { family: FONT_FAMILY, size: 60 } ),
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: xCoords[ 1 ],
      centerY: yCoords[ 0 ],
      maxWidth: maxTextWidth
    } ) );
    this.addChild( new Text( lengthString, {
      font: new PhetFont( 16 ),
      textAlign: 'center',
      textAnchor: 'middle',
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: xCoords[ 1 ],
      top: yCoords[ 1 ],
      maxWidth: maxTextWidth
    } ) );
    this.addChild( textLength = new Text( Util.toFixed( model.lengthProperty.value, 2 ), {
      font: new PhetFont( 28 ),
      textAlign: 'end',
      textAnchor: 'end',
      fill: '#000',
      centerX: xCoords[ 1 ],
      top: yCoords[ 2 ]
    } ) );
    this.addChild( new Text( cmString, {
      font: new PhetFont( 28 ),
      textAlign: 'start',
      textAnchor: 'start',
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: xCoords[ 1 ],
      bottom: yCoords[ 3 ],
      maxWidth: maxTextWidth
    } ) );

    this.addChild( new Text( areaSymbolString, {
      font: new PhetFont( { family: FONT_FAMILY, size: 60 } ),
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: xCoords[ 2 ],
      centerY: yCoords[ 0 ],
      maxWidth: maxTextWidth
    } ) );
    this.addChild( new Text( areaString, {
      font: new PhetFont( 16 ),
      textAlign: 'center',
      textAnchor: 'middle',
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: xCoords[ 2 ],
      top: yCoords[ 1 ],
      maxWidth: maxTextWidth
    } ) );
    this.addChild( textArea = new Text( Util.toFixed( model.areaProperty.value, 2 ), {
      font: new PhetFont( 28 ),
      textAlign: 'end',
      textAnchor: 'end',
      fill: ResistanceInAWireConstants.BLACK_COLOR,
      centerX: xCoords[ 2 ],
      top: yCoords[ 2 ]
    } ) );
    this.addChild( new SubSupText( cmString + '<sup>2</sup>', {
      font: new PhetFont( 28 ),
      textAlign: 'start',
      textAnchor: 'start',
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: xCoords[ 2 ],
      bottom: yCoords[ 3 ],
      maxWidth: maxTextWidth
    } ) );

    this.addChild( new Slider( xCoords[ 0 ], 143, 240, model.resistivityProperty, sliderImage, ResistanceInAWireConstants.RESISTIVITY_RANGE ) );
    this.addChild( new Slider( xCoords[ 1 ], 143, 240, model.lengthProperty, sliderImage, ResistanceInAWireConstants.LENGTH_RANGE ) );
    this.addChild( new Slider( xCoords[ 2 ], 143, 240, model.areaProperty, sliderImage, ResistanceInAWireConstants.AREA_RANGE ) );

    model.resistivityProperty.link( function updateTextResistivity( value ) {
      textResistivity.text = Util.toFixed( value, 2 );
      textResistivity.centerX = xCoords[ 0 ];
    } );
    model.lengthProperty.link( function updateTextLength( value ) {
      textLength.text = Util.toFixed( value, 2 );
      textLength.centerX = xCoords[ 1 ];
    } );
    model.areaProperty.link( function updateTextArea( value ) {
      textArea.text = Util.toFixed( value, 2 );
      textArea.centerX = xCoords[ 2 ];
    } );

    // pass options through
    this.mutate( options );
  }

  resistanceInAWire.register( 'SlidersBox', SlidersBox );

  return inherit( Node, SlidersBox );
} );