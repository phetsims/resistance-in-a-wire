// Copyright 2026, University of Colorado Boulder

/**
 * Centralizes the accessible-description logic for Resistance in a Wire. The model owns the physical values, while
 * this describer owns the mappings from model and view values to stable Fluent keys and long-lived string Properties.
 * Instances are created for the lifetime of the screen and are not intended to be disposed.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Disposable from '../../../../axon/js/Disposable.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import type ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';
import type { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import type RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import { getFormattedAccessibleNumber } from '../../../../scenery-phet/js/NumberFormatting.js';
import { centimetersSquaredUnit } from '../../../../scenery-phet/js/units/centimetersSquaredUnit.js';
import { centimetersUnit } from '../../../../scenery-phet/js/units/centimetersUnit.js';
import { ohmCentimetersUnit } from '../../../../scenery-phet/js/units/ohmCentimetersUnit.js';
import { ohmsUnit } from '../../../../scenery-phet/js/units/ohmsUnit.js';
import ResistanceInAWireFluent from '../../ResistanceInAWireFluent.js';
import ResistanceInAWireModel from '../model/ResistanceInAWireModel.js';
import ResistanceInAWireConstants from '../ResistanceInAWireConstants.js';

export type FormulaScaleKey = 'resistance' | 'resistivity' | 'area' | 'length';
export type SliderLetterKey = 'rho' | 'length' | 'area';

// Keys used to describe the length of the wire.
const LENGTH_DESCRIPTION_KEYS = [
  'extremelyShort', 'veryShort', 'short', 'medium', 'long', 'veryLong', 'extremelyLong'
] as const;

// Keys used to describe the thickness of the wire.
const THICKNESS_DESCRIPTION_KEYS = [
  'extremelyThin', 'veryThin', 'thin', 'medium', 'thick', 'veryThick', 'extremelyThick'
] as const;

// Keys used to describe the amount of impurities in the wire.
const IMPURITIES_DESCRIPTION_KEYS = [
  'tiny', 'verySmall', 'small', 'medium', 'large', 'veryLarge', 'huge'
] as const;

// Keys used to describe the relative visual sizes of equation letters.
const RELATIVE_SIZE_DESCRIPTION_KEYS = [
  'muchMuchSmaller', 'muchSmaller', 'slightlySmaller', 'comparable',
  'slightlyLarger', 'muchLarger', 'muchMuchLarger'
] as const;

type LengthDescriptionKey = typeof LENGTH_DESCRIPTION_KEYS[ number ];
type ThicknessDescriptionKey = typeof THICKNESS_DESCRIPTION_KEYS[ number ];
type ImpuritiesDescriptionKey = typeof IMPURITIES_DESCRIPTION_KEYS[ number ];
type RelativeSizeKey = typeof RELATIVE_SIZE_DESCRIPTION_KEYS[ number ];

type SizeChangeKey = 'grows' | 'shrinks' | 'growsALot' | 'shrinksALot';

type DescriptionEntry<T extends string> = {
  descriptionKey: T;
  range: Range;
};

// Maps numeric ranges to Fluent description keys for accessible descriptions of continuous values.
type DescriptionMap<T extends string> = Record<string, DescriptionEntry<T>>;

export type FormulaScaleProperties = Record<FormulaScaleKey, TReadOnlyProperty<number>>;

const wireDescriptionPattern = ResistanceInAWireFluent.a11y.wire.wireDescriptionPattern;
const relativeSizeDescriptionPattern = ResistanceInAWireFluent.a11y.equation.relativeSizeDescription;
const rhoLAndAComparablePattern = ResistanceInAWireFluent.a11y.equation.rhoLAndAComparablePattern;
const lAndAComparablePattern = ResistanceInAWireFluent.a11y.equation.lAndAComparablePattern;
const noneComparablePattern = ResistanceInAWireFluent.a11y.equation.noneComparablePattern;
const summaryResistancePattern = ResistanceInAWireFluent.a11y.summary.resistancePattern;
const summaryResistivityPattern = ResistanceInAWireFluent.a11y.summary.resistivityPattern;
const summaryLengthPattern = ResistanceInAWireFluent.a11y.summary.lengthPattern;
const summaryAreaPattern = ResistanceInAWireFluent.a11y.summary.areaPattern;
const sizeChangeAlertPattern = ResistanceInAWireFluent.a11y.controls.sizeChangeAlertPattern;

/**
 * Generates a map from physical value to accessible description. Each described range has a length of
 * valueRange / descriptionArray.length.
 */
const generateDescriptionMap = <T extends string>(
  descriptionArray: readonly T[],
  valueRange: RangeWithValue
): DescriptionMap<T> => {
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

const LENGTH_TO_DESCRIPTION_MAP = generateDescriptionMap( LENGTH_DESCRIPTION_KEYS, ResistanceInAWireConstants.LENGTH_RANGE );
const AREA_TO_DESCRIPTION_MAP = generateDescriptionMap( THICKNESS_DESCRIPTION_KEYS, ResistanceInAWireConstants.AREA_RANGE );
const RESISTIVITY_TO_DESCRIPTION_MAP = generateDescriptionMap( IMPURITIES_DESCRIPTION_KEYS, ResistanceInAWireConstants.RESISTIVITY_RANGE );

// If resistance changes by more than this threshold, the accessible alert describes it as a large change.
const LARGE_RESISTANCE_DELTA = (
  ( ResistanceInAWireModel.getResistanceRange().max - ResistanceInAWireModel.getResistanceRange().min ) /
  RELATIVE_SIZE_DESCRIPTION_KEYS.length
) * 2;

/**
 * Returns the stable description key for the range that contains the provided value.
 */
const getValueDescriptionFromMap = <T extends string>( value: number, map: DescriptionMap<T> ): T => {

  const keys = Object.keys( map );
  for ( let i = 0; i < keys.length; i++ ) {
    const entry = map[ keys[ i ] ];

    if ( entry.range.contains( value ) ) {
      return entry.descriptionKey;
    }
  }
  throw new Error( `no description for value: ${value}` );
};

/**
 * Owns long-lived accessible description Properties for the screen. It translates model values into wire-description
 * keys, formats accessible value strings, and creates descriptions for formula-letter size relationships provided by
 * FormulaNode. Since it is created for the lifetime of the screen, returned Properties are marked as non-disposable.
 */
export default class ResistanceInAWireDescriber extends Disposable {

  // Model-derived Properties used by one or more public description Properties below.
  private readonly lengthDescriptionKeyProperty: ReadOnlyProperty<LengthDescriptionKey>;
  private readonly thicknessDescriptionKeyProperty: ReadOnlyProperty<ThicknessDescriptionKey>;
  private readonly impuritiesDescriptionKeyProperty: ReadOnlyProperty<ImpuritiesDescriptionKey>;
  private readonly resistivityAccessibleStringProperty: ReadOnlyProperty<string>;
  private readonly lengthAccessibleStringProperty: ReadOnlyProperty<string>;
  private readonly areaAccessibleStringProperty: ReadOnlyProperty<string>;
  private readonly resistanceAccessibleStringProperty: ReadOnlyProperty<string>;

  // Description for the wire display, owned by the Describer because it is shared for the lifetime of the screen.
  public readonly wireDescriptionStringProperty: ReadOnlyProperty<string>;

  // Dynamic screen summary item text.
  public readonly resistanceSummaryStringProperty: ReadOnlyProperty<string>;
  public readonly resistivitySummaryStringProperty: ReadOnlyProperty<string>;
  public readonly lengthSummaryStringProperty: ReadOnlyProperty<string>;
  public readonly areaSummaryStringProperty: ReadOnlyProperty<string>;

  public constructor( model: ResistanceInAWireModel ) {
    super( { isDisposable: false } );

    const fixedDecimalOptions = {
      numberFormatOptions: {
        decimalPlaces: ResistanceInAWireConstants.SLIDER_READOUT_DECIMALS,
        showTrailingZeros: false,
        showIntegersAsIntegers: true
      }
    };

    this.lengthDescriptionKeyProperty = new DerivedProperty( [ model.lengthProperty ], lengthValue =>
      getValueDescriptionFromMap<LengthDescriptionKey>( lengthValue, LENGTH_TO_DESCRIPTION_MAP )
    );

    this.thicknessDescriptionKeyProperty = new DerivedProperty( [ model.areaProperty ], areaValue =>
      getValueDescriptionFromMap<ThicknessDescriptionKey>( areaValue, AREA_TO_DESCRIPTION_MAP )
    );

    this.impuritiesDescriptionKeyProperty = new DerivedProperty( [ model.resistivityProperty ], resistivityValue =>
      getValueDescriptionFromMap<ImpuritiesDescriptionKey>( resistivityValue, RESISTIVITY_TO_DESCRIPTION_MAP )
    );

    this.resistivityAccessibleStringProperty = ohmCentimetersUnit.getAccessibleStringProperty(
      model.resistivityProperty,
      fixedDecimalOptions
    );
    this.lengthAccessibleStringProperty = centimetersUnit.getAccessibleStringProperty(
      model.lengthProperty,
      fixedDecimalOptions
    );
    this.areaAccessibleStringProperty = centimetersSquaredUnit.getAccessibleStringProperty(
      model.areaProperty,
      fixedDecimalOptions
    );
    this.resistanceAccessibleStringProperty = ResistanceInAWireDescriber.createAccessibleResistanceStringProperty(
      model.resistanceProperty
    );

    this.wireDescriptionStringProperty = this.createWireDescriptionProperty();
    this.resistanceSummaryStringProperty = ResistanceInAWireDescriber.resistanceSummaryStringProperty(
      this.resistanceAccessibleStringProperty
    );
    this.resistivitySummaryStringProperty = ResistanceInAWireDescriber.resistivitySummaryStringProperty(
      this.resistivityAccessibleStringProperty
    );
    this.lengthSummaryStringProperty = ResistanceInAWireDescriber.lengthSummaryStringProperty(
      this.lengthAccessibleStringProperty
    );
    this.areaSummaryStringProperty = ResistanceInAWireDescriber.areaSummaryStringProperty(
      this.areaAccessibleStringProperty
    );
  }

  /**
   * Creates the accessible description for the relative visual sizes of the formula letters.
   */
  public createFormulaRelativeSizeDescriptionProperty( scaleProperties: FormulaScaleProperties ): ReadOnlyProperty<string> {
    const resistanceScaleProperty = scaleProperties.resistance;
    const resistivityScaleProperty = scaleProperties.resistivity;
    const areaScaleProperty = scaleProperties.area;
    const lengthScaleProperty = scaleProperties.length;

    const rToRhoKeyProperty = new DerivedProperty(
      [ resistanceScaleProperty, resistivityScaleProperty ],
      ( resistanceScale, resistivityScale ) => ResistanceInAWireDescriber.getRelativeSizeKey( resistanceScale / resistivityScale )
    );

    const rToAKeyProperty = new DerivedProperty(
      [ resistanceScaleProperty, areaScaleProperty ],
      ( resistanceScale, areaScale ) => ResistanceInAWireDescriber.getRelativeSizeKey( resistanceScale / areaScale )
    );

    const rToLKeyProperty = new DerivedProperty(
      [ resistanceScaleProperty, lengthScaleProperty ],
      ( resistanceScale, lengthScale ) => ResistanceInAWireDescriber.getRelativeSizeKey( resistanceScale / lengthScale )
    );

    const rToRhoDescriptionProperty = relativeSizeDescriptionPattern.createProperty( {
      relativeSize: rToRhoKeyProperty
    } );
    const rToADescriptionProperty = relativeSizeDescriptionPattern.createProperty( {
      relativeSize: rToAKeyProperty
    } );
    const rToLDescriptionProperty = relativeSizeDescriptionPattern.createProperty( {
      relativeSize: rToLKeyProperty
    } );

    const rhoLAndAComparableDescriptionProperty = rhoLAndAComparablePattern.createProperty( {
      rToAll: rToRhoDescriptionProperty // any size description will work
    } );

    const lAndAComparableDescriptionProperty = lAndAComparablePattern.createProperty( {
      rToRho: rToRhoDescriptionProperty,
      rToLAndA: rToLDescriptionProperty // either length or area relative descriptions will work
    } );

    const noneComparableDescriptionProperty = noneComparablePattern.createProperty( {
      rToRho: rToRhoDescriptionProperty,
      rToL: rToLDescriptionProperty,
      rToA: rToADescriptionProperty
    } );

    // The relative-size description chooses from fully reactive FluentPattern Properties so both model and locale
    // changes are reflected in the PDOM.
    return new DerivedStringProperty(
      [
        resistanceScaleProperty,
        resistivityScaleProperty,
        areaScaleProperty,
        lengthScaleProperty,
        rhoLAndAComparableDescriptionProperty,
        lAndAComparableDescriptionProperty,
        noneComparableDescriptionProperty
      ],
      (
        resistanceScale,
        resistivityScale,
        areaScale,
        lengthScale,
        rhoLAndAComparableDescription,
        lAndAComparableDescription,
        noneComparableDescription
      ) => ResistanceInAWireDescriber.getRelativeSizeDescription(
        resistanceScale,
        resistivityScale,
        areaScale,
        lengthScale,
        rhoLAndAComparableDescription,
        lAndAComparableDescription,
        noneComparableDescription
      ),
      { isDisposable: false }
    );
  }

  /**
   * Returns a full alert for a slider variable's size change and the corresponding resistance change.
   */
  public getSliderChangeAlert(
    resistance: number,
    deltaResistance: number,
    deltaVariable: number,
    letterKey: SliderLetterKey
  ): string {
    const resistanceChangeKey = ResistanceInAWireDescriber.getSizeChangeKey( deltaResistance, true );
    const letterChangeKey = ResistanceInAWireDescriber.getSizeChangeKey( deltaVariable, false );

    return sizeChangeAlertPattern.format( {
      letter: letterKey,
      letterChange: letterChangeKey,
      rChange: resistanceChangeKey,
      resistance: ResistanceInAWireDescriber.getAccessibleResistanceString( resistance )
    } );
  }

  /**
   * Creates a reactive string Property for the resistance item in the screen summary.
   */
  public static resistanceSummaryStringProperty(
    resistanceAccessibleStringProperty: TReadOnlyProperty<string>
  ): ReadOnlyProperty<string> {
    const resistanceSummaryStringProperty = summaryResistancePattern.createProperty( {
      value: resistanceAccessibleStringProperty
    } );
    resistanceSummaryStringProperty.isDisposable = false;
    return resistanceSummaryStringProperty;
  }

  /**
   * Creates a reactive string Property for the resistivity item in the screen summary.
   */
  public static resistivitySummaryStringProperty(
    resistivityAccessibleStringProperty: TReadOnlyProperty<string>
  ): ReadOnlyProperty<string> {
    const resistivitySummaryStringProperty = summaryResistivityPattern.createProperty( {
      value: resistivityAccessibleStringProperty
    } );
    resistivitySummaryStringProperty.isDisposable = false;
    return resistivitySummaryStringProperty;
  }

  /**
   * Creates a reactive string Property for the length item in the screen summary.
   */
  public static lengthSummaryStringProperty(
    lengthAccessibleStringProperty: TReadOnlyProperty<string>
  ): ReadOnlyProperty<string> {
    const lengthSummaryStringProperty = summaryLengthPattern.createProperty( {
      value: lengthAccessibleStringProperty
    } );
    lengthSummaryStringProperty.isDisposable = false;
    return lengthSummaryStringProperty;
  }

  /**
   * Creates a reactive string Property for the area item in the screen summary.
   */
  public static areaSummaryStringProperty(
    areaAccessibleStringProperty: TReadOnlyProperty<string>
  ): ReadOnlyProperty<string> {
    const areaSummaryStringProperty = summaryAreaPattern.createProperty( {
      value: areaAccessibleStringProperty
    } );
    areaSummaryStringProperty.isDisposable = false;
    return areaSummaryStringProperty;
  }

  /**
   * Creates the accessible description for the wire from current physical values.
   */
  private createWireDescriptionProperty(): ReadOnlyProperty<string> {
    const wireDescriptionStringProperty = wireDescriptionPattern.createProperty( {
      length: this.lengthDescriptionKeyProperty,
      thickness: this.thicknessDescriptionKeyProperty,
      impurities: this.impuritiesDescriptionKeyProperty,
      resistance: this.resistanceAccessibleStringProperty
    } );
    wireDescriptionStringProperty.isDisposable = false;
    return wireDescriptionStringProperty;
  }

  /**
   * Creates a reactive accessible resistance string with dynamic decimal precision.
   */
  private static createAccessibleResistanceStringProperty(
    resistanceProperty: TReadOnlyProperty<number>
  ): ReadOnlyProperty<string> {
    assert && assert( ohmsUnit.accessiblePattern, 'ohmsUnit should have an accessible pattern' );

    const formattedResistanceValueProperty = new DerivedProperty( [ resistanceProperty ], resistance =>
      getFormattedAccessibleNumber( resistance, {
        decimalPlaces: ResistanceInAWireConstants.getResistanceDecimals( resistance ),
        showTrailingZeros: false,
        showIntegersAsIntegers: true
      } )
    );

    const resistanceStringProperty = ohmsUnit.accessiblePattern!.createProperty( {
      value: formattedResistanceValueProperty
    } );
    resistanceStringProperty.isDisposable = false;
    return resistanceStringProperty;
  }

  /**
   * Returns an accessible resistance string with dynamic decimal precision.
   */
  private static getAccessibleResistanceString( resistance: number ): string {
    return ohmsUnit.getAccessibleString( resistance, {
      decimalPlaces: ResistanceInAWireConstants.getResistanceDecimals( resistance ),
      showTrailingZeros: false,
      showIntegersAsIntegers: true
    } );
  }

  /**
   * Get a relative size key from a relative scale, used to describe letters relative to each other.
   */
  private static getRelativeSizeKey( relativeScale: number ): RelativeSizeKey {

    if ( relativeScale < 0 || relativeScale > Number.MAX_VALUE || Number.isNaN( relativeScale ) ) {
      throw new Error( `no description found for relativeScale: ${relativeScale}` );
    }

    // These threshold values were determined by visual inspection to match the accessible descriptions.
    if ( relativeScale <= 0.1 ) {
      return 'muchMuchSmaller';
    }
    else if ( relativeScale <= 0.4 ) {
      return 'muchSmaller';
    }
    else if ( relativeScale <= 0.7 ) {
      return 'slightlySmaller';
    }
    else if ( relativeScale <= 1.3 ) {
      return 'comparable';
    }
    else if ( relativeScale <= 2 ) {
      return 'slightlyLarger';
    }
    else if ( relativeScale <= 20 ) {
      return 'muchLarger';
    }
    else {
      return 'muchMuchLarger';
    }
  }

  /**
   * Returns the key that describes whether a formula letter grows or shrinks.
   */
  private static getSizeChangeKey( delta: number, describeLargeChanges: boolean ): SizeChangeKey {
    assert && assert( delta !== 0, 'trying to describe no change in size' );

    const useALot = describeLargeChanges && Math.abs( delta ) > LARGE_RESISTANCE_DELTA;

    return delta > 0 ? ( useALot ? 'growsALot' : 'grows' ) :
           ( useALot ? 'shrinksALot' : 'shrinks' );
  }

  /**
   * Get a description of the relative size of various letters. Size of each letter is described relative to
   * resistance R. When all or L and A letters are the same size, a simplified sentence is used to reduce verbosity.
   */
  private static getRelativeSizeDescription(
    resistanceScale: number,
    resistivityScale: number,
    areaScale: number,
    lengthScale: number,
    rhoLAndAComparableDescription: string,
    lAndAComparableDescription: string,
    noneComparableDescription: string
  ): string {
    const rToRho = resistanceScale / resistivityScale;
    const rToA = resistanceScale / areaScale;
    const rToL = resistanceScale / lengthScale;
    const lToA = lengthScale / areaScale;
    const lToRho = lengthScale / resistivityScale;

    const rToRhoKey = ResistanceInAWireDescriber.getRelativeSizeKey( rToRho );
    const rToAKey = ResistanceInAWireDescriber.getRelativeSizeKey( rToA );
    const rToLKey = ResistanceInAWireDescriber.getRelativeSizeKey( rToL );
    const lToAKey = ResistanceInAWireDescriber.getRelativeSizeKey( lToA );
    const lToRhoKey = ResistanceInAWireDescriber.getRelativeSizeKey( lToRho );

    // Even if right hand side variables are not comparable in size, if R is relatively larger or smaller than all
    // by the same amount, combine size description.
    const allRelativeSizesSame = rToRhoKey === rToAKey && rToRhoKey === rToLKey;

    if ( ( lToAKey === 'comparable' && lToRhoKey === 'comparable' ) || allRelativeSizesSame ) {
      return rhoLAndAComparableDescription;
    }
    else if ( lToAKey === 'comparable' ) {
      return lAndAComparableDescription;
    }
    else {
      return noneComparableDescription;
    }
  }
}
