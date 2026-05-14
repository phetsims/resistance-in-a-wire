// Copyright 2026, University of Colorado Boulder

/**
 * Creates localized descriptions for Resistance in a Wire view components. The model owns the physical values, while
 * this describer maps those values and view scale Properties to Fluent-backed strings for PDOM content.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Disposable from '../../../../axon/js/Disposable.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import type ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';
import type { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import { getFormattedAccessibleNumber } from '../../../../scenery-phet/js/NumberFormatting.js';
import { centimetersSquaredUnit } from '../../../../scenery-phet/js/units/centimetersSquaredUnit.js';
import { centimetersUnit } from '../../../../scenery-phet/js/units/centimetersUnit.js';
import { ohmCentimetersUnit } from '../../../../scenery-phet/js/units/ohmCentimetersUnit.js';
import { ohmsUnit } from '../../../../scenery-phet/js/units/ohmsUnit.js';
import ResistanceInAWireFluent from '../../ResistanceInAWireFluent.js';
import ResistanceInAWireModel from '../model/ResistanceInAWireModel.js';
import ResistanceInAWireConstants, { type ImpuritiesDescriptionKey, type LengthDescriptionKey, type RelativeSizeKey, type ThicknessDescriptionKey } from '../ResistanceInAWireConstants.js';

export type FormulaScaleKey = 'resistance' | 'resistivity' | 'area' | 'length';
export type SliderLetterKey = 'rho' | 'length' | 'area';

export type FormulaScaleProperties = Record<FormulaScaleKey, TReadOnlyProperty<number>>;

export type ScreenSummaryItemStringProperties = {
  resistanceStringProperty: ReadOnlyProperty<string>;
  resistivityStringProperty: ReadOnlyProperty<string>;
  lengthStringProperty: ReadOnlyProperty<string>;
  areaStringProperty: ReadOnlyProperty<string>;
};

const wireDescriptionPattern = ResistanceInAWireFluent.a11y.wire.wireDescriptionPattern;
const relativeSizeDescription = ResistanceInAWireFluent.a11y.equation.relativeSizeDescription;
const rhoLAndAComparablePattern = ResistanceInAWireFluent.a11y.equation.rhoLAndAComparablePattern;
const lAndAComparablePattern = ResistanceInAWireFluent.a11y.equation.lAndAComparablePattern;
const noneComparablePattern = ResistanceInAWireFluent.a11y.equation.noneComparablePattern;
const summaryResistancePattern = ResistanceInAWireFluent.a11y.summary.resistancePattern;
const summaryResistivityPattern = ResistanceInAWireFluent.a11y.summary.resistivityPattern;
const summaryLengthPattern = ResistanceInAWireFluent.a11y.summary.lengthPattern;
const summaryAreaPattern = ResistanceInAWireFluent.a11y.summary.areaPattern;
const sizeChangeAlertPattern = ResistanceInAWireFluent.a11y.controls.sizeChangeAlertPattern;

// If resistance changes by more than this threshold, the accessible alert describes it as a large change.
const LARGE_RESISTANCE_DELTA = (
  ( ResistanceInAWireModel.getResistanceRange().max - ResistanceInAWireModel.getResistanceRange().min ) /
  ResistanceInAWireConstants.RELATIVE_SIZE_KEYS.length
) * 2;

type SizeChangeKey = 'grows' | 'shrinks' | 'growsALot' | 'shrinksALot';

/**
 * Owns long-lived Properties that generate accessible descriptions for the screen. Model-derived description Properties
 * are created once in the constructor, while formula scale descriptions are created when FormulaNode provides its
 * view-derived scale Properties.
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

  // Dynamic screen summary item text, grouped together so the summary node can assign PDOM content without creating
  // additional derived Properties.
  public readonly screenSummaryItemStringProperties: ScreenSummaryItemStringProperties;

  public constructor( model: ResistanceInAWireModel ) {
    super();

    const fixedDecimalOptions = {
      numberFormatOptions: {
        decimalPlaces: ResistanceInAWireConstants.SLIDER_READOUT_DECIMALS,
        showTrailingZeros: false,
        showIntegersAsIntegers: true
      }
    };

    this.lengthDescriptionKeyProperty = new DerivedProperty( [ model.lengthProperty ], lengthValue =>
      ResistanceInAWireConstants.getValueDescriptionFromMap<LengthDescriptionKey>( lengthValue, ResistanceInAWireConstants.LENGTH_TO_DESCRIPTION_MAP )
    );

    this.thicknessDescriptionKeyProperty = new DerivedProperty( [ model.areaProperty ], areaValue =>
      ResistanceInAWireConstants.getValueDescriptionFromMap<ThicknessDescriptionKey>( areaValue, ResistanceInAWireConstants.AREA_TO_DESCRIPTION_MAP )
    );

    this.impuritiesDescriptionKeyProperty = new DerivedProperty( [ model.resistivityProperty ], resistivityValue =>
      ResistanceInAWireConstants.getValueDescriptionFromMap<ImpuritiesDescriptionKey>( resistivityValue, ResistanceInAWireConstants.RESISTIVITY_TO_DESCRIPTION_MAP )
    );

    this.resistivityAccessibleStringProperty = ohmCentimetersUnit.getAccessibleStringProperty( model.resistivityProperty, fixedDecimalOptions );
    this.lengthAccessibleStringProperty = centimetersUnit.getAccessibleStringProperty( model.lengthProperty, fixedDecimalOptions );
    this.areaAccessibleStringProperty = centimetersSquaredUnit.getAccessibleStringProperty( model.areaProperty, fixedDecimalOptions );
    this.resistanceAccessibleStringProperty = ResistanceInAWireDescriber.createAccessibleResistanceStringProperty( model.resistanceProperty );

    this.wireDescriptionStringProperty = this.createWireDescriptionProperty();
    this.screenSummaryItemStringProperties = this.createScreenSummaryItemStringProperties();

    this.addDisposable(
      this.wireDescriptionStringProperty,
      this.screenSummaryItemStringProperties.resistanceStringProperty,
      this.screenSummaryItemStringProperties.resistivityStringProperty,
      this.screenSummaryItemStringProperties.lengthStringProperty,
      this.screenSummaryItemStringProperties.areaStringProperty,
      this.lengthDescriptionKeyProperty,
      this.thicknessDescriptionKeyProperty,
      this.impuritiesDescriptionKeyProperty,
      this.resistivityAccessibleStringProperty,
      this.lengthAccessibleStringProperty,
      this.areaAccessibleStringProperty,
      this.resistanceAccessibleStringProperty
    );
  }

  /**
   * Creates a reactive accessible resistance string with dynamic decimal precision.
   */
  private static createAccessibleResistanceStringProperty( resistanceProperty: TReadOnlyProperty<number> ): ReadOnlyProperty<string> {
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

    resistanceStringProperty.addDisposable( formattedResistanceValueProperty );

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
   * Creates the accessible description for the wire from current physical values.
   */
  private createWireDescriptionProperty(): ReadOnlyProperty<string> {
    return wireDescriptionPattern.createProperty( {
      length: this.lengthDescriptionKeyProperty,
      thickness: this.thicknessDescriptionKeyProperty,
      impurities: this.impuritiesDescriptionKeyProperty,
      resistance: this.resistanceAccessibleStringProperty
    } );
  }

  /**
   * Creates the accessible description for the relative visual sizes of the formula letters.
   */
  public createFormulaRelativeSizeDescriptionProperty( scaleProperties: FormulaScaleProperties ): ReadOnlyProperty<string> {
    const resistanceScaleProperty = scaleProperties.resistance;
    const resistivityScaleProperty = scaleProperties.resistivity;
    const areaScaleProperty = scaleProperties.area;
    const lengthScaleProperty = scaleProperties.length;

    const rToRhoKeyProperty = new DerivedProperty( [ resistanceScaleProperty, resistivityScaleProperty ],
      ( resistanceScale, resistivityScale ) => ResistanceInAWireDescriber.getRelativeSizeKey( resistanceScale / resistivityScale ) );

    const rToAKeyProperty = new DerivedProperty( [ resistanceScaleProperty, areaScaleProperty ],
      ( resistanceScale, areaScale ) => ResistanceInAWireDescriber.getRelativeSizeKey( resistanceScale / areaScale ) );

    const rToLKeyProperty = new DerivedProperty( [ resistanceScaleProperty, lengthScaleProperty ],
      ( resistanceScale, lengthScale ) => ResistanceInAWireDescriber.getRelativeSizeKey( resistanceScale / lengthScale ) );

    const rToRhoDescriptionProperty = relativeSizeDescription.createProperty( { relativeSize: rToRhoKeyProperty } );
    const rToADescriptionProperty = relativeSizeDescription.createProperty( { relativeSize: rToAKeyProperty } );
    const rToLDescriptionProperty = relativeSizeDescription.createProperty( { relativeSize: rToLKeyProperty } );

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
    const relativeSizeDescriptionProperty = new DerivedStringProperty( [
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
      ) );

    relativeSizeDescriptionProperty.addDisposable(
      noneComparableDescriptionProperty,
      lAndAComparableDescriptionProperty,
      rhoLAndAComparableDescriptionProperty,
      rToLDescriptionProperty,
      rToADescriptionProperty,
      rToRhoDescriptionProperty,
      rToRhoKeyProperty,
      rToAKeyProperty,
      rToLKeyProperty
    );

    return relativeSizeDescriptionProperty;
  }

  /**
   * Creates the reactive string Properties for the dynamic values listed in the screen summary.
   */
  private createScreenSummaryItemStringProperties(): ScreenSummaryItemStringProperties {
    const resistivityStringProperty = summaryResistivityPattern.createProperty( {
      value: this.resistivityAccessibleStringProperty
    } );
    const lengthStringProperty = summaryLengthPattern.createProperty( {
      value: this.lengthAccessibleStringProperty
    } );
    const areaStringProperty = summaryAreaPattern.createProperty( {
      value: this.areaAccessibleStringProperty
    } );
    const resistanceStringProperty = summaryResistancePattern.createProperty( {
      value: this.resistanceAccessibleStringProperty
    } );

    return {
      resistanceStringProperty: resistanceStringProperty,
      resistivityStringProperty: resistivityStringProperty,
      lengthStringProperty: lengthStringProperty,
      areaStringProperty: areaStringProperty
    };
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
   * Get a relative size key from a relative scale, used to describe letters relative to each other.
   */
  private static getRelativeSizeKey( relativeScale: number ): RelativeSizeKey {

    // Get described ranges of each relative scale.
    const keys = Object.keys( ResistanceInAWireConstants.RELATIVE_SIZE_MAP ) as
      ( keyof typeof ResistanceInAWireConstants.RELATIVE_SIZE_MAP )[];
    for ( let i = 0; i < keys.length; i++ ) {
      const relativeEntry = ResistanceInAWireConstants.RELATIVE_SIZE_MAP[ keys[ i ] ];

      if ( relativeEntry.range.contains( relativeScale ) ) {
        return relativeEntry.descriptionKey;
      }
    }
    throw new Error( `no description found for relativeScale: ${relativeScale}` );
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

    const comparableRange = ResistanceInAWireConstants.RELATIVE_SIZE_MAP.comparable.range;

    // Even if right hand side variables are not comparable in size, if R is relatively larger or smaller than all
    // by the same amount, combine size description.
    const relativeSizeKeys = Object.keys( ResistanceInAWireConstants.RELATIVE_SIZE_MAP ) as
      ( keyof typeof ResistanceInAWireConstants.RELATIVE_SIZE_MAP )[];
    let allRelativeSizesSame = false;
    for ( let i = 0; i < relativeSizeKeys.length; i++ ) {
      const key = relativeSizeKeys[ i ];
      const sizeRange = ResistanceInAWireConstants.RELATIVE_SIZE_MAP[ key ].range;
      const containsRToRho = sizeRange.contains( rToRho );
      const containsRToA = sizeRange.contains( rToA );
      const containsRToL = sizeRange.contains( rToL );

      if ( containsRToRho && containsRToA && containsRToL ) {
        allRelativeSizesSame = true;
        break;
      }
    }

    if ( ( comparableRange.contains( lToA ) && comparableRange.contains( lToRho ) ) || allRelativeSizesSame ) {
      return rhoLAndAComparableDescription;
    }
    else if ( comparableRange.contains( lToA ) ) {
      return lAndAComparableDescription;
    }
    else {
      return noneComparableDescription;
    }
  }
}
