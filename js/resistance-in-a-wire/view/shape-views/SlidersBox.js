// Copyright 2013-2015, University of Colorado Boulder

/**
 * Container for sliders and circumjacent text
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var WhiteBox = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/shape-views/slider-box-view/WhiteBox' );
  var Slider = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/shape-views/slider-box-view/Slider' );
  var CurrentResistanceView = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/shape-views/slider-box-view/CurrentResistanceView' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Util = require( 'DOT/Util' );

  // images
  var sliderImage = require( 'image!RESISTANCE_IN_A_WIRE/slider.png' );

  // strings
  var resistivityString = require( 'string!RESISTANCE_IN_A_WIRE/resistivity' );
  var cmString = require( 'string!RESISTANCE_IN_A_WIRE/cm' );
  var lengthString = require( 'string!RESISTANCE_IN_A_WIRE/length' );
  var areaString = require( 'string!RESISTANCE_IN_A_WIRE/area' );

  /**
   * @param {ResistanceInAWireModel} model
   * @param x
   * @param y
   * @param {Object} [options]
   * @constructor
   */
  function SlidersBox( model, x, y, options ) {

    Node.call( this, { x: x, y: y } );

    var rectW = 380;
    var rectH = 500;
    var textResistivity;
    var textLength;
    var textArea;
    this.addChild( new WhiteBox( 0, 0, rectW, rectH ) );
    //xy Grid
    var yCoords = [ 60, 120, 410, 453 ];
    var xCoords = [ 70, 195, 320 ];

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
      top: yCoords[ 1 ]
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
      top: yCoords[ 3 ]
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
      top: yCoords[ 1 ]
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
      top: yCoords[ 3 ]
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
      top: yCoords[ 1 ]
    } ) );
    this.addChild( textArea = new Text( Util.toFixed( model.area, 2 ), {
      font: new PhetFont( 30 ),
      textAlign: 'end',
      textAnchor: 'end',
      fill: '#000',
      centerX: xCoords[ 2 ],
      top: yCoords[ 2 ]
    } ) );
    this.addChild( new Text( cmString + '²', {
      font: new PhetFont( 30 ),
      textAlign: 'start',
      textAnchor: 'start',
      fill: '#0f0ffb',
      centerX: xCoords[ 2 ],
      top: yCoords[ 3 ]
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

    //resistance value
    this.addChild( new CurrentResistanceView( model, rectW / 2, 30, rectW ) );

  }

  return inherit( Node, SlidersBox );
} );