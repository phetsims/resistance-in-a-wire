/**
 * Copyright 2002-2013, University of Colorado
 * Block shows R = ρL/A formula with letters scaling
 * Author: Vasily Shakhov (Mlearner)
 */


define( function ( require ) {
  'use strict';

  var Easel = require( "easel" );

  return function ( model, x, y ) {
    var root = new Easel.Container();

    //static text
    // "="
    var text = new Easel.Text( "=", "100px Georgia bold", "#000" ).setTransform( x + 100, y );
    root.addChild( text );

    //"---" line between ρL and A
    var shape = new Easel.Shape();
    shape.graphics.ss( 8 ).s( "#000" ).mt( x + 200, y + text.getMeasuredHeight() / 2 + 3 ).lt( x + 400, y + text.getMeasuredHeight() / 2 + 3 );
    root.addChild( shape );

    //texts parts of full string
    //scale - multiplier
    var texts = [
      {
        val: "R",
        scale: 3 / 2,
        x: x + 50,
        y: y + 60,
        targetProperty: "resistance",
        color: "#ed1c24"
      },
      {
        val: "ρ",
        x: x + 250,
        y: y - 30,
        targetProperty: "resistivity",
        color: "#0f0ffb"
      },
      {
        val: "L",
        x: x + 340,
        y: y,
        targetProperty: "length",
        color: "#0f0ffb"
      },
      {
        val: "A",
        x: x + 300,
        y: y + 130,
        targetProperty: "area",
        color: "#0f0ffb"
      }
    ];

    texts.forEach( function ( entry ) {
      entry.view = new Easel.Text( entry.val, "140px Georgia", entry.color ).setTransform( entry.x, entry.y );
      entry.view.regX = entry.view.getMeasuredWidth() / 2;
      entry.view.regY = entry.view.getMeasuredHeight() / 2;
      root.addChild( entry.view );
      entry.scale = entry.scale || 1 / model[entry.targetProperty].DEFAULT;
      model[entry.targetProperty].addObserver( function ( val ) {
        entry.view.scaleX = entry.scale * val;
        entry.view.scaleY = entry.scale * val;
        //TODO scales incorrectly
      } );
    } );

    return root;
  };
} );