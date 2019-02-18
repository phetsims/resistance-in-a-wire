// Copyright 2017-2019, University of Colorado Boulder

/**
 * Constants used in multiple locations within the 'Resistance in a Wire' simulation.
 *
 * @author Martin Veillette (Berea College)
 */
define( function( require ) {
  'use strict';

  // modules
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Range = require( 'DOT/Range' );
  var RangeWithValue = require( 'DOT/RangeWithValue' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireA11yStrings = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireA11yStrings' );
  var Util = require( 'DOT/Util' );

  // a11y strings
  var muchMuchSmallerThanString = ResistanceInAWireA11yStrings.muchMuchSmallerThanString.value;
  var muchSmallerThanString = ResistanceInAWireA11yStrings.muchSmallerThanString.value;
  var slightlySmallerThanString = ResistanceInAWireA11yStrings.slightlySmallerThanString.value;
  var comparableToString = ResistanceInAWireA11yStrings.comparableToString.value;
  var slightlyLargerThanString = ResistanceInAWireA11yStrings.slightlyLargerThanString.value;
  var muchLargerThanString = ResistanceInAWireA11yStrings.muchLargerThanString.value;
  var muchMuchLargerThanString = ResistanceInAWireA11yStrings.muchMuchLargerThanString.value;
  var extremelyShortString = ResistanceInAWireA11yStrings.extremelyShortString.value;
  var veryShortString = ResistanceInAWireA11yStrings.veryShortString.value;
  var shortString = ResistanceInAWireA11yStrings.shortString.value;
  var ofMediumLengthString = ResistanceInAWireA11yStrings.ofMediumLengthString.value;
  var longString = ResistanceInAWireA11yStrings.longString.value;
  var veryLongString = ResistanceInAWireA11yStrings.veryLongString.value;
  var extremelyLongString = ResistanceInAWireA11yStrings.extremelyLongString.value;
  var extremelyThinString = ResistanceInAWireA11yStrings.extremelyThinString.value;
  var veryThinString = ResistanceInAWireA11yStrings.veryThinString.value;
  var thinString = ResistanceInAWireA11yStrings.thinString.value;
  var ofMediumThicknessString = ResistanceInAWireA11yStrings.ofMediumThicknessString.value;
  var thickString = ResistanceInAWireA11yStrings.thickString.value;
  var veryThickString = ResistanceInAWireA11yStrings.veryThickString.value;
  var extremelyThickString = ResistanceInAWireA11yStrings.extremelyThickString.value;
  var aTinyAmountOfImpuritiesString = ResistanceInAWireA11yStrings.aTinyAmountOfImpuritiesString.value;
  var aVerySmallAmountOfImpuritiesString = ResistanceInAWireA11yStrings.aVerySmallAmountOfImpuritiesString.value;
  var aSmallAmountOfImpuritiesString = ResistanceInAWireA11yStrings.aSmallAmountOfImpuritiesString.value;
  var aMediumAmountOfImpuritiesString = ResistanceInAWireA11yStrings.aMediumAmountOfImpuritiesString.value;
  var aLargeAmountOfImpuritiesString = ResistanceInAWireA11yStrings.aLargeAmountOfImpuritiesString.value;
  var aVeryLargeAmountOfImpuritiesString = ResistanceInAWireA11yStrings.aVeryLargeAmountOfImpuritiesString.value;
  var aHugeAmountOfImpuritiesString = ResistanceInAWireA11yStrings.aHugeAmountOfImpuritiesString.value;


  // constants
  var RESISTIVITY_RANGE = new RangeWithValue( 0.01, 1.00, 0.5 ); // in Ohm * cm
  var LENGTH_RANGE = new RangeWithValue( 0.1, 20, 10 ); // in cm
  var AREA_RANGE = new RangeWithValue( 0.01, 15, 7.5 ); // in cm^2

  var LENGTH_DESCRIPTIONS = [ extremelyShortString, veryShortString, shortString, ofMediumLengthString, longString, veryLongString, extremelyLongString ];
  var AREA_DESCRIPTIONS = [ extremelyThinString, veryThinString, thinString, ofMediumThicknessString, thickString, veryThickString, extremelyThickString ];
  var RESISTIVITY_DESCRIPTIONS = [ aTinyAmountOfImpuritiesString, aVerySmallAmountOfImpuritiesString, aSmallAmountOfImpuritiesString, aMediumAmountOfImpuritiesString, aLargeAmountOfImpuritiesString, aVeryLargeAmountOfImpuritiesString, aHugeAmountOfImpuritiesString ];

  var RELATIVE_SIZE_STRINGS = [ muchMuchSmallerThanString, muchSmallerThanString, slightlySmallerThanString, comparableToString, slightlyLargerThanString, muchLargerThanString, muchMuchLargerThanString ];

  /**
   * Generate a map from physical value to accessible descripton. Each described range has a length of 
   * valueRange / descriptionArray.length
   *
   * @param {[].string} descriptionArray
   * @param {RangeWithValue} valueRange
   *
   * @returns {[type]} [description]
   */
  var generateDescriptionMap = function( descriptionArray, valueRange ) {
    var map = {};

    var minValue = valueRange.min;
    for ( var i = 0; i < descriptionArray.length; i++ ) {

      var nextMin = minValue + valueRange.getLength() / descriptionArray.length;

      map[ i ] = {};
      map[ i ].description = descriptionArray[ i ];
      map[ i ].range = new Range( minValue, nextMin );

      // correct for any precision issues
      if ( i === descriptionArray.length - 1 ) {
        map[ descriptionArray.length - 1 ].range = new Range( minValue, valueRange.max );
      }

      minValue = nextMin;
    }

    return map;
  };

  var LENGTH_TO_DESCRIPTION_MAP = generateDescriptionMap( LENGTH_DESCRIPTIONS, LENGTH_RANGE );
  var AREA_TO_DESCRIPTION_MAP = generateDescriptionMap( AREA_DESCRIPTIONS, AREA_RANGE );
  var RESISTIVITY_TO_DESCRIPTION_MAP = generateDescriptionMap( RESISTIVITY_DESCRIPTIONS, RESISTIVITY_RANGE );

  var ResistanceInAWireConstants = {

    // colors
    BLUE_COLOR: '#0f0ffb',
    BLACK_COLOR: '#000',
    RED_COLOR: '#F22',
    WHITE_COLOR: '#FFF',

    // formula
    FONT_FAMILY: 'Times New Roman',

    // range for sliders with default values
    RESISTIVITY_RANGE: RESISTIVITY_RANGE, 
    LENGTH_RANGE: LENGTH_RANGE,
    AREA_RANGE: AREA_RANGE,

    // resistance range, based on formula R = ( resistivity * length ) / area
    RESISTANCE_RANGE: new Range(
      RESISTIVITY_RANGE.min * LENGTH_RANGE.min / AREA_RANGE.max,
      RESISTIVITY_RANGE.max * LENGTH_RANGE.max / AREA_RANGE.min
    ),

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
    },

    // maps from physical value to description
    LENGTH_TO_DESCRIPTION_MAP: LENGTH_TO_DESCRIPTION_MAP,
    AREA_TO_DESCRIPTION_MAP: AREA_TO_DESCRIPTION_MAP,
    RESISTIVITY_TO_DESCRIPTION_MAP: RESISTIVITY_TO_DESCRIPTION_MAP,

    RELATIVE_SIZE_STRINGS: RELATIVE_SIZE_STRINGS,


    // a11y - used to map relative scale magnitudes of the letters to relative size description
    RELATIVE_SIZE_MAP: {
      muchMuchSmaller: {
        description: muchMuchSmallerThanString,
        range: new Range( 0, 0.1)
      },
      muchSmaller: {
        description: muchSmallerThanString,
        range: new Range( 0.1, 0.4 )
      },
      slightlySmaller: {
        description: slightlySmallerThanString,
        range: new Range( 0.4, 0.7 )
      },
      comparable: {
        description: comparableToString,
        range: new Range( 0.7, 1.3 )
      },
      slightlyLarger: {
        description: slightlyLargerThanString,
        range: new Range( 1.3, 2 )
      },
      muchLarger: {
        description: muchLargerThanString,
        range: new Range( 2, 20 )
      },
      muchMuchLarger: {
        description: muchMuchLargerThanString, 
        range: new Range( 20, Number.MAX_VALUE )
      }
    },

    /**
     * Get a description from a value map. The map must have keys with values that look like
     * {
     *   range: {Range},
     *   description: {string}
     * }
     *
     * We iterate over the map, and if the value falls in the range, the description string is returned.
     *
     * "comparable to" or
     * "much much larger than"
     *
     * @param {number} value
     * @returns {string}
     */
    getValueDescriptionFromMap: function( value, map ) {

      // get described ranges of each value
      var keys = Object.keys( map );
      for ( var i = 0; i < keys.length; i++ ) {
        var entry = map[ keys[ i ] ];

        if ( entry.range.contains( value, map ) ) {
          return entry.description;
        }
      }
    },

    /**
     * Get a formatted value for resistance - depending on size of resistance, number of decimals will change. Used
     * for visual readout as well as for readable values in a11y.
     *
     * @param {number} value
     * @returns {string}
     */
    getFormattedResistanceValue: function( value ) {
      return Util.toFixed( value, this.getResistanceDecimals( value ) );
    }
  };

  resistanceInAWire.register( 'ResistanceInAWireConstants', ResistanceInAWireConstants );

  return ResistanceInAWireConstants;
} );