// Copyright 2016-2017, University of Colorado Boulder

/**
 * view of the wire, includes dots that depict the level of resistivity
 *
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 * @author John Blanco (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Property = require( 'AXON/Property' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  var Range = require( 'DOT/Range' );
  var Shape = require( 'KITE/Shape' );
  var Util = require( 'DOT/Util' );

  // constants
  var PERSPECTIVE_FACTOR = 0.4; // multiplier that controls the width of the ellipses on the ends of the wire
  var DOT_RADIUS = 2;
  var DOT_POSITION_RANDOMIZATION_FACTOR = 12; // empirically determined
  var WIRE_VIEW_WIDTH_RANGE = new Range( 15, 500 ); // in screen coordinates
  var WIRE_VIEW_HEIGHT_RANGE = new Range( 3, 180 ); // in screen coordinates
  var MAX_WIDTH_INCLUDING_ROUNDED_ENDS = WIRE_VIEW_WIDTH_RANGE.max + 2 * WIRE_VIEW_HEIGHT_RANGE.max * PERSPECTIVE_FACTOR;
  var AREA_PER_DOT = 200; // adjust this to control the density of the dots

  /**
   * Constructor - the position is set using center values since this can grow or shrink in width and height as the
   * area and length of the wire changes.
   * @param {ResistanceInAWireModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function WireNode( model, tandem ) {

    Node.call( this );

    // body of the wire
    var bodyPath = new Path( null, {
      stroke: 'black',
      lineWidth: 1,
      tandem: tandem.createTandem( 'wireBody' )
    } );

    // cap/end of the wire
    var endPath = new Path( null, {
      stroke: 'black',
      fill: '#E8B282',
      lineWidth: 1,
      tandem: tandem.createTandem( 'wireEnd' )
    } );

    this.addChild( bodyPath );
    this.addChild( endPath );

    // linear mapping transformations
    var areaToHeight = new LinearFunction(
      ResistanceInAWireConstants.AREA_RANGE.min,
      ResistanceInAWireConstants.AREA_RANGE.max,
      WIRE_VIEW_HEIGHT_RANGE.min,
      WIRE_VIEW_HEIGHT_RANGE.max,
      true );
    var lengthToWidth = new LinearFunction(
      ResistanceInAWireConstants.LENGTH_RANGE.min,
      ResistanceInAWireConstants.LENGTH_RANGE.max,
      WIRE_VIEW_WIDTH_RANGE.min,
      WIRE_VIEW_WIDTH_RANGE.max,
      true );

    // dots representing charge scatterers.
    var dotGroupTandem = tandem.createTandem( 'dotGroup' );
    var dotGroup = new Node( { tandem: dotGroupTandem } );
    var dotGridColumns = Util.roundSymmetric( MAX_WIDTH_INCLUDING_ROUNDED_ENDS / Math.sqrt( AREA_PER_DOT ) );
    var dotGridRows = Util.roundSymmetric( WIRE_VIEW_HEIGHT_RANGE.max / Math.sqrt( AREA_PER_DOT ) );
    var dotGroupGroupTandem = dotGroupTandem.createGroupTandem( 'wireDots' );

    // create the dots by placing them on a grid, but move each one randomly a bit to make them look irregular
    for ( var i = 1; i < dotGridColumns; i++ ) {
      for ( var j = 1; j < dotGridRows; j++ ) {
        var dot = new Circle( DOT_RADIUS, {
          fill: 'black',
          centerX: i * ( MAX_WIDTH_INCLUDING_ROUNDED_ENDS / dotGridColumns ) -
                   MAX_WIDTH_INCLUDING_ROUNDED_ENDS / 2 +
                   (phet.joist.random.nextDouble() - 0.5 ) * DOT_POSITION_RANDOMIZATION_FACTOR,
          centerY: j * ( WIRE_VIEW_HEIGHT_RANGE.max / dotGridRows ) -
                   WIRE_VIEW_HEIGHT_RANGE.max / 2 +
                   ( phet.joist.random.nextDouble() - 0.5 ) * DOT_POSITION_RANDOMIZATION_FACTOR,
          tandem: dotGroupGroupTandem.createNextTandem()
        } );
        dotGroup.addChild( dot );
      }
    }

    // function to map resistivity to number of dots
    var maxDots = dotGridColumns * dotGridRows;
    var resistivityToNumDots = new LinearFunction(
      ResistanceInAWireConstants.RESISTIVITY_RANGE.min,
      ResistanceInAWireConstants.RESISTIVITY_RANGE.max,
      maxDots * 0.05,
      maxDots,
      true
    );

    // randomize the array of dots so that we can show/hide them in a random way as resistivity changes
    dotGroup.children = _.shuffle( dotGroup.children );

    this.addChild( dotGroup );

    Property.multilink( [ model.areaProperty, model.lengthProperty, model.resistivityProperty ],
      function updateResistor( area, length, resistivity ) {

        // height of the wire in view coordinates
        var height = areaToHeight( area );
        // width of the wire (as measured from the top of the wire, that is excluding the rounding bits in the middle)
        var width = lengthToWidth( length );

        //  set the (face) body shape of the wire
        // recall that (zero,zero) is defined as the center of the wire.
        bodyPath.shape = new Shape().moveTo( -width / 2, height / 2 )
          .horizontalLineToRelative( width )
          .ellipticalArc( width / 2, 0, PERSPECTIVE_FACTOR * height / 2, height / 2, 0, Math.PI / 2, 3 * Math.PI / 2, true )
          .horizontalLineToRelative( -width );

        // set the cap end of the wire
        endPath.shape = Shape.ellipse( -width / 2, 0, height * PERSPECTIVE_FACTOR / 2, height / 2 );

        // set the gradient on the wire to make it look more 3D
        bodyPath.fill = new LinearGradient( 0, height / 2, 0, -height / 2 )
          .addColorStop( 0, '#8C4828' )
          .addColorStop( 0.5, '#E8B282' )
          .addColorStop( 0.65, '#FCF5EE' )
          .addColorStop( 0.8, '#F8E8D9' )
          .addColorStop( 1, '#8C4828' );

        // clip the dots that are shown to only include those inside the wire (including the wireEnd)
        dotGroup.clipArea = bodyPath.shape.ellipticalArc( -width / 2, 0, PERSPECTIVE_FACTOR * height / 2, height / 2, 0, 3 * Math.PI / 2, Math.PI / 2, true );

        // set the number of visible dots based on the resistivity
        var numDotsToShow = resistivityToNumDots( resistivity );
        dotGroup.children.forEach( function( dot, index ) {
          dot.visible = index < numDotsToShow;
        } );
      } );
  }

  resistanceInAWire.register( 'WireNode', WireNode );

  return inherit( Node, WireNode );
} );