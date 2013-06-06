/**
 * Copyright 2002-2013, University of Colorado
 * Block shows Current TextBlock inside WireBlock
 * Author: Vasily Shakhov (Mlearner)
 */


define( function( require ) {
  'use strict';

  var Easel = require( "easel" );
  var i18n = require( 'resistance-in-a-wire-strings' );

  return function CurrentResistanceView( model, x, y, w ) {
    var root = new Easel.Container();

    //text size and maxWidth
    var textSize = 30,
      maxWidth = w * 0.95;

    //texts parts of full string
    var texts = [
      {val: i18n.resistanceEq + " "},
      {val: "1000"},
      {val: " " + i18n.ohm}
    ];

    //init and transform texts
    var totalWidth = 0;
    texts.forEach( function( entry ) {
      entry.view = new Easel.Text( entry.val, textSize + "px Verdana", "#F00" );
      root.addChild( entry.view );
      entry.width = entry.view.getMeasuredWidth();
      totalWidth += entry.width;
    } );

    //scaling
    var scale = 1;
    if ( totalWidth > maxWidth ) {
      scale = maxWidth / totalWidth;
    }

    var midY = y + 10,
      offsetX = x + w / 2 - scale * totalWidth / 2;

    texts.forEach( function( entry ) {
      entry.view.setTransform( offsetX, midY, scale, scale );
      offsetX += scale * entry.width;
    } );

    texts[1].view.textAlign = "end";
    texts[1].view.setTransform( texts[1].view.x + scale * texts[1].width, midY, scale, scale );

    //observer, changes view when current value changes
    // we must always show <=4 digits, so 1500.12 -> 1500, 150.12 -> 150.1
    model.resistance.property.addObserver( function( val ) {
      if ( val.charAt( 3 ) === '.' || val.charAt( 3 ) === ',' ) {
        val = val.substring( 0, 3 );
      }
      else {
        val = val.substring( 0, 4 );
      }
      texts[1].view.text = val;
    } );

    return root;
  };
} );