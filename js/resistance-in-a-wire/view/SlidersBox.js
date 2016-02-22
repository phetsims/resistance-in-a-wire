// Copyright 2016, University of Colorado Boulder

/**
 * Container for sliders and circumjacent text
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Slider = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/Slider' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var WhiteBox = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/WhiteBox' );

  // images
  var sliderImage = require( 'image!RESISTANCE_IN_A_WIRE/slider.png' );

  // strings
  var areaString = require( 'string!RESISTANCE_IN_A_WIRE/area' );
  var cmString = require( 'string!RESISTANCE_IN_A_WIRE/cm' );
  var lengthString = require( 'string!RESISTANCE_IN_A_WIRE/length' );
  var ohmString = require( 'string!RESISTANCE_IN_A_WIRE/ohm' );
  var resistanceEqString = require( 'string!RESISTANCE_IN_A_WIRE/resistanceEq' );
  var resistivityString = require( 'string!RESISTANCE_IN_A_WIRE/resistivity' );

  /**
   * @param {ResistanceInAWireModel} model
   * @param x
   * @param y
   * @param {Object} [options]
   * @constructor
   */
  function SlidersBox( model, x, y, options ) {

    Node.call( this, { x: x, y: y } );

    var panelWidth = 380;
    var panelHeight = 500;
    var textResistivity;
    var textLength;
    var textArea;
    this.addChild( new WhiteBox( 0, 0, panelWidth, panelHeight ) );

    // add the dynamic title that indicates the resistance
    var dynamicTitle = new Text( '', {
      font: new PhetFont( 30 ),
      fill: '#F00',
      maxWidth: panelWidth * 0.9,
      top: 15
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
      dynamicTitle.text = resistanceEqString + ' ' + Util.toFixed( resistance, numDecimalDigits ) + ' ' + ohmString;
      dynamicTitle.centerX = panelWidth / 2;
    } );

    // xy grid that controls where the sliders and associated labels appear, values empirically determined
    var yCoords = [ 60, 120, 410, 453 ];
    var xCoords = [ 70, 195, 320 ];

    // Calculate a max width for the textual labels so that the labels don't overlap or go outside the bounds of the
    // box.  The multiplier is empirically determined.
    var maxTextWidth = panelWidth * 0.25;

    this.addChild( new Text( 'ρ', {
      font: new PhetFont( { family: 'Times New Roman', size: 60 } ),
      fill: '#0f0ffb',
      centerX: xCoords[ 0 ],
      top: yCoords[ 0 ] - 10
    } ) );
    this.addChild( new Text( resistivityString, {
      font: new PhetFont( 16 ),
      textAlign: 'center',
      textAnchor: 'middle',
      fill: '#0f0ffb',
      centerX: xCoords[ 0 ],
      top: yCoords[ 1 ],
      maxWidth: maxTextWidth
    } ) );
    this.addChild( textResistivity = new Text( Util.toFixed( model.resistivity, 2 ), {
      font: new PhetFont( 30 ),
      textAlign: 'end',
      textAnchor: 'end',
      fill: '#000',
      centerX: xCoords[ 0 ],
      top: yCoords[ 2 ]
    } ) );
    this.addChild( new Text( 'Ω' + cmString, {
      font: new PhetFont( 30 ),
      textAlign: 'start',
      textAnchor: 'start',
      fill: '#0f0ffb',
      centerX: xCoords[ 0 ],
      top: yCoords[ 3 ],
      maxWidth: maxTextWidth
    } ) );

    this.addChild( new Text( 'L', {
      font: new PhetFont( { family: 'Times New Roman', size: 60 } ),
      fill: '#0f0ffb',
      centerX: xCoords[ 1 ],
      top: yCoords[ 0 ]
    } ) );
    this.addChild( new Text( lengthString, {
      font: new PhetFont( 16 ),
      textAlign: 'center',
      textAnchor: 'middle',
      fill: '#0f0ffb',
      centerX: xCoords[ 1 ],
      top: yCoords[ 1 ],
      maxWidth: maxTextWidth
    } ) );
    this.addChild( textLength = new Text( Util.toFixed( model.length, 2 ), {
      font: new PhetFont( 30 ),
      textAlign: 'end',
      textAnchor: 'end',
      fill: '#000',
      centerX: xCoords[ 1 ],
      top: yCoords[ 2 ]
    } ) );
    this.addChild( new Text( cmString, {
      font: new PhetFont( 30 ),
      textAlign: 'start',
      textAnchor: 'start',
      fill: '#0f0ffb',
      centerX: xCoords[ 1 ],
      top: yCoords[ 3 ],
      maxWidth: maxTextWidth
    } ) );

    this.addChild( new Text( 'A', {
      font: new PhetFont( { family: 'Times New Roman', size: 60 } ),
      fill: '#0f0ffb',
      centerX: xCoords[ 2 ],
      top: yCoords[ 0 ]
    } ) );
    this.addChild( new Text( areaString, {
      font: new PhetFont( 16 ),
      textAlign: 'center',
      textAnchor: 'middle',
      fill: '#0f0ffb',
      centerX: xCoords[ 2 ],
      top: yCoords[ 1 ],
      maxWidth: maxTextWidth
    } ) );
    this.addChild( textArea = new Text( Util.toFixed( model.area, 2 ), {
      font: new PhetFont( 30 ),
      textAlign: 'end',
      textAnchor: 'end',
      fill: '#000',
      centerX: xCoords[ 2 ],
      top: yCoords[ 2 ]
    } ) );
    this.addChild( new SubSupText( cmString + '<sup>2</sup>', {
      font: new PhetFont( 30 ),
      textAlign: 'start',
      textAnchor: 'start',
      fill: '#0f0ffb',
      centerX: xCoords[ 2 ],
      top: yCoords[ 3 ],
      maxWidth: maxTextWidth
    } ) );

    this.addChild( new Slider( xCoords[ 0 ], 145, 260, model.resistivityProperty, sliderImage, options.resistivity ) );
    this.addChild( new Slider( xCoords[ 1 ], 145, 260, model.lengthProperty, sliderImage, options.length ) );
    this.addChild( new Slider( xCoords[ 2 ], 145, 260, model.areaProperty, sliderImage, options.area ) );

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
  }

  return inherit( Node, SlidersBox );
} );