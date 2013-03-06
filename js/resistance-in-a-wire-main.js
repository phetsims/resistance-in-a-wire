/**
 * Copyright 2002-2013, University of Colorado
 * Main entry point for the "ohms law" sim.
 * Author: Vasily Shakhov (Mlearner)
 */
require(
  [
    "PHETCOMMON/view/CanvasQuirks",
    "model/ResistanceInAWireModel",
    "view/ResistanceInAWireStage",
    "i18n!../nls/resistance-in-a-wire-strings"
  ],
  function ( CanvasQuirks, ResistanceInAWireModel,ResistanceInAWireStage, Strings ) {
    'use strict';
    // Title --------------------------------------------------------------------
    $( 'title' ).html( Strings.title );

    // Model --------------------------------------------------------------------
    var model = new ResistanceInAWireModel();

    // View --------------------------------------------------------------------
    var canvas = document.getElementById( 'canvas' );
    CanvasQuirks.fixTextCursor( canvas );
    var stage = new ResistanceInAWireStage( canvas, model );

    //Touch
    createjs.Touch.enable( stage, false, false );
  } );
