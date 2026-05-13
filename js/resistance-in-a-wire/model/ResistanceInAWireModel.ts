// Copyright 2013-2026, University of Colorado Boulder

/**
 * Model which includes resistivity, length, area and resistance.
 *
 * @author Vasily Shakhov (Mlearner)
 * @author John Blanco (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import type { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import TModel from '../../../../joist/js/TModel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import ResistanceInAWireConstants from '../ResistanceInAWireConstants.js';

export default class ResistanceInAWireModel implements TModel {

  // Resistivity of the wire, in Ohm-centimeters.
  public readonly resistivityProperty: NumberProperty;

  // Length of the wire, in centimeters.
  public readonly lengthProperty: NumberProperty;

  // Cross-sectional area of the wire, in square centimeters.
  public readonly areaProperty: NumberProperty;

  // Resistance of the wire, derived from resistivity, length, and area, in Ohms.
  public readonly resistanceProperty: TReadOnlyProperty<number>;

  public constructor( tandem: Tandem ) {

    this.resistivityProperty = new NumberProperty( ResistanceInAWireConstants.RESISTIVITY_RANGE.defaultValue, {
      tandem: tandem.createTandem( 'resistivityProperty' ),
      units: '\u03A9\u00b7cm', // Ohm-centimeters
      range: ResistanceInAWireConstants.RESISTIVITY_RANGE
    } );

    this.lengthProperty = new NumberProperty( ResistanceInAWireConstants.LENGTH_RANGE.defaultValue, {
      tandem: tandem.createTandem( 'lengthProperty' ),
      units: 'cm',
      range: ResistanceInAWireConstants.LENGTH_RANGE
    } );

    this.areaProperty = new NumberProperty( ResistanceInAWireConstants.AREA_RANGE.defaultValue, {
      tandem: tandem.createTandem( 'areaProperty' ),
      units: 'cm^2',
      range: ResistanceInAWireConstants.AREA_RANGE
    } );

    this.resistanceProperty = new DerivedProperty( [ this.resistivityProperty, this.lengthProperty, this.areaProperty ],
      ( resistivity, length, area ) => resistivity * length / area, {
        tandem: tandem.createTandem( 'resistanceProperty' ),
        units: '\u03A9', // ohms
        phetioValueType: NumberIO
      }
    );
  }


  /**
   * Resets the independent properties of the model.
   */
  public reset(): void {
    this.resistivityProperty.reset();
    this.lengthProperty.reset();
    this.areaProperty.reset();
  }

  /**
   * Returns the total range of resistance values supported by the model's independent properties.
   */
  public static getResistanceRange(): Range {
    return ResistanceInAWireConstants.RESISTANCE_RANGE;
  }
}
