// Copyright 2026, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from resistance-in-a-wire-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import FluentLibrary from '../../chipper/js/browser-and-node/FluentLibrary.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
import resistanceInAWire from './resistanceInAWire.js';
import ResistanceInAWireStrings from './ResistanceInAWireStrings.js';

// This map is used to create the fluent file and link to all StringProperties.
// Accessing StringProperties is also critical for including them in the built sim.
// However, if strings are unused in Fluent system too, they will be fully excluded from
// the build. So we need to only add actually used strings.
const fluentKeyToStringPropertyMap = new Map();

const addToMapIfDefined = ( key: string, path: string ) => {
  const sp = _.get( ResistanceInAWireStrings, path );
  if ( sp ) {
    fluentKeyToStringPropertyMap.set( key, sp );
  }
};

addToMapIfDefined( 'resistance_in_a_wire_title', 'resistance-in-a-wire.titleStringProperty' );
addToMapIfDefined( 'area', 'areaStringProperty' );
addToMapIfDefined( 'areaSymbol', 'areaSymbolStringProperty' );
addToMapIfDefined( 'cm', 'cmStringProperty' );
addToMapIfDefined( 'length', 'lengthStringProperty' );
addToMapIfDefined( 'lengthSymbol', 'lengthSymbolStringProperty' );
addToMapIfDefined( 'ohm', 'ohmStringProperty' );
addToMapIfDefined( 'resistance', 'resistanceStringProperty' );
addToMapIfDefined( 'resistanceSymbol', 'resistanceSymbolStringProperty' );
addToMapIfDefined( 'resistivity', 'resistivityStringProperty' );
addToMapIfDefined( 'a11y_summary_sim', 'a11y.summary.simStringProperty' );
addToMapIfDefined( 'a11y_summary_currently', 'a11y.summary.currentlyStringProperty' );
addToMapIfDefined( 'a11y_summary_interactionHint', 'a11y.summary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_equation_resistanceEquation', 'a11y.equation.resistanceEquationStringProperty' );
addToMapIfDefined( 'a11y_equation_resistanceEquationDescription', 'a11y.equation.resistanceEquationDescriptionStringProperty' );
addToMapIfDefined( 'a11y_equation_sizes_muchMuchSmallerThan', 'a11y.equation.sizes.muchMuchSmallerThanStringProperty' );
addToMapIfDefined( 'a11y_equation_sizes_muchSmallerThan', 'a11y.equation.sizes.muchSmallerThanStringProperty' );
addToMapIfDefined( 'a11y_equation_sizes_slightlySmallerThan', 'a11y.equation.sizes.slightlySmallerThanStringProperty' );
addToMapIfDefined( 'a11y_equation_sizes_comparableTo', 'a11y.equation.sizes.comparableToStringProperty' );
addToMapIfDefined( 'a11y_equation_sizes_slightlyLargerThan', 'a11y.equation.sizes.slightlyLargerThanStringProperty' );
addToMapIfDefined( 'a11y_equation_sizes_muchLargerThan', 'a11y.equation.sizes.muchLargerThanStringProperty' );
addToMapIfDefined( 'a11y_equation_sizes_muchMuchLargerThan', 'a11y.equation.sizes.muchMuchLargerThanStringProperty' );
addToMapIfDefined( 'a11y_equation_alerts_grows', 'a11y.equation.alerts.growsStringProperty' );
addToMapIfDefined( 'a11y_equation_alerts_shrinks', 'a11y.equation.alerts.shrinksStringProperty' );
addToMapIfDefined( 'a11y_equation_alerts_growsALot', 'a11y.equation.alerts.growsALotStringProperty' );
addToMapIfDefined( 'a11y_equation_alerts_shrinksALot', 'a11y.equation.alerts.shrinksALotStringProperty' );
addToMapIfDefined( 'a11y_wire_extremelyShort', 'a11y.wire.extremelyShortStringProperty' );
addToMapIfDefined( 'a11y_wire_veryShort', 'a11y.wire.veryShortStringProperty' );
addToMapIfDefined( 'a11y_wire_short', 'a11y.wire.shortStringProperty' );
addToMapIfDefined( 'a11y_wire_ofMediumLength', 'a11y.wire.ofMediumLengthStringProperty' );
addToMapIfDefined( 'a11y_wire_long', 'a11y.wire.longStringProperty' );
addToMapIfDefined( 'a11y_wire_veryLong', 'a11y.wire.veryLongStringProperty' );
addToMapIfDefined( 'a11y_wire_extremelyLong', 'a11y.wire.extremelyLongStringProperty' );
addToMapIfDefined( 'a11y_wire_extremelyThin', 'a11y.wire.extremelyThinStringProperty' );
addToMapIfDefined( 'a11y_wire_veryThin', 'a11y.wire.veryThinStringProperty' );
addToMapIfDefined( 'a11y_wire_thin', 'a11y.wire.thinStringProperty' );
addToMapIfDefined( 'a11y_wire_ofMediumThickness', 'a11y.wire.ofMediumThicknessStringProperty' );
addToMapIfDefined( 'a11y_wire_thick', 'a11y.wire.thickStringProperty' );
addToMapIfDefined( 'a11y_wire_veryThick', 'a11y.wire.veryThickStringProperty' );
addToMapIfDefined( 'a11y_wire_extremelyThick', 'a11y.wire.extremelyThickStringProperty' );
addToMapIfDefined( 'a11y_wire_aTinyAmountOfImpurities', 'a11y.wire.aTinyAmountOfImpuritiesStringProperty' );
addToMapIfDefined( 'a11y_wire_aVerySmallAmountOfImpurities', 'a11y.wire.aVerySmallAmountOfImpuritiesStringProperty' );
addToMapIfDefined( 'a11y_wire_aSmallAmountOfImpurities', 'a11y.wire.aSmallAmountOfImpuritiesStringProperty' );
addToMapIfDefined( 'a11y_wire_aMediumAmountOfImpurities', 'a11y.wire.aMediumAmountOfImpuritiesStringProperty' );
addToMapIfDefined( 'a11y_wire_aLargeAmountOfImpurities', 'a11y.wire.aLargeAmountOfImpuritiesStringProperty' );
addToMapIfDefined( 'a11y_wire_aVeryLargeAmountOfImpurities', 'a11y.wire.aVeryLargeAmountOfImpuritiesStringProperty' );
addToMapIfDefined( 'a11y_wire_aHugeAmountOfImpurities', 'a11y.wire.aHugeAmountOfImpuritiesStringProperty' );
addToMapIfDefined( 'a11y_controls_resistivitySliderLabel', 'a11y.controls.resistivitySliderLabelStringProperty' );
addToMapIfDefined( 'a11y_controls_lengthSliderLabel', 'a11y.controls.lengthSliderLabelStringProperty' );
addToMapIfDefined( 'a11y_controls_areaSliderLabel', 'a11y.controls.areaSliderLabelStringProperty' );
addToMapIfDefined( 'a11y_controls_sliderControls', 'a11y.controls.sliderControlsStringProperty' );
addToMapIfDefined( 'a11y_controls_slidersDescription', 'a11y.controls.slidersDescriptionStringProperty' );
addToMapIfDefined( 'a11y_controls_letterRho', 'a11y.controls.letterRhoStringProperty' );
addToMapIfDefined( 'a11y_controls_letterL', 'a11y.controls.letterLStringProperty' );
addToMapIfDefined( 'a11y_controls_letterA', 'a11y.controls.letterAStringProperty' );

// A function that creates contents for a new Fluent file, which will be needed if any string changes.
const createFluentFile = (): string => {
  let ftl = '';
  for (const [key, stringProperty] of fluentKeyToStringPropertyMap.entries()) {
    ftl += `${key} = ${FluentLibrary.formatMultilineForFtl( stringProperty.value )}\n`;
  }
  return ftl;
};

const fluentSupport = new FluentContainer( createFluentFile, Array.from(fluentKeyToStringPropertyMap.values()) );

const ResistanceInAWireFluent = {
  "resistance-in-a-wire": {
    titleStringProperty: _.get( ResistanceInAWireStrings, 'resistance-in-a-wire.titleStringProperty' )
  },
  areaStringProperty: _.get( ResistanceInAWireStrings, 'areaStringProperty' ),
  areaSymbolStringProperty: _.get( ResistanceInAWireStrings, 'areaSymbolStringProperty' ),
  cmStringProperty: _.get( ResistanceInAWireStrings, 'cmStringProperty' ),
  lengthStringProperty: _.get( ResistanceInAWireStrings, 'lengthStringProperty' ),
  lengthSymbolStringProperty: _.get( ResistanceInAWireStrings, 'lengthSymbolStringProperty' ),
  ohmStringProperty: _.get( ResistanceInAWireStrings, 'ohmStringProperty' ),
  pattern: {
    "0label": {
      "1value": {
        "2unitsStringProperty": _.get( ResistanceInAWireStrings, 'pattern.0label.1value.2unitsStringProperty' )
      }
    },
    "0resistanceUnits": {
      "1lengthUnitsStringProperty": _.get( ResistanceInAWireStrings, 'pattern.0resistanceUnits.1lengthUnitsStringProperty' )
    }
  },
  resistanceStringProperty: _.get( ResistanceInAWireStrings, 'resistanceStringProperty' ),
  resistanceSymbolStringProperty: _.get( ResistanceInAWireStrings, 'resistanceSymbolStringProperty' ),
  resistivityStringProperty: _.get( ResistanceInAWireStrings, 'resistivityStringProperty' ),
  a11y: {
    summary: {
      simStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_sim', _.get( ResistanceInAWireStrings, 'a11y.summary.simStringProperty' ) ),
      currentlyStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_currently', _.get( ResistanceInAWireStrings, 'a11y.summary.currentlyStringProperty' ) ),
      resistancePatternStringProperty: _.get( ResistanceInAWireStrings, 'a11y.summary.resistancePatternStringProperty' ),
      resistivityPatternStringProperty: _.get( ResistanceInAWireStrings, 'a11y.summary.resistivityPatternStringProperty' ),
      lengthPatternStringProperty: _.get( ResistanceInAWireStrings, 'a11y.summary.lengthPatternStringProperty' ),
      areaPatternStringProperty: _.get( ResistanceInAWireStrings, 'a11y.summary.areaPatternStringProperty' ),
      interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_interactionHint', _.get( ResistanceInAWireStrings, 'a11y.summary.interactionHintStringProperty' ) )
    },
    equation: {
      resistanceEquationStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_equation_resistanceEquation', _.get( ResistanceInAWireStrings, 'a11y.equation.resistanceEquationStringProperty' ) ),
      resistanceEquationDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_equation_resistanceEquationDescription', _.get( ResistanceInAWireStrings, 'a11y.equation.resistanceEquationDescriptionStringProperty' ) ),
      rhoLAndAComparablePatternStringProperty: _.get( ResistanceInAWireStrings, 'a11y.equation.rhoLAndAComparablePatternStringProperty' ),
      lAndAComparablePatternStringProperty: _.get( ResistanceInAWireStrings, 'a11y.equation.lAndAComparablePatternStringProperty' ),
      noneComparablePatternStringProperty: _.get( ResistanceInAWireStrings, 'a11y.equation.noneComparablePatternStringProperty' ),
      sizes: {
        muchMuchSmallerThanStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_equation_sizes_muchMuchSmallerThan', _.get( ResistanceInAWireStrings, 'a11y.equation.sizes.muchMuchSmallerThanStringProperty' ) ),
        muchSmallerThanStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_equation_sizes_muchSmallerThan', _.get( ResistanceInAWireStrings, 'a11y.equation.sizes.muchSmallerThanStringProperty' ) ),
        slightlySmallerThanStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_equation_sizes_slightlySmallerThan', _.get( ResistanceInAWireStrings, 'a11y.equation.sizes.slightlySmallerThanStringProperty' ) ),
        comparableToStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_equation_sizes_comparableTo', _.get( ResistanceInAWireStrings, 'a11y.equation.sizes.comparableToStringProperty' ) ),
        slightlyLargerThanStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_equation_sizes_slightlyLargerThan', _.get( ResistanceInAWireStrings, 'a11y.equation.sizes.slightlyLargerThanStringProperty' ) ),
        muchLargerThanStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_equation_sizes_muchLargerThan', _.get( ResistanceInAWireStrings, 'a11y.equation.sizes.muchLargerThanStringProperty' ) ),
        muchMuchLargerThanStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_equation_sizes_muchMuchLargerThan', _.get( ResistanceInAWireStrings, 'a11y.equation.sizes.muchMuchLargerThanStringProperty' ) )
      },
      alerts: {
        growsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_equation_alerts_grows', _.get( ResistanceInAWireStrings, 'a11y.equation.alerts.growsStringProperty' ) ),
        shrinksStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_equation_alerts_shrinks', _.get( ResistanceInAWireStrings, 'a11y.equation.alerts.shrinksStringProperty' ) ),
        growsALotStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_equation_alerts_growsALot', _.get( ResistanceInAWireStrings, 'a11y.equation.alerts.growsALotStringProperty' ) ),
        shrinksALotStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_equation_alerts_shrinksALot', _.get( ResistanceInAWireStrings, 'a11y.equation.alerts.shrinksALotStringProperty' ) )
      }
    },
    wire: {
      wireDescriptionPatternStringProperty: _.get( ResistanceInAWireStrings, 'a11y.wire.wireDescriptionPatternStringProperty' ),
      resistivityUnitsPatternStringProperty: _.get( ResistanceInAWireStrings, 'a11y.wire.resistivityUnitsPatternStringProperty' ),
      extremelyShortStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_wire_extremelyShort', _.get( ResistanceInAWireStrings, 'a11y.wire.extremelyShortStringProperty' ) ),
      veryShortStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_wire_veryShort', _.get( ResistanceInAWireStrings, 'a11y.wire.veryShortStringProperty' ) ),
      shortStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_wire_short', _.get( ResistanceInAWireStrings, 'a11y.wire.shortStringProperty' ) ),
      ofMediumLengthStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_wire_ofMediumLength', _.get( ResistanceInAWireStrings, 'a11y.wire.ofMediumLengthStringProperty' ) ),
      longStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_wire_long', _.get( ResistanceInAWireStrings, 'a11y.wire.longStringProperty' ) ),
      veryLongStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_wire_veryLong', _.get( ResistanceInAWireStrings, 'a11y.wire.veryLongStringProperty' ) ),
      extremelyLongStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_wire_extremelyLong', _.get( ResistanceInAWireStrings, 'a11y.wire.extremelyLongStringProperty' ) ),
      extremelyThinStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_wire_extremelyThin', _.get( ResistanceInAWireStrings, 'a11y.wire.extremelyThinStringProperty' ) ),
      veryThinStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_wire_veryThin', _.get( ResistanceInAWireStrings, 'a11y.wire.veryThinStringProperty' ) ),
      thinStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_wire_thin', _.get( ResistanceInAWireStrings, 'a11y.wire.thinStringProperty' ) ),
      ofMediumThicknessStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_wire_ofMediumThickness', _.get( ResistanceInAWireStrings, 'a11y.wire.ofMediumThicknessStringProperty' ) ),
      thickStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_wire_thick', _.get( ResistanceInAWireStrings, 'a11y.wire.thickStringProperty' ) ),
      veryThickStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_wire_veryThick', _.get( ResistanceInAWireStrings, 'a11y.wire.veryThickStringProperty' ) ),
      extremelyThickStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_wire_extremelyThick', _.get( ResistanceInAWireStrings, 'a11y.wire.extremelyThickStringProperty' ) ),
      aTinyAmountOfImpuritiesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_wire_aTinyAmountOfImpurities', _.get( ResistanceInAWireStrings, 'a11y.wire.aTinyAmountOfImpuritiesStringProperty' ) ),
      aVerySmallAmountOfImpuritiesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_wire_aVerySmallAmountOfImpurities', _.get( ResistanceInAWireStrings, 'a11y.wire.aVerySmallAmountOfImpuritiesStringProperty' ) ),
      aSmallAmountOfImpuritiesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_wire_aSmallAmountOfImpurities', _.get( ResistanceInAWireStrings, 'a11y.wire.aSmallAmountOfImpuritiesStringProperty' ) ),
      aMediumAmountOfImpuritiesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_wire_aMediumAmountOfImpurities', _.get( ResistanceInAWireStrings, 'a11y.wire.aMediumAmountOfImpuritiesStringProperty' ) ),
      aLargeAmountOfImpuritiesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_wire_aLargeAmountOfImpurities', _.get( ResistanceInAWireStrings, 'a11y.wire.aLargeAmountOfImpuritiesStringProperty' ) ),
      aVeryLargeAmountOfImpuritiesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_wire_aVeryLargeAmountOfImpurities', _.get( ResistanceInAWireStrings, 'a11y.wire.aVeryLargeAmountOfImpuritiesStringProperty' ) ),
      aHugeAmountOfImpuritiesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_wire_aHugeAmountOfImpurities', _.get( ResistanceInAWireStrings, 'a11y.wire.aHugeAmountOfImpuritiesStringProperty' ) )
    },
    controls: {
      lengthUnitsPatternStringProperty: _.get( ResistanceInAWireStrings, 'a11y.controls.lengthUnitsPatternStringProperty' ),
      areaUnitsPatternStringProperty: _.get( ResistanceInAWireStrings, 'a11y.controls.areaUnitsPatternStringProperty' ),
      resistivitySliderLabelStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_resistivitySliderLabel', _.get( ResistanceInAWireStrings, 'a11y.controls.resistivitySliderLabelStringProperty' ) ),
      lengthSliderLabelStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_lengthSliderLabel', _.get( ResistanceInAWireStrings, 'a11y.controls.lengthSliderLabelStringProperty' ) ),
      areaSliderLabelStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_areaSliderLabel', _.get( ResistanceInAWireStrings, 'a11y.controls.areaSliderLabelStringProperty' ) ),
      sliderControlsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_sliderControls', _.get( ResistanceInAWireStrings, 'a11y.controls.sliderControlsStringProperty' ) ),
      slidersDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_slidersDescription', _.get( ResistanceInAWireStrings, 'a11y.controls.slidersDescriptionStringProperty' ) ),
      sizeChangeAlertPatternStringProperty: _.get( ResistanceInAWireStrings, 'a11y.controls.sizeChangeAlertPatternStringProperty' ),
      letterRhoStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_letterRho', _.get( ResistanceInAWireStrings, 'a11y.controls.letterRhoStringProperty' ) ),
      letterLStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_letterL', _.get( ResistanceInAWireStrings, 'a11y.controls.letterLStringProperty' ) ),
      letterAStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_letterA', _.get( ResistanceInAWireStrings, 'a11y.controls.letterAStringProperty' ) )
    }
  }
};

export default ResistanceInAWireFluent;

resistanceInAWire.register('ResistanceInAWireFluent', ResistanceInAWireFluent);
