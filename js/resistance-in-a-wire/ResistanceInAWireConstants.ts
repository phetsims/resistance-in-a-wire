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

type LengthDescriptionKey = 'extremelyShort' | 'veryShort' | 'short' | 'medium' | 'long' | 'veryLong' | 'extremelyLong';
type ThicknessDescriptionKey = 'extremelyThin' | 'veryThin' | 'thin' | 'medium' | 'thick' | 'veryThick' | 'extremelyThick';
type ImpuritiesDescriptionKey = 'tiny' | 'verySmall' | 'small' | 'medium' | 'large' | 'veryLarge' | 'huge';
type RelativeSizeKey = 'muchMuchSmaller' | 'muchSmaller' | 'slightlySmaller' | 'comparable' | 'slightlyLarger' | 'muchLarger' | 'muchMuchLarger';

type DescriptionEntry<T extends string> = {
  descriptionKey: T;
  range: Range;
};

type DescriptionMap<T extends string> = Record<string, DescriptionEntry<T>>;
type RelativeSizeMap = Record<RelativeSizeKey, DescriptionEntry<RelativeSizeKey>>;

const RESISTIVITY_RANGE = new RangeWithValue( 0.01, 1.00, 0.5 ); // in Ohm * cm
const LENGTH_RANGE = new RangeWithValue( 0.1, 20, 10 ); // in cm
const AREA_RANGE = new RangeWithValue( 0.01, 15, 7.5 ); // in cm^2

const LENGTH_DESCRIPTIONS: LengthDescriptionKey[] = [ 'extremelyShort', 'veryShort', 'short', 'medium', 'long', 'veryLong', 'extremelyLong' ];
const AREA_DESCRIPTIONS: ThicknessDescriptionKey[] = [ 'extremelyThin', 'veryThin', 'thin', 'medium', 'thick', 'veryThick', 'extremelyThick' ];
const RESISTIVITY_DESCRIPTIONS: ImpuritiesDescriptionKey[] = [ 'tiny', 'verySmall', 'small', 'medium', 'large', 'veryLarge', 'huge' ];

const RELATIVE_SIZE_KEYS: RelativeSizeKey[] = [ 'muchMuchSmaller', 'muchSmaller', 'slightlySmaller', 'comparable', 'slightlyLarger', 'muchLarger', 'muchMuchLarger' ];

/**
 * Generates a map from physical value to accessible description. Each described range has a length of
 * valueRange / descriptionArray.length.
 */
const generateDescriptionMap = <T extends string>( descriptionArray: T[], valueRange: RangeWithValue ): DescriptionMap<T> => {
  const map: DescriptionMap<T> = {};

  let minValue = valueRange.min;
  for ( let i = 0; i < descriptionArray.length; i++ ) {

    const nextMin = minValue + valueRange.getLength() / descriptionArray.length;

    // Correct for any precision issues in the final interval.
    const range = i === descriptionArray.length - 1 ?
                  new Range( minValue, valueRange.max ) :
                  new Range( minValue, nextMin );

    map[ i ] = {
      descriptionKey: descriptionArray[ i ],
      range: range
    };

    minValue = nextMin;
  }

  return map;
};

const LENGTH_TO_DESCRIPTION_MAP = generateDescriptionMap( LENGTH_DESCRIPTIONS, LENGTH_RANGE );
const AREA_TO_DESCRIPTION_MAP = generateDescriptionMap( AREA_DESCRIPTIONS, AREA_RANGE );
const RESISTIVITY_TO_DESCRIPTION_MAP = generateDescriptionMap( RESISTIVITY_DESCRIPTIONS, RESISTIVITY_RANGE );

const RELATIVE_SIZE_MAP: RelativeSizeMap = {
  muchMuchSmaller: {
    descriptionKey: 'muchMuchSmaller',
    range: new Range( 0, 0.1 )
  },
  muchSmaller: {
    descriptionKey: 'muchSmaller',
    range: new Range( 0.1, 0.4 )
  },
  slightlySmaller: {
    descriptionKey: 'slightlySmaller',
    range: new Range( 0.4, 0.7 )
  },
  comparable: {
    descriptionKey: 'comparable',
    range: new Range( 0.7, 1.3 )
  },
  slightlyLarger: {
    descriptionKey: 'slightlyLarger',
    range: new Range( 1.3, 2 )
  },
  muchLarger: {
    descriptionKey: 'muchLarger',
    range: new Range( 2, 20 )
  },
  muchMuchLarger: {
    descriptionKey: 'muchMuchLarger',
    range: new Range( 20, Number.MAX_VALUE )
  }
};

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

  // maps from physical value to stable description key
  LENGTH_TO_DESCRIPTION_MAP: LENGTH_TO_DESCRIPTION_MAP,
  AREA_TO_DESCRIPTION_MAP: AREA_TO_DESCRIPTION_MAP,
  RESISTIVITY_TO_DESCRIPTION_MAP: RESISTIVITY_TO_DESCRIPTION_MAP,

  RELATIVE_SIZE_KEYS: RELATIVE_SIZE_KEYS,


  // pdom - used to map relative scale magnitudes of the letters to relative size description
  RELATIVE_SIZE_MAP: RELATIVE_SIZE_MAP,

  /**
   * Returns the stable description key for the range that contains the provided value.
   */
  getValueDescriptionFromMap<T extends string>( value: number, map: DescriptionMap<T> ): T {

    // Get described ranges of each value.
    const keys = Object.keys( map );
    for ( let i = 0; i < keys.length; i++ ) {
      const entry = map[ keys[ i ] ];

      if ( entry.range.contains( value ) ) {
        return entry.descriptionKey;
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
