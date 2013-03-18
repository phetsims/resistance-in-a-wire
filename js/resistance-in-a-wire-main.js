/**
 * Copyright 2002-2013, University of Colorado
 * Main entry point for the "resistance in a wire" sim.
 * Author: Vasily Shakhov (Mlearner)
 */

require(
    [
      "easel",
      "PHETCOMMON/view/CanvasQuirks",
      "model/ResistanceInAWireModel",
      "view/ResistanceInAWireView",
      "i18n!../nls/resistance-in-a-wire-strings"
    ],
    function (Easel, CanvasQuirks, ResistanceInAWireModel, ResistanceInAWireView, Strings ) {
      'use strict';
      // Title --------------------------------------------------------------------
      $( 'title' ).html( Strings.title );

      // Model --------------------------------------------------------------------
      var model = new ResistanceInAWireModel();

      var container = $( "#canvasContainer" ).css( 'position', 'relative' );
      // View --------------------------------------------------------------------
      var view = new ResistanceInAWireView( container, model );

      CanvasQuirks.fixTextCursor( view.$canvas );

      //Touch
      Easel.Touch.enable( view.$stage, false, false );
    } );
