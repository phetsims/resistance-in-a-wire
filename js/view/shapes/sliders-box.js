/**
 * Copyright 2002-2013, University of Colorado
 * Container for sliders and circumjacent text
 * Author: Vasily Shakhov (Mlearner)
 */


define( function ( require ) {
  'use strict';

  var Easel = require( "easel" );
  var i18n = require( "i18n!../../../nls/resistance-in-a-wire-strings" );
  var WhiteBox = require( "view/shapes/SliderBox/white-box" );
  var Slider = require( "view/shapes/SliderBox/slider" );
  var sliderImage = require( "image!images/slider.png" );
  var CurrentResistanceView = require( "view/shapes/SliderBox/current-resistance-view" );

  return function ( model, view, x, y ) {

    var root = new Easel.Container();

    //rect around sliders
    var rectW = 380,
        rectH = 500,
        rectX = x,
        rectY = y;
    root.addChild( new WhiteBox( rectX, rectY, rectW, rectH ) );

    //texts for slider1, slider2
    var defaultFont = "30px Verdana",
        defaultColor = "#0f0ffb";
    var texts = [
      [
        {
          val: "ρ",
          font: "60px Georgia",
          dy: -10
        },
        {
          val: i18n.resistivity,
          font: "16px Verdana"
        },
        {
          val: model.resistivity.get(),
          color: "#000"
        },
        {
          val: "Ω" + i18n.cm
        }
      ],
      [
        {
          val: "L",
          font: "60px Georgia"
        },
        {
          val: i18n.length,
          font: "16px Verdana"
        },
        {
          val: model.length.get(),
          color: "#000"
        },
        {
          val: i18n.cm
        }
      ],
      [
        {
          val: "A",
          font: "60px Georgia"
        },
        {
          val: i18n.area,
          font: "16px Verdana"
        },
        {
          val: model.area.get(),
          color: "#000"
        },
        {
          val: i18n.cm
        }
      ]
    ];
    //xy Grid
    var yCoords = [60, 120, 405 , 445];
    var xCoords = [95, 190, 285];

    //set texts
    for ( var i = 0, l = texts.length; i < l; i++ ) {
      var textI = texts[i];
      for ( var j = 0, l1 = textI.length; j < l1; j++ ) {
        textI[j].view = new Easel.Text( textI[j].val, textI[j].font || defaultFont, textI[j].color || defaultColor );
        textI[j].view.setTransform( rectX + xCoords[i] + (textI[j].dx || 0), rectY + yCoords[j] + (textI[j].dy || 0) );
        textI[j].view.textAlign = textI[j].textAlign || "center";
        textI[j].view.textBaseline = textI[j].textBaseline || "top";
        root.addChild( textI[j].view );
      }
    }

    //additional square (2) on area units, tt = target text, where sup added
    var targetText = texts[2][3];
    var sqr = new Easel.Text( "2", "20px Verdana", targetText.color || defaultColor );
    sqr.setTransform( rectX + xCoords[2] + texts[2][3].view.getMeasuredWidth() / 2, rectY + yCoords[3] + (targetText.dy || 0) - 10 );
    root.addChild( sqr );

    var c = 0;
    ['resistivity', 'length', 'area'].forEach( function ( entry ) {
      //observer, changes view when props value changes
      model[entry].addObserver( function ( c ) {
        return function ( val ) {
          texts[c][2].view.text = val;
        };
      }( c ) );
      //add slider
      root.addChild( new Slider( view, rectX + xCoords[c], rectY + 145, 260, model[entry], sliderImage ) );
      c++;
    } );

    //resistance value
    root.addChild( new CurrentResistanceView( model, rectX, rectY, rectW ) );

    return root;
  };
} );