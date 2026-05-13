// Copyright 2018-2026, University of Colorado Boulder

/**
 * Collection of constants and functions that determine the visual shape of the Wire.
 *
 * @author Jesse Greenberg
 */

import LinearFunction from '../../../../dot/js/LinearFunction.js';
import Range from '../../../../dot/js/Range.js';
import ResistanceInAWireConstants from '../ResistanceInAWireConstants.js';

export default class WireShapeConstants {

  private constructor() {
    // Not intended for instantiation.
  }

  // Multiplier that controls the width of the ellipses on the ends of the wire.
  public static readonly PERSPECTIVE_FACTOR = 0.4;

  // View width range for the wire, in screen coordinates.
  public static readonly WIRE_VIEW_WIDTH_RANGE = new Range( 15, 500 );

  // View height range for the wire, in screen coordinates.
  public static readonly WIRE_VIEW_HEIGHT_RANGE = new Range( 3, 180 );

  // Used to calculate the size of the wire in screen coordinates from the model values.
  public static readonly WIRE_DIAMETER_MAX = Math.sqrt( ResistanceInAWireConstants.AREA_RANGE.max / Math.PI ) * 2;

  // Used when drawing dots in the wire.
  public static readonly DOT_RADIUS = 2;

  // Linear mapping transform.
  public static readonly lengthToWidth = new LinearFunction(
    ResistanceInAWireConstants.LENGTH_RANGE.min,
    ResistanceInAWireConstants.LENGTH_RANGE.max,
    WireShapeConstants.WIRE_VIEW_WIDTH_RANGE.min,
    WireShapeConstants.WIRE_VIEW_WIDTH_RANGE.max,
    true
  );

  /**
   * Transform to map the area to the height of the wire.
   */
  public static areaToHeight( area: number ): number {
    const radiusSquared = area / Math.PI;
    const diameter = Math.sqrt( radiusSquared ) * 2; // radius to diameter
    return WireShapeConstants.WIRE_VIEW_HEIGHT_RANGE.max / WireShapeConstants.WIRE_DIAMETER_MAX * diameter;
  }
}
