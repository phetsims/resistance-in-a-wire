/**
 * Copyright 2002-2013, University of Colorado
 * HTML elements for the "Resistance In a Wire" module.
 * Author: Vasily Shakhov (Mlearner)
 */

define(
  [
    "i18n!../../nls/resistance-in-a-wire-strings",
    'tpl!../../html/reset.html'
  ],
  function ( i18n, resetButton ) {
    "use strict";

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