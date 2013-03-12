/**
 * Copyright 2002-2013, University of Colorado
 * Block shows U = IR formula with letters scaling
 * Author: Vasily Shakhov (Mlearner)
 */


define( [
  "easel"
], function ( Easel ) {
  'use strict';
  return function ( model, x, y ) {
    var root = new Easel.Container();

    //texts parts of full string
    //scale - multiplier
    var texts = [
      {
        val: "R",
        scale: 6,
        x: x,
        targetProperty: "resistance",
        color: "#ed1c24"
      },
      {
        val: "ρ",
        scale: 1.5,
        x: x + 220,
        targetProperty: "length",
        color: "#0f0ffb"
      },
      {
        val: "L",
        scale: 0.05,
        x: x + 350,
        targetProperty: "resistance",
        color: "#0f0ffb"
      },
      {
        val: "A",
        scale: 0.05,
        x: 550,
        targetProperty: "area",
        color: "#0f0ffb"
      }
    ];

    texts.forEach( function ( entry ) {
      entry.view = new Easel.Text( entry.val, "14px Courier New bold", entry.color ).setTransform( entry.x, y );
      entry.view.regX = entry.view.getMeasuredWidth() / 2;
      entry.view.regY = entry.view.getMeasuredHeight() * 1.125 / 2;
      root.addChild( entry.view );
      model[entry.targetProperty].addObserver( function ( val ) {
        entry.view.scaleX = entry.scale * val;
        entry.view.scaleY = entry.scale * val;
        //TODO scales incorrectly
      } );
    } );

    //static text
    var text = new Easel.Text( "=", "140px Georgia bold", "#000" ).setTransform( x + 100, y );
    root.addChild( text );

    return root;
  };
} );