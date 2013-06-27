// Copyright 2002-2013, University of Colorado Boulder

/**
 * Copyright 2002-2013, University of Colorado
 * View for ResistanceInAWire simulations. Contains 2 elements : canvas + htmlControls
 * Author: Vasily Shakhov (Mlearner)
 */

define( function( require ) {
  'use strict';

  var ResistanceInAWireStage = require( 'view/ResistanceInAWireStageContainer' );
  var HTMLElements = require( "view/HtmlElements" );

  function ResistanceInAWireView( $container, model ) {
    var self = this;
    self.model = model;

    this.$canvas = $container.find( "canvas" );
    this.stage = new ResistanceInAWireStage( this.$canvas[0], model );
    this.htmlElements = new HTMLElements( model );

    //default width and height of model, when scale = 1, from blueprint and original flash model
    this.DEFAULTWIDTH = 1000;
    this.DEFAULTHEIGHT = 640;

    // resize handler
    var handleResize = function() {

      //Gets rid of scroll bars
      var width = $( window ).width();
      var height = $( window ).height() - 50;
      //50 - height of tabpane on the bottom of the page

      var scale = Math.min( width / self.DEFAULTWIDTH, height / self.DEFAULTHEIGHT );
      var canvasW = scale * self.DEFAULTWIDTH;
      var canvasH = scale * self.DEFAULTHEIGHT;

      //Allow the canvas to fill the screen, but still center the content within the window.
      self.$canvas[0].setAttribute( 'width', canvasW + 'px' );
      self.$canvas[0].setAttribute( 'height', canvasH + 'px' );

      //resize main container
      $container.css( {
                        width: canvasW + 'px',
                        height: canvasH + 'px',
                        left: (width - canvasW) / 2 + 'px'
                      } );

      self.stage.resize( scale );

    };

    $( window ).resize( handleResize );
    handleResize(); // initial size
  }

  return ResistanceInAWireView;

} )
;
