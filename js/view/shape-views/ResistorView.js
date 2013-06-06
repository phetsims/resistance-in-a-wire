/**
 * Copyright 2002-2013, University of Colorado
 * Container for resistor and nearby graphics
 * Author: Vasily Shakhov (Mlearner)
 */
define( function( require ) {
  'use strict';

  var Easel = require( "easel" );
  var Arrow = require( "view/shape-views/resistor-view/arrow" );
  var Resistor = require( "view/shape-views/resistor-view/resistor" );

  return function ResistorView( model, view, x, y ) {
    var root = new Easel.Container();

    var width = 480,
      height = 180;

    //arrow width
    var arrowWidth = 150;
    root.addChild( new Arrow( model, x + width / 2 - arrowWidth / 4, y + height + 10, arrowWidth ) );

    //resistor
    var resistor = new Resistor( model, x, y, width, height );
    root.addChild( resistor );

    return root;
  };
} );