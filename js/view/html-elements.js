/**
 * Copyright 2002-2013, University of Colorado
 * HTML elements for the "Resistance In a Wire" module.
 * Author: Vasily Shakhov (Mlearner)
 */

define( function ( require ) {
  'use strict';

  var resetButton = require( "tpl!../../html/reset.html" );
  var i18n = require( "i18n!../../nls/resistance-in-a-wire-strings" );

  function ControlPanel( container, model ) {

    //reset button
    var reset = $( resetButton( {} ) );
    container.append( reset );
    reset.bind( 'click', function () {
      model.reset();
    } );
  }

  return ControlPanel;
} );