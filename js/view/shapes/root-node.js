/**
 * Copyright 2002-2013, University of Colorado
 * Main container for all part of scene
 * Author: Vasily Shakhov (Mlearner)
 */

define( [
          'easel',
          'view/shapes/sliders-box',
          'view/shapes/formula-view',
          'view/shapes/resistor-view'
        ], function ( Easel, SlidersBox, FormulaView, ResistorView ) {
  'use strict';
  return function ( model, view ) {
    var root = new Easel.Container();

    //background
    var background = new Easel.Shape();
    background.graphics.beginFill( '#ffffdf' ).rect( 0, 0, view.defaultW, view.defaultH );
    root.addChild( background );

    root.addChild( new FormulaView( model, 70, 350 ) );
    root.addChild( new SlidersBox( model, view, 600, 80 ) );
    root.addChild( new ResistorView( model, view, 10, 40 ) );


    return root;
  };
} );