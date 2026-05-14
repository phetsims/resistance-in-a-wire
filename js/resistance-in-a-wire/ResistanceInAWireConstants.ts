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

const RESISTIVITY_RANGE = new RangeWithValue( 0.01, 1.00, 0.5 ); // in Ohm * cm
const LENGTH_RANGE = new RangeWithValue( 0.1, 20, 10 ); // in cm
const AREA_RANGE = new RangeWithValue( 0.01, 15, 7.5 ); // in cm^2

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

  /**
   * Returns a formatted resistance value for visual readouts and accessible descriptions.
   */
  getFormattedResistanceValue( value: number ): string {
    return Utils.toFixed( value, this.getResistanceDecimals( value ) );
  }
};

export default ResistanceInAWireConstants;
