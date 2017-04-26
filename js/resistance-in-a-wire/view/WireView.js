// Copyright 2016-2017, University of Colorado Boulder

/**
 * view of the wire, includes dots that depict the level of resistance
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
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  var Shape = require( 'KITE/Shape' );
  var Util = require( 'DOT/Util' );

  // constants
  var INITIAL_WIDTH = 450;
  var INITIAL_HEIGHT = 160;
  var PERSPECTIVE_FACTOR = 0.3; // multiplier that controls the width of the ellipses on the ends of the wire
  var DOT_RADIUS = 2;
  var DOT_POSITION_RANDOMIZATION_FACTOR = 12; // empirically determined
  var MIN_WIRE_VIEW_WIDTH = 15; // top width excluding rounded ends in screen coordinates, basically pixels
  var MAX_WIRE_VIEW_WIDTH = 500; // top width excluding rounded ends in screen coordinates, basically pixels
  var MIN_WIRE_VIEW_HEIGHT = 3; // in screen coordinates, basically pixels
  var MAX_WIRE_VIEW_HEIGHT = 180; // in screen coordinates, basically pixels
  var MAX_WIDTH_INCLUDING_ROUNDED_ENDS = MAX_WIRE_VIEW_WIDTH + 2 * MAX_WIRE_VIEW_HEIGHT * PERSPECTIVE_FACTOR;
  var AREA_PER_DOT = 200; // adjust this to control the density of the dots

  /**
   * Constructor - the position is set using center values since this can grow or shrink in width and height as the
   * area and length of the wire changes.
   * @param {ResistanceInAWireModel} model
   * @param {number} centerX
   * @param {number} centerY
   * @param {Tandem} tandem
   * @constructor
   */
  function WireView( model, centerX, centerY, tandem ) {

    Node.call( this );

    var width = INITIAL_WIDTH;
    var height = INITIAL_HEIGHT; // width is the top of the wire, excluding the curves
    var wireBodyShape = new Shape();
    var wireEndShape = new Shape();
    var bodyPath;
    var endPath;
    var areaToHeight = new LinearFunction(
      ResistanceInAWireConstants.AREA_RANGE.min,
      ResistanceInAWireConstants.AREA_RANGE.max,
      MIN_WIRE_VIEW_HEIGHT,
      MAX_WIRE_VIEW_HEIGHT, true );
    var lengthToWidth = new LinearFunction(
      ResistanceInAWireConstants.LENGTH_RANGE.min,
      ResistanceInAWireConstants.LENGTH_RANGE.max,
      MIN_WIRE_VIEW_WIDTH,
      MAX_WIRE_VIEW_WIDTH, true );

    this.addChild( bodyPath = new Path( wireBodyShape, {
      stroke: 'black',
      lineWidth: 1,
      tandem: tandem.createTandem( 'wireBody' )
    } ) );

    this.addChild( endPath = new Path( wireEndShape, {
      stroke: 'black',
      fill: '#E8B282',
      lineWidth: 1,
      tandem: tandem.createTandem( 'wireEnd' )
    } ) );

    var dotGroupTandem = tandem.createTandem( 'dotGroup' );
    var dotGroup = new Node( { tandem: dotGroupTandem } );
    var dotGridColumns = Util.roundSymmetric( MAX_WIDTH_INCLUDING_ROUNDED_ENDS / Math.sqrt( AREA_PER_DOT ) );
    var dotGridRows = Util.roundSymmetric( MAX_WIRE_VIEW_HEIGHT / Math.sqrt( AREA_PER_DOT ) );
    var dotGroupGroupTandem = dotGroupTandem.createGroupTandem( 'wireDots' );
    // create the dots by placing them on a grid, but move each one randomly a bit to make them look irregular
    for ( var i = 1; i < dotGridColumns; i++ ) {
      for ( var j = 1; j < dotGridRows; j++ ) {
        var dot = new Circle( DOT_RADIUS, {
          fill: 'black',
          centerX: i * ( MAX_WIDTH_INCLUDING_ROUNDED_ENDS / dotGridColumns ) -
                   MAX_WIDTH_INCLUDING_ROUNDED_ENDS / 2 +
                   ( phet.joist.random.nextDouble() - 0.5 ) * DOT_POSITION_RANDOMIZATION_FACTOR,
          centerY: j * ( MAX_WIRE_VIEW_HEIGHT / dotGridRows ) -
                   MAX_WIRE_VIEW_HEIGHT / 2 +
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

    // When the resistance changes, we change the shape of the wire. This does not need an unlink because it exists for
    // the life of the sim.
    model.resistanceProperty.link( function updateResistor() {

      wireEndShape = new Shape();
      height = areaToHeight( model.areaProperty.value );
      width = lengthToWidth( model.lengthProperty.value );

      // update the shape of the wire body, centered around the point (0,0)
      wireBodyShape = new Shape();
      wireBodyShape.moveTo( -width / 2, -height / 2 );
      wireBodyShape.cubicCurveTo(
        -width / 2 - height * PERSPECTIVE_FACTOR,
        -height / 2,
        -width / 2 - height * PERSPECTIVE_FACTOR,
        height / 2,
        -width / 2,
        height / 2
      );
      wireBodyShape.lineTo( width / 2, height / 2 );
      wireBodyShape.cubicCurveTo(
        width / 2 + height * PERSPECTIVE_FACTOR,
        height / 2,
        width / 2 + height * PERSPECTIVE_FACTOR,
        -height / 2,
        width / 2,
        -height / 2
      );
      wireBodyShape.close();

      // draw the end of the wire
      wireEndShape.moveTo( -width / 2, -height / 2 );
      wireEndShape.cubicCurveTo(
        -width / 2 - height * PERSPECTIVE_FACTOR,
        -height / 2,
        -width / 2 - height * PERSPECTIVE_FACTOR,
        height / 2,
        -width / 2,
        height / 2
      );
      wireEndShape.cubicCurveTo(
        -width / 2 + height * PERSPECTIVE_FACTOR,
        height / 2,
        -width / 2 + height * PERSPECTIVE_FACTOR,
        -height / 2,
        -width / 2,
        -height / 2
      );
      wireEndShape.close();

      bodyPath.shape = wireBodyShape;
      endPath.shape = wireEndShape;

      // set the gradient on the wire to make it look more 3D
      bodyPath.fill = new LinearGradient( 0, height / 2, 0, -height / 2 )
        .addColorStop( 0, '#8C4828' )
        .addColorStop( 0.5, '#E8B282' )
        .addColorStop( 0.65, '#FCF5EE' )
        .addColorStop( 0.8, '#F8E8D9' )
        .addColorStop( 1, '#8C4828' );

      // clip the dots that are shown to only include those inside the wire
      dotGroup.clipArea = wireBodyShape;

      // set the number of visible dots based on the resistivity
      var numDotsToShow = resistivityToNumDots( model.resistivityProperty.value );
      dotGroup.children.forEach( function( dot, index ) {
        dot.visible = index < numDotsToShow;
      } );
    } );

    // pass position through to parent class
    this.mutate( { centerX: centerX, centerY: centerY } );
  }

  resistanceInAWire.register( 'WireView', WireView );

  return inherit( Node, WireView );
} );