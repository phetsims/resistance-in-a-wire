/**
 * Copyright 2002-2013, University of Colorado
 * HTML elements for the "Resistance In a Wire" module.
 * Author: Vasily Shakhov (Mlearner)
 */

define( function ( require ) {
  'use strict';

  function ControlPanel( model ) {

    var i18n = require( 'resistance-in-a-wire-strings' );

    $("#resetAllButton" ).bind( 'click', function () {
      model.reset();
    } );

    $( document.body ).find( ".tab-name" ).html( i18n.simTitle );
  }

  return ControlPanel;
} );