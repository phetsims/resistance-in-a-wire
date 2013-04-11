/**
 * Copyright 2002-2013, University of Colorado
 * Stage for the "OhmsLaw" module, sets up the scene.
 * Author: Vasily Shakhov (Mlearner)
 */

define( function ( require ) {
  'use strict';

  var Easel = require( "easel" );
  var RootNode = require( "view/shape-views/RootNode" );

  function ResistanceInAWireStage( canvas, model ) {
    var self = this;
    self.model = model;

    this.stage = new Easel.Stage( canvas );
    this.DEFAULTWIDTH = 1000;
    this.DEFAULTHEIGHT = 640;

    // rendering order
    this.stage.addChild( new RootNode( self.model, self ) );

    //Enable touch and prevent default
    Easel.Touch.enable( this.stage, false, false );

    //enable mouseover events and change the mouse cursor icon
    this.stage.enableMouseOver();

    //update when any value changed
    ['resistivity', 'length', 'area'].forEach( function ( entry ) {
      model[entry].property.addObserver( function () {
        self.stage.update();
      } );
    } );

  }

  // resize handler
  ResistanceInAWireStage.prototype.resize = function ( scale ) {
    this.stage.scaleX = this.stage.scaleY = scale;
    // force rendering update
    this.stage.update();
  };

  return ResistanceInAWireStage;
} );
