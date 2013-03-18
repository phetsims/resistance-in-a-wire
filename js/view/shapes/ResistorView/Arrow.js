/**
 * Copyright 2002-2013, University of Colorado
 * arrow beyond the resistor
 * Author: Vasily Shakhov (Mlearner)
 */


define( function ( require ) {
  'use strict';

  var Easel = require( "easel" );

  return function ( model, x, y, width ) {
    var line = new Easel.Shape();

    //line params , lineWidth, width, height, arrowtipwidth,arrowtipdeep
    var lw = 12,
        w = width,
        dw = 8,
        dh = 45;

    line.graphics.setStrokeStyle( 1 ).beginStroke( "black" ).beginFill( "#FFF" ).mt( 0, dw ).lt( w - dh, dw );
    line.graphics.lt( w - dh, 0 ).lt( w, lw / 2 + dw ).lt( w - dh, lw + 2 * dw ).lt( w - dh, lw + dw ).lt( 0, lw + dw ).lt( 0, dw );
    line.x = x;
    line.y = y;
    return line;
  };
} );