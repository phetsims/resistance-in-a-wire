// Copyright 2016, University of Colorado Boulder

/**
 * view of the wire, includes dots that depict the level of resistance
 *
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var LinearFunction = require( 'DOT/LinearFunction' );

  /**
   * @param {ResistanceInAWireModel} model
   * @param x
   * @param y
   * @param options
   * @constructor
   */
  function WireView( model, x, y, options ) {

    Node.call( this, { x: x, y: y } );

    var height = 160;
    var width = 450;
    var shift = height / 3;
    var wireBodyShape = new Shape();
    var wireEndShape = new Shape();
    var resistor = new Node();
    var bodyBath;
    var endPath;
    var linearGradient1 = new LinearGradient( 0, 0, 0, height )
      .addColorStop( 0, '#e4e4e4' )
      .addColorStop( 0.2, '#FFF' )
      .addColorStop( 0.5, '#FFF' )
      .addColorStop( 0.81, '#bfbfbf' )
      .addColorStop( 1, '#575757' );
    var areaToHeight = new LinearFunction( options.area.min, options.area.max, 3, 180, true );
    var lengthToWidth = new LinearFunction( options.length.min, options.length.max, 15, 500, true );
    var resistivityToDot = new LinearFunction( options.resistivity.min, options.resistivity.max, 25, 500, true );

    resistor.addChild( bodyBath = new Path( wireBodyShape, {
      stroke: '#000',
      fill: linearGradient1,
      lineWidth: 1
    } ) );

    resistor.addChild( endPath = new Path( wireEndShape, {
      stroke: '#000',
      fill: '#f2f2f2',
      lineWidth: 1
    } ) );
    this.addChild( resistor );

    var dotGroup = new Node();
    var maxPoints = 500;
    var a = (height - 3) * (width + shift) / maxPoints;    // area per dot
    var d = Math.pow( a, 0.5 ); // NN dot separation
    var nRows = Math.round( height / d );
    var nCols = Math.round( (width + shift) / d );
    var yugsterBugster = 0; //counter

    var points = [];

    // create the dots by placing them on a grid but moved randomly a bit to make them look irregular
    for ( var i = 1; i <= nRows; i++ ) {
      for ( var j = 1; j <= nCols; j++ ) {
        var point = new Circle( 2, { fill: '#000' } );
        point.centerY = i * d - d / 2 + Math.random() * d * 0.7;
        point.centerX = j * d - d / 2 + Math.random() * d * 0.7;
        points.push( point );
        dotGroup.addChild( point );
        yugsterBugster++;
      }
    }
    maxPoints = yugsterBugster;

    for ( i = points.length - 1; i > -1; i-- ) {
      var pos = parseInt( Math.random() * i, 10 );
      var tt = points[ i ];
      points[ i ] = points[ pos ];
      points[ pos ] = tt;
    }

    this.addChild( dotGroup );

    function shiftDotInResistor( y, height ) {
      return Math.sqrt( Math.abs( (1 - (y - 100) * (y - 100)) / ((height) * (height)) * ((height / 3) * (height / 3)) ) ) - height / 5;
    }

    function dotInResistor( dot, height ) {
      return dot.y - 83 > -height / 2 + 3 && dot.y - 80 < height / 2 &&
             dot.x - 260 > -width / 2 + shiftDotInResistor( dot.y, height ) &&
             dot.x - 255 < width / 2 - shiftDotInResistor( dot.y, height );
    }

    model.resistanceProperty.link( function updateResistor( val ) {

      wireBodyShape = new Shape();
      wireEndShape = new Shape();
      height = areaToHeight( model.area );
      width = lengthToWidth( model.length );
      shift = height / 3;
      linearGradient1.end.y = height;

      wireBodyShape.moveTo( 5, 0 );
      wireBodyShape.cubicCurveTo( shift + 5, 0, shift + 5, height, 5, height );
      wireBodyShape.lineTo( width - 3, height );
      wireBodyShape.cubicCurveTo( width - 3 + shift, height, width - 3 + shift, 0, width - 3, 0 );
      wireBodyShape.close();

      wireEndShape.moveTo( 5, 0 );
      wireEndShape.cubicCurveTo( shift + 5, 0, shift + 5, height, 5, height );
      wireEndShape.cubicCurveTo( -shift + 5, height, -shift + 5, 0, 5, 0 );
      wireEndShape.close();

      bodyBath.shape = wireBodyShape;
      endPath.shape = wireEndShape;
      resistor.centerX = 0;
      resistor.centerY = 0;

      var borderNumber = resistivityToDot( model.resistivity );
      for ( var i = 0; i < maxPoints; i++ ) {
        if ( i < borderNumber && dotInResistor( points[ i ], height ) ) {
          points[ i ].setVisible( true );
        }
        else {
          points[ i ].setVisible( false );
        }
      }
      dotGroup.centerX = 0;
      dotGroup.centerY = 0;
    } );

  }

  return inherit( Node, WireView );
} );