/**
 * Copyright 2002-2013, University of Colorado
 * Main entry point for the "resistance in a wire" sim.
 * Author: Vasily Shakhov (Mlearner)
 */

define( function ( require ) {
  'use strict';

  var Easel = require( 'easel' );
  var CanvasQuirks = require( "PHETCOMMON/view/CanvasQuirks" );
  var ResistanceInAWireModel = require( 'model/resistance-in-a-wire-model' );
  var ResistanceInAWireView = require( "view/resistance-in-a-wire-view" );
  var Strings = require( 'i18n!../nls/resistance-in-a-wire-strings' );

  // Title --------------------------------------------------------------------
  $( 'title' ).html( Strings.title );

  // Model --------------------------------------------------------------------
  var model = new ResistanceInAWireModel();

  var $container = $( "#canvasContainer" );
  // View --------------------------------------------------------------------
  var view = new ResistanceInAWireView( $container, model );

  CanvasQuirks.fixTextCursor( view.$canvas );

} );
