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
    var minw = height / 2,
        minh = 5,
        maxw = width,
        maxh = height;

    //current params
    self.width = width;
    self.height = width;

    //draws resistor
    var drawBox = function ( width, height ) {
      container.setTransform( x + minw / 2 + maxw / 2 - width / 2, y + maxh / 2 - height / 2 );

      //ellipse params
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
      ctx.beginLinearGradientFill( ['#e4e4e4', "#FFF", '#FFF', '#bfbfbf', '#575757'], [0, 0.2, 0.5, 0.81, 1], 0, 0, 0, height );

      ctx.s( 1 ).mt( height / 4, 0 ).lt( width - height / 4, 0 );
      ctx.bezierCurveTo( xm + ox, 0, xe, ym - oy, xe, ym );
      ctx.bezierCurveTo( xe, ym + oy, xm + ox, ye, xm, ye );
      ctx.lt( height / 4, height );
      ctx.bezierCurveTo( xm1 - ox, ye, 0, ym + oy, 0, ym );
      ctx.bezierCurveTo( 0, ym - oy, xm1 - ox, 0, xm1, 0 ).endFill().closePath();

      ctx.mt( xm1, 0 ).bezierCurveTo( xm1 + ox, 0, xe1, ym - oy, xe1, ym );
      ctx.bezierCurveTo( xe1, ym + oy, xm1 + ox, ye, xm1, ye );

      dotsContainer.mask = box;
    };

    //black points
    //black points in the resistor
    var dotsContainer = new Easel.Container();
    var maxPoints = 900,
        a = (maxh - 3) * (maxw + minw - 3) / maxPoints,    //area per dot
        d = Math.pow( a, 0.5 ), //NN dot separation
        nRows = Math.round( maxh / d ),
        nCols = Math.round( (maxw + minw) / d ),
        c = 0; //counter

    var points = [];

    for ( var i = 1; i <= nRows; i++ ) {
      for ( var j = 1; j <= nCols; j++ ) {
        var p = new Easel.Shape();
        p.graphics.beginFill( "#000" ).drawCircle( 0, 0, 2 );
        p.x = 0 + j * d - d / 2 + Math.random() * d * 0.7 - 3;
        p.y = 0 + i * d - d / 2 + Math.random() * d * 0.7;
        points.push( p );
        dotsContainer.addChild( p );
        c++;
      }
    }
    maxPoints = c;

    for ( i = points.length - 1; i > -1; i-- ) {
      var pos = parseInt( Math.random() * i, 10 );
      var tt = points[i];
      points[i] = points[pos];
      points[pos] = tt;
    }

    //observers for value changes
    model.area.addObserver( function ( val ) {
      self.height = minh + maxh * (val - model.area.MIN) / (model.area.MAX - model.area.MIN);
      drawBox( self.width, self.height );
    } );

    model.length.addObserver( function ( val ) {
      self.width = minw + maxw * (val - model.length.MIN) / (model.length.MAX - model.length.MIN);
      drawBox( self.width, self.height );
    } );

    model.resistivity.addObserver( function ( val ) {
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