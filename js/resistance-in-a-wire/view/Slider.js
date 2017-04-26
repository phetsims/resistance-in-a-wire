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
  var Util = require( 'DOT/Util' );

  // images
  var thumbImage = require( 'image!RESISTANCE_IN_A_WIRE/thumb.png' );

  // constant
  var Y_POSITION = 143;
  var TRACK_HEIGHT = 240;
  var TRACK_WIDTH = 6;

  /**
   * @param {number} x
   * @param {Property.<number>} valueProperty
   * @param {RangeWithValue} range
   * @param {Tandem} tandem
   * @constructor
   */
  function Slider( x, valueProperty, range, tandem ) {
    var self = this;

    var trackNode = new Rectangle( -TRACK_WIDTH / 2, 0, TRACK_WIDTH, TRACK_HEIGHT, {
      fill: 'black',
      tandem: tandem.createTandem( 'track' )
    } );

    var thumb = new Image( thumbImage, {
      centerX: 0,
      top: 0,
      scale: ResistanceInAWireConstants.THUMB_WIDTH / thumbImage.width,
      cursor: 'pointer',
      tandem: tandem.createTandem( 'thumb' )
    } );

    var clickYOffset;
    var yMin = 0;
    var yMax = TRACK_HEIGHT - thumb.height;

    var modelToView = new LinearFunction( range.min, range.max, yMax, yMin, true );

    thumb.addInputListener( new SimpleDragHandler( {
      allowTouchSnag: true,
      start: function( event ) {
        clickYOffset = self.globalToParentPoint( event.pointer.point ).y - event.currentTarget.y;
      },
      drag: function( event ) {
        var y = Util.clamp( self.globalToParentPoint( event.pointer.point ).y - clickYOffset, yMin, yMax );
        valueProperty.set( modelToView.inverse( y ) );
      }
    } ) );

    // Change the slider placement on the track when the property changes. This does not need an unlink because it
    // exists for the life of the sim.
    valueProperty.link( function( value ) {
      thumb.y = modelToView( value );
    } );

    Node.call( this, {
      x: x,
      y: Y_POSITION,
      tandem: tandem,
      children: [ trackNode, thumb ]
    } );
  }

  resistanceInAWire.register( 'Slider', Slider );

  return inherit( Node, Slider );
} );