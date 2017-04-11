// Copyright 2015-2016, University of Colorado Boulder

/**
 * Constants used in multiple locations within the 'Resistance in a Wire' simulation.
 *
 * @author Martin Veillette (Berea College)
 */
define( function( require ) {
  'use strict';

  // modules
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var RangeWithValue = require( 'DOT/RangeWithValue' );

  var ResistanceInAWireConstants = {

    // constants
    KNOB_WIDTH: 32,  // Empirically determined.

    // colors
    BLUE_COLOR: '#0f0ffb',
    BLACK_COLOR: '#000',

    // range for sliders with default values
    RESISTIVITY_RANGE: new RangeWithValue( 0.01, 1.00, 0.5 ), // in Ohm * cm
    LENGTH_RANGE: new RangeWithValue( 0.1, 20, 10 ), // in cm
    AREA_RANGE: new RangeWithValue( 0.01, 15, 7.5 ) // in cm^2
  };

  resistanceInAWire.register( 'ResistanceInAWireConstants', ResistanceInAWireConstants );

  return ResistanceInAWireConstants;
} );