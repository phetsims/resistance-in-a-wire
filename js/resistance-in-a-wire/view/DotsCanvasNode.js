// Copyright 2018, University of Colorado Boulder

/**
 * Draw the dots in the wire with a CanvasNode as a performance enhancement. This is much faster than drawing
 * each dot as a Circle node and updating their visibility. Dots are redrawn whenever model Properties change that
 * might change the shape of the wire or add or remove dots (length, area, resistivity).
 * 
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const CanvasNode = require( 'SCENERY/nodes/CanvasNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LinearFunction = require( 'DOT/LinearFunction' );
  const resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  const ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  const Vector2 = require( 'DOT/Vector2' );
  const WireShapeConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/WireShapeConstants' );

  // constants
  // to calculate the number of dots
  const MAX_WIDTH_INCLUDING_ROUNDED_ENDS = WireShapeConstants.WIRE_VIEW_WIDTH_RANGE.max + 2 * WireShapeConstants.WIRE_VIEW_HEIGHT_RANGE.max * WireShapeConstants.PERSPECTIVE_FACTOR;
  const AREA_PER_DOT = 200; // Adjust this to control the density of the dots.
  const NUMBER_OF_DOTS = MAX_WIDTH_INCLUDING_ROUNDED_ENDS * WireShapeConstants.WIRE_VIEW_HEIGHT_RANGE.max / AREA_PER_DOT;

  // Function to map resistivity to number of dots.
  const resistivityToNumberOfDots = new LinearFunction(
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
    for ( let i = 0; i < NUMBER_OF_DOTS; i++ ) {
      const centerX = ( phet.joist.random.nextDouble() - .5 ) * MAX_WIDTH_INCLUDING_ROUNDED_ENDS;
      const centerY = ( phet.joist.random.nextDouble() - .5 ) * WireShapeConstants.WIRE_VIEW_HEIGHT_RANGE.max;
      this.dotCenters.push( new Vector2( centerX, centerY ) );
    }

    // @private - just for use in paintCanvas
    this.resistivityProperty = model.resistivityProperty;
    this.areaProperty = model.areaProperty;
    this.lengthProperty = model.lengthProperty;

    // calculate bounds for the canvas - wire center is at (0, 0)
    const height = WireShapeConstants.areaToHeight( ResistanceInAWireConstants.AREA_RANGE.max );
    const width = WireShapeConstants.lengthToWidth( ResistanceInAWireConstants.LENGTH_RANGE.max );
    const dotsBounds = new Bounds2( -width / 2 - WireShapeConstants.PERSPECTIVE_FACTOR * height / 2, -height / 2, width / 2 + WireShapeConstants.PERSPECTIVE_FACTOR * height / 2, height / 2 );

    CanvasNode.call( this, options );
    this.setCanvasBounds( dotsBounds );
    this.invalidatePaint();
  }

  resistanceInAWire.register( 'DotsCanvasNode', DotsCanvasNode );

  inherit( CanvasNode, DotsCanvasNode, {

    /**
     * Draw the required dots.
     *
     * @param {CanvasRenderingContext2D} context
     * @override
     * @public
     */
    paintCanvas: function( context ) {

      // Height of the wire in view coordinates
      const height = WireShapeConstants.areaToHeight( this.areaProperty.get() );

      // Width of the wire (as measured from the top of the wire, that is excluding the rounding bits in the middle).
      const width = WireShapeConstants.lengthToWidth( this.lengthProperty.get() );

      // for readability, these are relative to the rectangular body
      const top = -height / 2;
      const bottom = height / 2;
      const left = -width / 2;
      const right = width / 2;

      // Rectangular shape of the body, used as the clip area. Using and changing clip area that includes the ends
      // of the wire with Shape.ellipticalArc is too slow. But approximating arcs with fewer segments is much faster.
      // See https://github.com/phetsims/resistance-in-a-wire/issues/170 and approxEllipticalArc()
      context.beginPath();
      context.moveTo( left, bottom );

      // arc around the left side of the wire
      approxEllipticalArc( context, height, left, Math.PI / 2, 3 * Math.PI / 2 );
      context.lineTo( right, top );

      // arc around the right side of the wire
      approxEllipticalArc( context, height, right, 3 * Math.PI / 2, 5 * Math.PI / 2 );
      context.lineTo( left, bottom );

      // use this shape with "arcs" as the clip shape
      context.clip();

      // fillstyle required for dots to show up in screenshot feature, see
      // https://github.com/phetsims/resistance-in-a-wire/issues/171
      // NOTE: Maybe this can be removed once https://github.com/phetsims/scenery/issues/848 is sorted?
      context.fillStyle = 'black';

      // draw the dots, number depending on the resistivity Property
      const numDotsToShow = resistivityToNumberOfDots( this.resistivityProperty.get() );
      for ( let i = 0; i < this.dotCenters.length; i++ ) {
        if ( i < numDotsToShow ) {
          context.beginPath();
          context.arc( this.dotCenters[ i ].x, this.dotCenters[ i ].y, WireShapeConstants.DOT_RADIUS, 0, 2 * Math.PI, true );
          context.fill();
        }
      }
    }
  } );

  /**
   * Using Shape.ellipticalArc for the clip area is too slow, so we approximate ellipcitcal arcs with segments.
   * The 'segments' variable can be increased to get more accurate elliptical shapes, or reduced for (possibly)
   * faster drawing.
   * 
   * @param {CanvasContext2D} context - canvas context to draw to
   * @param {number} height - height of the wire
   * @param {number} centerX - centerX offset for the ellipse
   * @param {number} startAngle - start angle for the ellipse
   * @param {number} endAngle - end angle for the ellipse
   */
  function approxEllipticalArc( context, height, centerX, startAngle, endAngle ) {

    // with 9 segments, the elliptical shape is almost perfect
    const segments = 9;
    const delta = ( endAngle - startAngle ) / segments;

    const xRadius = WireShapeConstants.PERSPECTIVE_FACTOR * height / 2;
    const yRadius = height / 2;

    let t = startAngle;
    while( t <= endAngle ) {
      const x = centerX + xRadius * Math.cos( t );
      const y = yRadius * Math.sin( t );
      context.lineTo( x, y );

      t += delta;
    }
  }

  return DotsCanvasNode;
} );
