// Copyright 2002-2015, University of Colorado Boulder

/**
 * view for vertical slider control
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
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

  // constants
  var KNOB_WIDTH = 32;  // Empirically determined.

  function Slider( x, y, h, targetProperty, img, value ) {
    var thisNode = this;
    Node.call( this, { x: x, y: y } );
    this.addChild( new Rectangle( -3, 0, 6, h, { fill: 'black' } ) );

    var knob = new Image( img );
    knob.scale( KNOB_WIDTH / knob.width );
    knob.mutate( { centerX: 0, top: 0 } );
    var track = new Node( { children: [ knob ], cursor: 'pointer' } );

    var clickYOffset;
    var yMin = 0;
    var yMax = h - track.height;

    var valueToPosition = new LinearFunction( value.min, value.max, yMax, yMin, true ),
      positionToValue = new LinearFunction( yMax, yMin, value.min, value.max, true );
    this.addChild( track );
    track.addInputListener( new SimpleDragHandler(
      {
        allowTouchSnag: true,
        start: function( event ) {
          clickYOffset = thisNode.globalToParentPoint( event.pointer.point ).y - event.currentTarget.y;
        },
        drag: function( event ) {
          var y = thisNode.globalToParentPoint( event.pointer.point ).y - clickYOffset;
          y = Math.max( Math.min( y, yMax ), yMin );
          targetProperty.set( positionToValue( y ) );
        }
      } ) );
    targetProperty.link( function( value ) {
      track.y = valueToPosition( value );
    } );
  }

  inherit( Node, Slider );

  return Slider;
} );