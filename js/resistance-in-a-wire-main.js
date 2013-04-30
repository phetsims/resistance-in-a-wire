/**
 * Copyright 2002-2013, University of Colorado
 * Main entry point for the "resistance in a wire" sim.
 * Author: Vasily Shakhov (Mlearner)
 */

define( function ( require ) {
  'use strict';

  var CanvasQuirks = require( "PHETCOMMON/view/CanvasQuirks" );
  var ResistanceInAWireModel = require( 'model/ResistanceInAWireModel' );
  var ResistanceInAWireView = require( "view/ResistanceInAWireView" );
  var i18n = require( 'resistance-in-a-wire-strings' );
  var FastClick = require( "fastclick" );
  var ImagesLoader = require('PHETCOMMON/util/ImagesLoader');
  var imageLoader = require('imageLoader');

  new FastClick( document.body );

  // Title --------------------------------------------------------------------
  $( 'title' ).html( i18n.simTitle );

  // Model --------------------------------------------------------------------
  var model = new ResistanceInAWireModel();

  var $container = $( "#canvasContainer" );

  //title on bottom pane
  $( document.body ).find( ".tab-name" ).html( i18n.title );

  new ImagesLoader( function( loader ) {

    //Initialize the image loader
    imageLoader.getImage = loader.getImage;

    // View --------------------------------------------------------------------
    var view = new ResistanceInAWireView( $container, model );

    CanvasQuirks.fixTextCursor( view.$canvas );
  } );
} );
