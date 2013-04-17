/**
 * Copyright 2002-2013, University of Colorado
 * Container for sliders and circumjacent text
 * Author: Vasily Shakhov (Mlearner)
 */


define( function ( require ) {
  'use strict';

  var Easel = require( "easel" );
  var i18n = require( 'resistance-in-a-wire-strings' );
  var WhiteBox = require( "view/shape-views/slider-box-view/WhiteBox" );
  var Slider = require( "view/shape-views/slider-box-view/slider" );
  var sliderImage = require( "image!images/slider.png" );
  var CurrentResistanceView = require( "view/shape-views/slider-box-view/CurrentResistanceView" );

  return function SliderBox( model, view, x, y ) {

    var root = new Easel.Container();

    //rect around sliders
    var rectW = 380,
        rectH = 500,
        rectX = x,
        rectY = y;
    root.addChild( new WhiteBox( rectX, rectY, rectW, rectH ) );

    //texts for slider1, slider2
    var defaultFontFamily = "Verdana",
        defaultFont = "30px " + defaultFontFamily,
        defaultColor = "#0f0ffb";
    var texts = {
      resistivity: [
        {val: "ρ", font: "60px Georgia", dy: -10},
        {val: i18n.resistivity, font: "16px "+defaultFontFamily},
        {val: model.resistivity.property.get(), color: "#000"},
        {val: "Ω" + i18n.cm}
      ],
      length: [
        {val: "L", font: "60px Georgia"},
        {val: i18n.length, font: "16px "+defaultFontFamily},
        {val: model.length.property.get(), color: "#000"},
        {val: i18n.cm}
      ],
      area: [
        {val: "A", font: "60px Georgia"},
        {val: i18n.area, font: "16px "+defaultFontFamily},
        {val: model.area.property.get(), color: "#000"},
        {val: i18n.cm}
      ]
    };
    //xy Grid
    var yCoords = [60, 120, 410 , 445];
    var xCoords = [70, 195, 320];

    var listOfValues = ['resistivity', 'length', 'area'];

    //set texts
    for ( var i = 0, l = listOfValues.length; i < l; i++ ) {
      var textI = texts[listOfValues[i]];
      for ( var j = 0, l1 = textI.length; j < l1; j++ ) {
        textI[j].view = new Easel.Text( textI[j].val, textI[j].font || defaultFont, textI[j].color || defaultColor );
        textI[j].view.setTransform( rectX + xCoords[i] + (textI[j].dx || 0), rectY + yCoords[j] + (textI[j].dy || 0) );
        textI[j].view.textAlign = textI[j].textAlign || "center";
        textI[j].view.textBaseline = textI[j].textBaseline || "top";
        root.addChild( textI[j].view );
      }
    }

    //additional square (2) on area units, tt = target text, where sup added
    var targetText = texts.area[3];
    var sqr = new Easel.Text( "2", "20px "+defaultFontFamily, targetText.color || defaultColor );
    sqr.setTransform( rectX + xCoords[2] + targetText.view.getMeasuredWidth() / 2, rectY + yCoords[3] + (targetText.dy || 0) - 10 );
    root.addChild( sqr );

    var c = 0;
    listOfValues.forEach( function ( entry ) {
      //observer, changes view when props value changes
      model[entry].property.addObserver( function ( val ) {
        texts[entry][2].view.text = val;
      } );
      //add slider
      root.addChild( new Slider( view, rectX + xCoords[c], rectY + 145, 260, model[entry], sliderImage ) );
      c++;
    } );

    //resistance value
    root.addChild( new CurrentResistanceView( model, rectX, rectY, rectW ) );

    return root;
  };
} );