/**
 * Copyright 2002-2013, University of Colorado
 * Main entry point for the "resistance in a wire" sim.
 * Author: Vasily Shakhov (Mlearner)
 */

define( function ( require ) {
  'use strict';

  var CanvasQuirks = require( "../../phetcommon/js/view/CanvasQuirks" );
  var ResistanceInAWireModel = require( 'model/resistance-in-a-wire-model' );
  var ResistanceInAWireView = require( "view/resistance-in-a-wire-view" );
  var Strings = require( 'i18n!../nls/resistance-in-a-wire-strings' );
  var FastClick = require( "contrib/fastclick.js" );

  new FastClick( document.body );

  // Title --------------------------------------------------------------------
  $( 'title' ).html( Strings.title );

  // Model --------------------------------------------------------------------
  var model = new ResistanceInAWireModel();

  var $container = $( "#canvasContainer" );
  // View --------------------------------------------------------------------
  var view = new ResistanceInAWireView( $container, model );


  //title on bottom pane
  $( document.body ).find( ".tab-name" ).html( Strings.title );

  CanvasQuirks.fixTextCursor( view.$canvas );

} );
