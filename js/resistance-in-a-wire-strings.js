/**
 * Copyright 2002-2013, University of Colorado
 * Author: Sam Reid (PhET Interactive Simulations)
 *
 * Load the strings only once and from a single location, because loading them from different relative paths
 * causes them to fall back to the root language sometimes for unknown reasons.
 *
 */
define( function( require ) {
  'use strict';

  var Strings = require( 'i18n!../nls/resistance-in-a-wire-strings' );
  return Strings;
} );