/**
 * Copyright 2002-2013, University of Colorado
 * View for resistor
 * Author: Vasily Shakhov (Mlearner)
 */
define( function ( require ) {
  'use strict';

  var Easel = require( 'easel' );

  return function Resistor( model, x, y, width, height ) {
    var self = this;
    var container = new Easel.Container();

    //resistor
    var box = new Easel.Shape();

    //default vars
    var minw = height / 2 + 5,
        minh = 1,
        maxw = width,
        maxh = height;

    //current params
    self.width = width;
    self.height = height;

    var resistorWidth = width,
        resistorHeight = height;


    //two points which always should be visible;
    var pp1 = new Easel.Shape();
    pp1.graphics.beginFill( "#000" ).drawCircle( 0, 0, 2 );
    var pp2 = new Easel.Shape();
    pp2.graphics.beginFill( "#000" ).drawCircle( 0, 0, 2 );
    pp1.x = width / 2;
    pp1.y = height / 2;
    pp2.x = width * 2 / 3;
    pp2.y = height * 2 / 3;

    container.setTransform( x, y );
    //draws resistor
    var drawBox = function ( width, height ) {
      width += minw;
      box.setTransform( self.width / 2 - width / 2, self.height / 2 - height / 2 );


      //ellipse params
      // kappa is koefficient for Bezier Curves (when we draw ellipse)
      // see, for reference, http://www.whizkidtech.redprince.net/bezier/circle/kappa/
      // or http://www.tinaja.com/glib/ellipse4.pdf
      var kappa = 0.5522848;
      var ox = (height / 4) * kappa, // control point offset horizontal
          oy = (height / 2) * kappa, // control point offset vertical
          ye = height,           // y-end
          ym = height / 2,       // y-middle
          xe = width,           // x-end for end
          xm = width - height / 4,       // x-middle  for end
          xe1 = height / 2,  // x-end for start
          xm1 = height / 4;  // x-middle for start

      var ctx = box.graphics;

      ctx.clear();
      //set gradient filling
      ctx.beginLinearGradientFill( ['#e4e4e4', "#FFF", '#FFF', '#bfbfbf', '#575757'], [0, 0.2, 0.5, 0.81, 1], 0, 0, 0, height );

      //draw top line of resistor
      ctx.s( "#000" ).mt( height / 4, 0 ).lt( width - height / 4, 0 );

      //draw right half-ellipse
      ctx.bezierCurveTo( xm + ox, 0, xe, ym - oy, xe, ym );
      ctx.bezierCurveTo( xe, ym + oy, xm + ox, ye, xm, ye );

      //bottom line
      ctx.lt( height / 4, height );

      //left ellipse
      ctx.bezierCurveTo( xm1 - ox, ye, 0, ym + oy, 0, ym );
      ctx.bezierCurveTo( 0, ym - oy, xm1 - ox, 0, xm1, 0 ).endFill().closePath();

      //left ellipse with different filling
      ctx.beginFill( "#f2f2f2" );
      ctx.mt( xm1, ye ).s( "#000" ).bezierCurveTo( xm1 - ox, ye, 0, ym + oy, 0, ym );
      ctx.bezierCurveTo( 0, ym - oy, xm1 - ox, 0, xm1, 0 );
      ctx.mt( xm1, 0 ).bezierCurveTo( xm1 + ox, 0, xe1, ym - oy, xe1, ym );
      ctx.bezierCurveTo( xe1, ym + oy, xm1 + ox, ye, xm1, ye ).endFill().closePath();

      // mask for black dots. Dots drawing in width x height container
      // Then we apply mask (resistor) on this container to show points only in resistor
      dotsContainer.mask = box;
    };

    //black dots in the resistor
    var dotsContainer = new Easel.Container();
    var maxPoints = 900,
        a = (maxh - 3) * (maxw + minw - 3) / maxPoints,    //area per dot
        d = Math.pow( a, 0.5 ), //NN dot separation
        nRows = Math.round( maxh / d ),
        nCols = Math.round( (maxw + minw) / d ),
        c = 0; //counter

    var points = [];

    dotsContainer.addChild( pp1 );
    dotsContainer.addChild( pp2 );

    // create all possible black dots within dotsContainer
    for ( var i = 0; i <= nRows; i++ ) {
      for ( var j = 0; j <= nCols; j++ ) {
        var p = new Easel.Shape();
        p.graphics.beginFill( "#000" ).drawCircle( 0, 0, 2 );
        p.x = j * d - d / 2 + Math.random() * d * 0.7 - 43;
        p.y = 0 + i * d - d / 2 + Math.random() * d * 0.7;
        points.push( p );
        dotsContainer.addChild( p );
        c++;
      }
    }
    maxPoints = c;


    //shuffle array of points to show them evenly
    for ( i = points.length - 1; i > -1; i-- ) {
      var pos = parseInt( Math.random() * i, 10 );
      var tt = points[i];
      points[i] = points[pos];
      points[pos] = tt;
    }

    //observers for value changes
    model.area.property.addObserver( function ( val ) {
      resistorHeight = minh + maxh * (val - model.area.MIN) / (model.area.MAX - model.area.MIN);
      minw = self.height / 2 + 5;
      drawBox( resistorWidth, resistorHeight );
    } );

    model.length.property.addObserver( function ( val ) {
      resistorWidth = maxw * (val - model.length.MIN) / (model.length.MAX - model.length.MIN);
      drawBox( resistorWidth, resistorHeight );
    } );

    //show only % of dots proportional to resistivity/maxResistivity
    model.resistivity.property.addObserver( function ( val ) {
      var borderNumber = maxPoints * (val) / (model.resistivity.MAX);
      for ( var i = 0; i < maxPoints; i++ ) {
        points[i].visible = i < borderNumber;
      }
    } );

    container.addChild( box );
    container.addChild( dotsContainer );
    return container;
  };
} );