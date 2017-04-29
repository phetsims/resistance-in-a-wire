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
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  var ResistanceInAWireConstants = {

    // colors
    BLUE_COLOR: '#0f0ffb',
    BLACK_COLOR: '#000',
    RED_COLOR: '#F00',
    WHITE_COLOR: '#FFF',

    // formula
    FONT_FAMILY: 'Times New Roman',

    // range for sliders with default values
    RESISTIVITY_RANGE: new RangeWithValue( 0.01, 1.00, 0.5 ), // in Ohm * cm
    LENGTH_RANGE: new RangeWithValue( 0.1, 20, 10 ), // in cm
    AREA_RANGE: new RangeWithValue( 0.01, 15, 7.5 ), // in cm^2

    // control panel
    SLIDERS_HORIZONTAL_SEPARATION: 115,
    SLIDER_UNIT_VERTICAL_OFFSET: 78, // vertical offset measured from top of panel

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
    TAIL_WIDTH: 10

  };

  resistanceInAWire.register( 'ResistanceInAWireConstants', ResistanceInAWireConstants );

  return ResistanceInAWireConstants;
} );