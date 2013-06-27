// Copyright 2002-2013, University of Colorado Boulder

/**
 * Copyright 2002-2013, University of Colorado
 * Container for sliders and circumjacent text
 * Author: Vasily Shakhov (Mlearner)
 */


define( function( require ) {
  'use strict';

  var Easel = require( "easel" );

  function showPointer() {
    document.body.style.cursor = "pointer";
  }

  function showDefault() {
    document.body.style.cursor = "default";
  }

  function setCursorHand( displayObject ) {
    displayObject.onMouseOver = showPointer;
    displayObject.onMouseOut = showDefault;
  }

  return function Slider( view, x, y, h, targetProperty, img ) {
    var root = new Easel.Container();

    //background
    var back = new Easel.Shape();
    back.graphics.setStrokeStyle( 6 ).beginStroke( "#000" );
    back.graphics.moveTo( x, y ).lineTo( x, y + h );
    root.addChild( back );

    //image
    var imgShape = new Easel.Bitmap( img ).setTransform( x - img.width / 2, y );
    setCursorHand( imgShape );
    root.addChild( imgShape );

    //drag
    var offset = {};
    h = h - img.height;

    imgShape.onPress = function( e ) {
      offset = {x: e.stageX / view.stage.scaleX - imgShape.x, y: e.stageY / view.stage.scaleX - imgShape.y};
      e.onMouseMove = drag;
    };
    imgShape.onMouseUp = function( e ) {
      e.onMouseOver = showPointer;
    };
    var drag = function( e ) {
      var topY = e.stageY / view.stage.scaleX - offset.y;
      topY = Math.max( y, Math.min( topY, y + h ) );
      imgShape.y = topY;
      targetProperty.property.set( targetProperty.MIN + (targetProperty.MAX - targetProperty.MIN) * (y - topY + h) / h );
    };

    //observer, set position when changed
    targetProperty.property.addObserver( function() {
      imgShape.y = y + h - h * (targetProperty.property.get() - targetProperty.MIN) / (targetProperty.MAX - targetProperty.MIN);
    } );

    return root;
  };
} );