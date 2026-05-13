// Copyright 2017-2026, University of Colorado Boulder

/**
 * Constants used in multiple locations within the 'Resistance in a Wire' simulation.
 *
 * @author Martin Veillette (Berea College)
 */

import Range from '../../../dot/js/Range.js';
import RangeWithValue from '../../../dot/js/RangeWithValue.js';
import Utils from '../../../dot/js/Utils.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import ResistanceInAWireFluent from '../ResistanceInAWireFluent.js';

type DescriptionEntry = {
  description: string;
  range: Range;
};

type DescriptionMap = Record<string, DescriptionEntry>;

const muchMuchSmallerThanString = ResistanceInAWireFluent.a11y.equation.sizes.muchMuchSmallerThanStringProperty.value;
const muchSmallerThanString = ResistanceInAWireFluent.a11y.equation.sizes.muchSmallerThanStringProperty.value;
const slightlySmallerThanString = ResistanceInAWireFluent.a11y.equation.sizes.slightlySmallerThanStringProperty.value;
const comparableToString = ResistanceInAWireFluent.a11y.equation.sizes.comparableToStringProperty.value;
const slightlyLargerThanString = ResistanceInAWireFluent.a11y.equation.sizes.slightlyLargerThanStringProperty.value;
const muchLargerThanString = ResistanceInAWireFluent.a11y.equation.sizes.muchLargerThanStringProperty.value;
const muchMuchLargerThanString = ResistanceInAWireFluent.a11y.equation.sizes.muchMuchLargerThanStringProperty.value;
const extremelyShortString = ResistanceInAWireFluent.a11y.wire.extremelyShortStringProperty.value;
const veryShortString = ResistanceInAWireFluent.a11y.wire.veryShortStringProperty.value;
const shortString = ResistanceInAWireFluent.a11y.wire.shortStringProperty.value;
const ofMediumLengthString = ResistanceInAWireFluent.a11y.wire.ofMediumLengthStringProperty.value;
const longString = ResistanceInAWireFluent.a11y.wire.longStringProperty.value;
const veryLongString = ResistanceInAWireFluent.a11y.wire.veryLongStringProperty.value;
const extremelyLongString = ResistanceInAWireFluent.a11y.wire.extremelyLongStringProperty.value;
const extremelyThinString = ResistanceInAWireFluent.a11y.wire.extremelyThinStringProperty.value;
const veryThinString = ResistanceInAWireFluent.a11y.wire.veryThinStringProperty.value;
const thinString = ResistanceInAWireFluent.a11y.wire.thinStringProperty.value;
const ofMediumThicknessString = ResistanceInAWireFluent.a11y.wire.ofMediumThicknessStringProperty.value;
const thickString = ResistanceInAWireFluent.a11y.wire.thickStringProperty.value;
const veryThickString = ResistanceInAWireFluent.a11y.wire.veryThickStringProperty.value;
const extremelyThickString = ResistanceInAWireFluent.a11y.wire.extremelyThickStringProperty.value;
const aTinyAmountOfImpuritiesString = ResistanceInAWireFluent.a11y.wire.aTinyAmountOfImpuritiesStringProperty.value;
const aVerySmallAmountOfImpuritiesString = ResistanceInAWireFluent.a11y.wire.aVerySmallAmountOfImpuritiesStringProperty.value;
const aSmallAmountOfImpuritiesString = ResistanceInAWireFluent.a11y.wire.aSmallAmountOfImpuritiesStringProperty.value;
const aMediumAmountOfImpuritiesString = ResistanceInAWireFluent.a11y.wire.aMediumAmountOfImpuritiesStringProperty.value;
const aLargeAmountOfImpuritiesString = ResistanceInAWireFluent.a11y.wire.aLargeAmountOfImpuritiesStringProperty.value;
const aVeryLargeAmountOfImpuritiesString = ResistanceInAWireFluent.a11y.wire.aVeryLargeAmountOfImpuritiesStringProperty.value;
const aHugeAmountOfImpuritiesString = ResistanceInAWireFluent.a11y.wire.aHugeAmountOfImpuritiesStringProperty.value;

const RESISTIVITY_RANGE = new RangeWithValue( 0.01, 1.00, 0.5 ); // in Ohm * cm
const LENGTH_RANGE = new RangeWithValue( 0.1, 20, 10 ); // in cm
const AREA_RANGE = new RangeWithValue( 0.01, 15, 7.5 ); // in cm^2

const LENGTH_DESCRIPTIONS = [ extremelyShortString, veryShortString, shortString, ofMediumLengthString, longString, veryLongString, extremelyLongString ];
const AREA_DESCRIPTIONS = [ extremelyThinString, veryThinString, thinString, ofMediumThicknessString, thickString, veryThickString, extremelyThickString ];
const RESISTIVITY_DESCRIPTIONS = [ aTinyAmountOfImpuritiesString, aVerySmallAmountOfImpuritiesString, aSmallAmountOfImpuritiesString, aMediumAmountOfImpuritiesString, aLargeAmountOfImpuritiesString, aVeryLargeAmountOfImpuritiesString, aHugeAmountOfImpuritiesString ];

const RELATIVE_SIZE_STRINGS = [ muchMuchSmallerThanString, muchSmallerThanString, slightlySmallerThanString, comparableToString, slightlyLargerThanString, muchLargerThanString, muchMuchLargerThanString ];

/**
 * Generates a map from physical value to accessible description. Each described range has a length of
 * valueRange / descriptionArray.length.
 */
const generateDescriptionMap = ( descriptionArray: string[], valueRange: RangeWithValue ): DescriptionMap => {
  const map: DescriptionMap = {};

  let minValue = valueRange.min;
  for ( let i = 0; i < descriptionArray.length; i++ ) {

    const nextMin = minValue + valueRange.getLength() / descriptionArray.length;

    // Correct for any precision issues in the final interval.
    const range = i === descriptionArray.length - 1 ?
                  new Range( minValue, valueRange.max ) :
                  new Range( minValue, nextMin );

    map[ i ] = {
      description: descriptionArray[ i ],
      range: range
    };

    minValue = nextMin;
  }

  return map;
};

const LENGTH_TO_DESCRIPTION_MAP = generateDescriptionMap( LENGTH_DESCRIPTIONS, LENGTH_RANGE );
const AREA_TO_DESCRIPTION_MAP = generateDescriptionMap( AREA_DESCRIPTIONS, AREA_RANGE );
const RESISTIVITY_TO_DESCRIPTION_MAP = generateDescriptionMap( RESISTIVITY_DESCRIPTIONS, RESISTIVITY_RANGE );

const ResistanceInAWireConstants = {

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
  getResistanceDecimals( resistance: number ): number {
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


  // pdom - used to map relative scale magnitudes of the letters to relative size description
  RELATIVE_SIZE_MAP: {
    muchMuchSmaller: {
      description: muchMuchSmallerThanString,
      range: new Range( 0, 0.1 )
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
   * Returns the description for the range that contains the provided value.
   */
  getValueDescriptionFromMap( value: number, map: DescriptionMap ): string {

    // Get described ranges of each value.
    const keys = Object.keys( map );
    for ( let i = 0; i < keys.length; i++ ) {
      const entry = map[ keys[ i ] ];

      if ( entry.range.contains( value ) ) {
        return entry.description;
      }
    }
    throw new Error( `no description for value: ${value}` );
  },

  /**
   * Returns a formatted resistance value for visual readouts and accessible descriptions.
   */
  getFormattedResistanceValue( value: number ): string {
    return Utils.toFixed( value, this.getResistanceDecimals( value ) );
  }
};

export default ResistanceInAWireConstants;
