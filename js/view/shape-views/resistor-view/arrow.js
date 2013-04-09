/**
 * Copyright 2002-2013, University of Colorado
 * arrow beyond the resistor -  graphical element, not changed during simulation
 * Author: Vasily Shakhov (Mlearner)
 */


define( function ( require ) {
  'use strict';

  var Easel = require( "easel" );

  return function Arrow( model, x, y, width ) {
    var arrow = new Easel.Shape();

    //arrow params
    // lw - lineWidth, length,
    // dw - arrowtipwidth, dh - arrowtipdeep
    var lw = 12,
        length = width,
        dw = 8,
        dh = 45;

    //set styles for arrow
    arrow.graphics.setStrokeStyle( 1 ).beginStroke( "black" ).beginFill( "#FFF" );
    //draw top half of arrow, mt = moveTo, lt = LineTos
    arrow.graphics.mt( 0, dw ).lt( length - dh, dw ).lt( length - dh, 0 ).lt( length, lw / 2 + dw );
    //draw bottom half of arrow
    arrow.graphics.lt( length - dh, lw + 2 * dw ).lt( length - dh, lw + dw ).lt( 0, lw + dw ).lt( 0, dw );

    //set x,y of arrow
    arrow.x = x;
    arrow.y = y;
    return arrow;
  };
} );