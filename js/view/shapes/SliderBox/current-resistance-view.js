/**
 * Copyright 2002-2013, University of Colorado
 * Block shows Current TextBlock inside WireBlock
 * Author: Vasily Shakhov (Mlearner)
 */


define( [
          "easel",
          "i18n!../../../../nls/resistance-in-a-wire-strings"
        ], function ( Easel, i18n ) {
  'use strict';
  return function ( model, x, y, w ) {
    var root = new Easel.Container();

    //text size and y point of texts
    var textSize = 30,
        midY = y + 10,
        midX = x + w / 2;

    //texts parts of full string
    var texts = [
      {val: i18n.resistance + " = "},
      {val: "1.250"},
      {val: " " + i18n.ohm}
    ];

    //init and transform texts
    var totW = 0;
    texts.forEach( function ( entry ) {
      entry.view = new Easel.Text( entry.val, textSize + "px Verdana", "#F00" );
      root.addChild( entry.view );
      entry.width = entry.view.getMeasuredWidth();
      totW += entry.width;
    } );

    var offset = midX - totW / 2;
    texts.forEach( function ( entry ) {
      entry.view.setTransform( offset, midY );
      offset += entry.width;
    } );

    texts[1].view.textAlign = "end";
    texts[1].view.setTransform( texts[1].view.x + texts[1].width, midY );

    //observer, changes view when current value changes
    model.resistance.addObserver( function ( val ) {
      if ( val.charAt( 3 ) === '.' ) {
        val = val.substring( 0, 5 );
      }
      else {
        val = val.substring( 0, 4 );
      }
      texts[1].view.text = val;
    } );

    return root;
  };
} );