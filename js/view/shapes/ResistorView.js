/**
 * Copyright 2002-2013, University of Colorado
 * Container for resistor and nearby graphics
 * Author: Vasily Shakhov (Mlearner)
 */
define( [
          "easel",
          "view/shapes/ResistorView/Arrow",
          "view/shapes/ResistorView/Resistor"
        ], function ( Easel, Arrow, Resistor ) {
  'use strict';
  return function ( model, view, x, y ) {
    var root = new Easel.Container();

    var width = 480,
        height = 180;

    //arrow width
    var arroww = 150;
    root.addChild( new Arrow( model, x + width / 2 - arroww / 4, y + height + 10, arroww ) );

    //resistor
    var resistor = new Resistor( model, x, y, width, height );
    root.addChild( resistor );

    return root;
  };
} );