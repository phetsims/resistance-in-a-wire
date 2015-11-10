// Copyright 2013-2015, University of Colorado Boulder

/**
 * Container for resistor and nearby graphics
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
  function ResistorView( model, x, y, options ) {

    Node.call( this, { x: x, y: y } );

    var height = 200;
    var width = 500;
    var shift = height / 3;
    var resistorShape1 = new Shape();
    var resistorShape2 = new Shape();
    var resistor = new Node();
    var path1;
    var path2;
    var linearGradient1 = new LinearGradient( 0, 0, 0, height )
      .addColorStop( 0, '#e4e4e4' )
      .addColorStop( 0.2, '#FFF' )
      .addColorStop( 0.5, '#FFF' )
      .addColorStop( 0.81, '#bfbfbf' )
      .addColorStop( 1, '#575757' );
    var areaToHeight = new LinearFunction( options.area.min, options.area.max, 3, 200, true );
    var lengthToWidth = new LinearFunction( options.length.min, options.length.max, 15, 500, true );
    var resistivityToDot = new LinearFunction( options.resistivity.min, options.resistivity.max, 25, 500, true );

    resistor.addChild( path1 = new Path( resistorShape1, {
      stroke: '#000',
      fill: linearGradient1,
      lineWidth: 1
    } ) );

    resistor.addChild( path2 = new Path( resistorShape2, {
      stroke: '#000',
      fill: '#f2f2f2',
      lineWidth: 1
    } ) );
    this.addChild( resistor );

    var dotGroup = new Node();
    var maxPoints = 500;
    var a = (height - 3) * (width + shift) / maxPoints;    //area per dot
    var d = Math.pow( a, 0.5 ); //NN dot separation
    var nRows = Math.round( height / d );
    var nCols = Math.round( (width + shift) / d );
    var c = 0; //counter

    var points = [];

    for ( var i = 1; i <= nRows; i++ ) {
      for ( var j = 1; j <= nCols; j++ ) {
        var p = new Circle( 2, { fill: '#000' } );
        p.y = i * d - d / 2 + Math.random() * d * 0.7 - 3;
        p.x = j * d - d / 2 + Math.random() * d * 0.7;
        points.push( p );
        dotGroup.addChild( p );
        c++;
      }
    }
    maxPoints = c;

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
      return ( dot.y - 100 > -height / 2 + 3 && dot.y - 100 < height / 2 - 3 && dot.x - 290 > -width / 2 + 0 + shiftDotInResistor( dot.y, height ) && dot.x - 290 < width / 2 + 0 - shiftDotInResistor( dot.y, height ) );
    }

    model.resistanceProperty.link( function updateResistor( val ) {

      resistorShape1 = new Shape();
      resistorShape2 = new Shape();
      height = areaToHeight( model.area );
      width = lengthToWidth( model.length );
      shift = height / 3;
      linearGradient1.end.y = height;

      resistorShape1.moveTo( 5, 0 );
      resistorShape1.cubicCurveTo( shift + 5, 0, shift + 5, height, 5, height );
      resistorShape1.lineTo( width - 3, height );
      resistorShape1.cubicCurveTo( width - 3 + shift, height, width - 3 + shift, 0, width - 3, 0 );
      resistorShape1.close();

      resistorShape2.moveTo( 5, 0 );
      resistorShape2.cubicCurveTo( shift + 5, 0, shift + 5, height, 5, height );
      resistorShape2.cubicCurveTo( -shift + 5, height, -shift + 5, 0, 5, 0 );
      resistorShape2.close();

      path1.shape = resistorShape1;
      path2.shape = resistorShape2;
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

  return inherit( Node, ResistorView );
} );