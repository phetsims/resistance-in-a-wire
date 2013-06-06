/**
 * Copyright 2002-2013, University of Colorado
 * White Block with black border container, decorator for slider's block
 * Author: Vasily Shakhov (Mlearner)
 */


define( function( require ) {
  'use strict';

  var Easel = require( "easel" );

  return function WhiteBox( x, y, w, h ) {
    var rect = new Easel.Shape();
    rect.graphics.setStrokeStyle( 3 ).beginStroke( "#000" ).beginFill( "#FFF" );
    rect.graphics.drawRoundRect( x, y, w, h, 12 );
    return rect;
  };
} );