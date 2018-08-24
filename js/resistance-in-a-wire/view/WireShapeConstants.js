// Copyright 2018, University of Colorado Boulder

/**
 * Collection of constants and functions that determine the visual shape of the Wire.
 * 
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var LinearFunction = require( 'DOT/LinearFunction' );
  var Range = require( 'DOT/Range' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );

  // constants
  var WIRE_VIEW_WIDTH_RANGE = new Range( 15, 500 ); // in screen coordinates
  var WIRE_VIEW_HEIGHT_RANGE = new Range( 3, 180 ); // in screen coordinates
  var WIRE_DIAMETER_MAX = Math.sqrt( ResistanceInAWireConstants.AREA_RANGE.max / Math.PI ) * 2;

  var WireShapeConstants = {

    // Multiplier that controls the width of the ellipses on the ends of the wire.
    PERSPECTIVE_FACTOR: 0.4,

    // Used to calculate the size of the wire in screen coordinates from the model values
    WIRE_DIAMETER_MAX: WIRE_DIAMETER_MAX,
    WIRE_VIEW_WIDTH_RANGE: WIRE_VIEW_WIDTH_RANGE, 
    WIRE_VIEW_HEIGHT_RANGE: WIRE_VIEW_HEIGHT_RANGE,

    // used when drawing dots in the wire
    DOT_RADIUS: 2,

    // Linear mapping transform
    lengthToWidth: new LinearFunction(
      ResistanceInAWireConstants.LENGTH_RANGE.min,
      ResistanceInAWireConstants.LENGTH_RANGE.max,
      WIRE_VIEW_WIDTH_RANGE.min,
      WIRE_VIEW_WIDTH_RANGE.max,
      true
    ),

    /**
     * Transform to map the area to the height of the wire.
     * @param {number} area
     * @returns {number} - the height in screen coordinates
     */
    areaToHeight: function( area ) {
      var radius_squared = area / Math.PI;
      var diameter = Math.sqrt( radius_squared ) * 2; // radius to diameter
      return WIRE_VIEW_HEIGHT_RANGE.max / WIRE_DIAMETER_MAX * diameter;
    }
  };

  resistanceInAWire.register( 'WireShapeConstants', WireShapeConstants );

  return WireShapeConstants;
} );