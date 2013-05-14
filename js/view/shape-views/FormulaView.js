/**
 * Copyright 2002-2013, University of Colorado
 * Block shows R = ρL/A formula with letters scaling
 * Author: Vasily Shakhov (Mlearner)
 */


define( function ( require ) {
  'use strict';

  var Easel = require( "easel" );

  return function FormulaView ( model, x, y ) {
    var root = new Easel.Container();

    //static text
    // "="
    var equalYPosition = y;
    //hack for text position, see http://community.createjs.com/discussions/easeljs/657-text-position
    var userAgent = window.navigator.userAgent;
    if ( userAgent.indexOf( "Firefox" ) !== -1 || userAgent.indexOf( "Macintosh" ) !== -1 ) {
      equalYPosition += 11;
    }
    var text = new Easel.Text( "=", "100px bold Georgia", "#000" ).setTransform( x + 100, equalYPosition );
    root.addChild( text );

    //"---" line between ρL and A
    var shape = new Easel.Shape();
    shape.graphics.ss( 8 ).s( "#000" ).mt( x + 200, y + text.getMeasuredHeight() / 2 + 3 ).lt( x + 400, y + text.getMeasuredHeight() / 2 + 3 );
    root.addChild( shape );

    //texts parts of full string
    //scale - multiplier
    var texts = [
      {
        label: "R",
        scale: 3 / 2,
        x: x + 50,
        y: y + 60,
        targetProperty: "resistance",
        color: "#ed1c24"
      },
      {
        label: "ρ",
        x: x + 250,
        y: y - 63,
        targetProperty: "resistivity",
        color: "#0f0ffb"
      },
      {
        label: "L",
        x: x + 340,
        y: y-33,
        targetProperty: "length",
        color: "#0f0ffb"
      },
      {
        label: "A",
        x: x + 300,
        y: y + 130,
        targetProperty: "area",
        color: "#0f0ffb"
      }
    ];

    //create all texts and place them in x,y coords, then set basepoint and add to container
    texts.forEach( function ( entry ) {
      entry.view = new Easel.Text( entry.label, "130px Georgia", entry.color ).setTransform( entry.x, entry.y );
      entry.view.textBaseline = "middle";
      entry.view.regX = entry.view.getMeasuredWidth() / 2;
      root.addChild( entry.view );
      //scale - coefficient between real value and visual size, by default 1/startValue, if not override by params above
      //never changes
      entry.scale = entry.scale || 1 / model[entry.targetProperty].property.get();
      model[entry.targetProperty].property.addObserver( function ( val ) {
        entry.view.scaleX = entry.scale * val + 0.125;
        entry.view.scaleY = entry.scale * val + 0.125;
      } );
    } );

    return root;
  };
} );