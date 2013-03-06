/**
 * Copyright 2002-2013, University of Colorado
 * Container for sliders and circumjacent text
 * Author: Vasily Shakhov (Mlearner)
 */


define( [
  "easel",
  "i18n!../../../nls/resistance-in-a-wire-strings",
  "view/shapes/WhiteBox",
  "view/shapes/Slider",
  "image!images/slider.png",
  "view/shapes/CurrentResistanceView"
], function ( Easel, i18n, WhiteBox, Slider, sliderImage, CurrentResistanceView ) {
  'use strict';
  return function ( model, view ) {

    var root = new Easel.Container();

    //rect around sliders
    var rectW = 380,
      rectH = 500,
      rectX = 600,
      rectY = 80;
    root.addChild( new WhiteBox( rectX, rectY, rectW, rectH ) );

    //texts for slider1, slider2
    var defaultFont = "30px Verdana",
      defaultColor = "#0f0ffb";
    var texts = [
      [
        {
          val: "ρ",
          font: "60px Courier New bold"
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
          font: "60px Georgia bold"
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
          font: "60px Courier New bold"
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
    var yCoords = [85, 140, 420 , 450];
    var xCoords = [95, 190, 285];

    //set texts
    for ( var i = 0, l = texts.length; i < l; i++ ) {
      var textI = texts[i];
      for ( var j = 0, l1 = textI.length; j < l1; j++ ) {
        textI[j].view = new Easel.Text( textI[j].val, textI[j].font || defaultFont, textI[j].color || defaultColor );
        textI[j].view.setTransform( rectX + xCoords[i] + (textI[j].dx || 0), rectY + yCoords[j] );
        textI[j].view.textAlign = textI[j].textAlign || "center";
        root.addChild( textI[j].view );
      }
    }

    var c = 0;
    ['resistivity', 'length', 'area'].forEach( function ( entry ) {
      //observer, changes view when props value changes
      model[entry].addObserver( function ( c ) {
        return function ( val ) {
          texts[c][2].view.text = val;
        };
      }( c ) );
      //add slider
      root.addChild( new Slider( view, rectX + xCoords[c], rectY + 170, 240, model[entry], sliderImage ) );
      c++;
    } );

    //resistance value
    root.addChild( new CurrentResistanceView( model, rectX, rectY, rectW ) );

    return root;
  };
} );