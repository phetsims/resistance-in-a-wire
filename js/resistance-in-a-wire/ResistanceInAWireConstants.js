// Copyright 2017, University of Colorado Boulder

/**
 * Constants used in multiple locations within the 'Resistance in a Wire' simulation.
 *
 * @author Martin Veillette (Berea College)
 */
define( function( require ) {
  'use strict';

  // modules
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RangeWithValue = require( 'DOT/RangeWithValue' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );

  var ResistanceInAWireConstants = {

    // colors
    BLUE_COLOR: '#0f0ffb',
    BLACK_COLOR: '#000',
    RED_COLOR: '#F22',
    WHITE_COLOR: '#FFF',

    // formula
    FONT_FAMILY: 'Times New Roman',

    // range for sliders with default values
    RESISTIVITY_RANGE: new RangeWithValue( 0.01, 1.00, 0.5 ), // in Ohm * cm
    LENGTH_RANGE: new RangeWithValue( 0.1, 20, 10 ), // in cm
    AREA_RANGE: new RangeWithValue( 0.01, 15, 7.5 ), // in cm^2

    // control panel
    SLIDER_WIDTH: 70,

    // slider unit
    THUMB_HEIGHT: 32,  // Empirically determined.
    SLIDER_HEIGHT: 230,
    SYMBOL_FONT: new PhetFont( { family: 'Times New Roman', size: 60 } ),
    NAME_FONT: new PhetFont( 16 ),
    READOUT_FONT: new PhetFont( 28 ),
    UNIT_FONT: new PhetFont( 28 ),

    // arrow node
    TAIL_LENGTH: 140,
    HEAD_HEIGHT: 45,
    HEAD_WIDTH: 30,
    TAIL_WIDTH: 10,

    // precision of values for view
    SLIDER_READOUT_DECIMALS: 2,
    getResistanceDecimals: function( resistance ) {
      return resistance >= 100 ? 0 : // Over 100, show no decimal points, like 102
             resistance >= 10 ? 1 : // between 10.0 and 99.9, show 2 decimal points
             resistance < 0.001 ? 4 : // when less than 0.001, show 4 decimals, see #125
             resistance < 1 ? 3 : // when less than 1, show 3 decimal places, see #125
             2; // Numbers less than 10 show 2 decimal points, like 8.35
    }

  };

  resistanceInAWire.register( 'ResistanceInAWireConstants', ResistanceInAWireConstants );

  return ResistanceInAWireConstants;
} );