// Copyright 2013-2017, University of Colorado Boulder

/**
 * view for vertical slider control
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 * @author John Blanco (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );

  // constant
  var Y_POSITION = 143;
  var HEIGHT = 240;

  // images
  var thumbImage = require( 'image!RESISTANCE_IN_A_WIRE/thumb.png' );

  /**
   * @param {number} x
   * @param {Property.<number>} valueProperty
   * @param {RangeWithValue} range
   * @param {Tandem} tandem
   * @constructor
   */
  function Slider( x, valueProperty, range, tandem ) {
    var self = this;
    Node.call( this, { x: x, y: Y_POSITION, tandem: tandem } );

    this.addChild( new Rectangle( -3, 0, 6, HEIGHT, {
      fill: 'black',
      tandem: tandem.createTandem( 'track' )
    } ) );

    var thumb = new Image( thumbImage, {
      centerX: 0,
      top: 0,
      scale: ResistanceInAWireConstants.THUMB_WIDTH / thumbImage.width
    } );
    var track = new Node( { children: [ thumb ], cursor: 'pointer' } );

    var clickYOffset;
    var yMin = 0;
    var yMax = HEIGHT - track.height;

    var valueToPosition = new LinearFunction( range.min, range.max, yMax, yMin, true );
    var positionToValue = new LinearFunction( yMax, yMin, range.min, range.max, true );
    this.addChild( track );
    track.addInputListener( new SimpleDragHandler( {
      allowTouchSnag: true,
      start: function( event ) {
        clickYOffset = self.globalToParentPoint( event.pointer.point ).y - event.currentTarget.y;
      },
      drag: function( event ) {
        var y = self.globalToParentPoint( event.pointer.point ).y - clickYOffset;
        y = Math.max( Math.min( y, yMax ), yMin );
        valueProperty.set( positionToValue( y ) );
      }
    } ) );


    // Change the slider placement on the track when the property changes. This does not need an unlink because it
    // exists for the life of the sim.
    valueProperty.link( function( value ) {
      track.y = valueToPosition( value );
    } );
  }

  resistanceInAWire.register( 'Slider', Slider );

  return inherit( Node, Slider );
} );