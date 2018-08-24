// Copyright 2018, University of Colorado Boulder

/**
 * Draw the dots in the wire with a CanvasNode as a performance enhancement. This is much faster than drawing
 * each dot as a Circle node and updating their visibility. Dots are redrawn whenever model Properties change that
 * might change the shape of the wire or add or remove dots (length, area, resistivity).
 * 
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var CanvasNode = require( 'SCENERY/nodes/CanvasNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  var Vector2 = require( 'DOT/Vector2' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var WireShapeConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/WireShapeConstants' );

  // constants
  // to calculate the number of dots
  var MAX_WIDTH_INCLUDING_ROUNDED_ENDS = WireShapeConstants.WIRE_VIEW_WIDTH_RANGE.max + 2 * WireShapeConstants.WIRE_VIEW_HEIGHT_RANGE.max * WireShapeConstants.PERSPECTIVE_FACTOR;
  var AREA_PER_DOT = 200; // Adjust this to control the density of the dots.
  var NUMBER_OF_DOTS = MAX_WIDTH_INCLUDING_ROUNDED_ENDS * WireShapeConstants.WIRE_VIEW_HEIGHT_RANGE.max / AREA_PER_DOT;

  // Function to map resistivity to number of dots.
  var resistivityToNumberOfDots = new LinearFunction(
    ResistanceInAWireConstants.RESISTIVITY_RANGE.min,
    ResistanceInAWireConstants.RESISTIVITY_RANGE.max,
    NUMBER_OF_DOTS * 0.05,
    NUMBER_OF_DOTS,
    true
  );

  /**
   * @constructor
   * @param {Bounds2} bounds - total bounds for the canvas
   * @param {Object} [options]
   */
  function DotsCanvasNode( model, options ) {

    options = _.extend( {
      preventFit: true // don't recompute bounds as a performance enhancement
    }, options );

    // @private - Locations for dots randomly on the wire. Density is based on AREA_PER_DOT.
    this.dotCenters = [];
    for ( var i = 0; i < NUMBER_OF_DOTS; i++ ) {
      var centerX = ( phet.joist.random.nextDouble() - .5 ) * MAX_WIDTH_INCLUDING_ROUNDED_ENDS;
      var centerY = ( phet.joist.random.nextDouble() - .5 ) * WireShapeConstants.WIRE_VIEW_HEIGHT_RANGE.max;
      this.dotCenters.push( new Vector2( centerX, centerY ) );
    }

    // @private - just for use in paintCanvas
    this.resistivityProperty = model.resistivityProperty;
    this.areaProperty = model.areaProperty;
    this.lengthProperty = model.lengthProperty;

    // @public - dots outside of this area will be invisible, set when shape is recalculated in WireNode
    this.dotsClipArea = null;

    // calculate bounds for the canvas - wire center is at (0, 0)
    var height = WireShapeConstants.areaToHeight( ResistanceInAWireConstants.AREA_RANGE.max );
    var width = WireShapeConstants.lengthToWidth( ResistanceInAWireConstants.LENGTH_RANGE.max );
    var dotsBounds = new Bounds2( -width / 2 - WireShapeConstants.PERSPECTIVE_FACTOR * height / 2, -height / 2, width / 2 + WireShapeConstants.PERSPECTIVE_FACTOR * height / 2, height / 2 );

    CanvasNode.call( this, options );
    this.setCanvasBounds( dotsBounds );
    this.invalidatePaint();
  }

  resistanceInAWire.register( 'DotsCanvasNode', DotsCanvasNode );

  return inherit( CanvasNode, DotsCanvasNode, {

    /**
     * Draw the required dots.
     *
     * @param {CanvasRenderingContext2D} context
     * @override
     * @public
     */
    paintCanvas: function( context ) {

      // Height of the wire in view coordinates
      var height = WireShapeConstants.areaToHeight( this.areaProperty.get() );

      // Width of the wire (as measured from the top of the wire, that is excluding the rounding bits in the middle).
      var width = WireShapeConstants.lengthToWidth( this.lengthProperty.get() );

      // Rectangular shape of the body excluding the arcs at the ends, used as the clip area. Using and changing clip
      // area that includes the arcs at the end of the wire is too slow. But using a clip area for the main body of the
      // wire looks nice, and allows dots to be seen partially when the wire is at is minimum height.
      context.beginPath();
      context.moveTo( -width / 2 - WireShapeConstants.PERSPECTIVE_FACTOR * height / 2, height / 2 );
      context.lineTo( width / 2 + WireShapeConstants.PERSPECTIVE_FACTOR * height / 2, height / 2 );
      context.lineTo( width / 2 + WireShapeConstants.PERSPECTIVE_FACTOR * height / 2, -height / 2 );
      context.lineTo( -width / 2 - WireShapeConstants.PERSPECTIVE_FACTOR * height / 2, -height / 2 );
      context.clip();

      // draw dots whose centers are within the shape of the wire
      var numDotsToShow = resistivityToNumberOfDots( this.resistivityProperty.get() );
      for ( var i = 0; i < this.dotCenters.length; i++ ) {

        // only draw dots that are within the current shape of the wire to clip dots that extend beyond
        // the left and the right of the rectangular wire shape
        if ( i < numDotsToShow && this.dotsClipArea.containsPoint( this.dotCenters[ i ] ) ) {
          context.beginPath();
          context.arc( this.dotCenters[ i ].x, this.dotCenters[ i ].y, WireShapeConstants.DOT_RADIUS, 0, 2 * Math.PI, true );
          context.fill();
        }
      }
    }
  } );
} );
