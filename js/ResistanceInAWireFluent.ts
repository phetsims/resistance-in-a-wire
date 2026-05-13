// Copyright 2026, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from resistance-in-a-wire-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import { TReadOnlyProperty } from '../../axon/js/TReadOnlyProperty.js';
import FluentLibrary from '../../chipper/js/browser-and-node/FluentLibrary.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
import type {FluentVariable} from '../../chipper/js/browser/FluentPattern.js';
import FluentPattern from '../../chipper/js/browser/FluentPattern.js';
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
addToMapIfDefined( 'a11y_summary_resistancePattern', 'a11y.summary.resistancePatternStringProperty' );
addToMapIfDefined( 'a11y_summary_resistivityPattern', 'a11y.summary.resistivityPatternStringProperty' );
addToMapIfDefined( 'a11y_summary_lengthPattern', 'a11y.summary.lengthPatternStringProperty' );
addToMapIfDefined( 'a11y_summary_areaPattern', 'a11y.summary.areaPatternStringProperty' );
addToMapIfDefined( 'a11y_summary_interactionHint', 'a11y.summary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_equation_resistanceEquation', 'a11y.equation.resistanceEquationStringProperty' );
addToMapIfDefined( 'a11y_equation_resistanceEquationDescription', 'a11y.equation.resistanceEquationDescriptionStringProperty' );
addToMapIfDefined( 'a11y_equation_rhoLAndAComparablePattern', 'a11y.equation.rhoLAndAComparablePatternStringProperty' );
addToMapIfDefined( 'a11y_equation_lAndAComparablePattern', 'a11y.equation.lAndAComparablePatternStringProperty' );
addToMapIfDefined( 'a11y_equation_noneComparablePattern', 'a11y.equation.noneComparablePatternStringProperty' );
addToMapIfDefined( 'a11y_equation_relativeSizeDescription', 'a11y.equation.relativeSizeDescriptionStringProperty' );
addToMapIfDefined( 'a11y_equation_sizeChange', 'a11y.equation.sizeChangeStringProperty' );
addToMapIfDefined( 'a11y_wire_wireDescriptionPattern', 'a11y.wire.wireDescriptionPatternStringProperty' );
addToMapIfDefined( 'a11y_wire_resistivityUnitsPattern', 'a11y.wire.resistivityUnitsPatternStringProperty' );
addToMapIfDefined( 'a11y_wire_lengthClause', 'a11y.wire.lengthClauseStringProperty' );
addToMapIfDefined( 'a11y_wire_thicknessClause', 'a11y.wire.thicknessClauseStringProperty' );
addToMapIfDefined( 'a11y_wire_impuritiesClause', 'a11y.wire.impuritiesClauseStringProperty' );
addToMapIfDefined( 'a11y_controls_lengthUnitsPattern', 'a11y.controls.lengthUnitsPatternStringProperty' );
addToMapIfDefined( 'a11y_controls_areaUnitsPattern', 'a11y.controls.areaUnitsPatternStringProperty' );
addToMapIfDefined( 'a11y_controls_resistivitySliderLabel', 'a11y.controls.resistivitySliderLabelStringProperty' );
addToMapIfDefined( 'a11y_controls_lengthSliderLabel', 'a11y.controls.lengthSliderLabelStringProperty' );
addToMapIfDefined( 'a11y_controls_areaSliderLabel', 'a11y.controls.areaSliderLabelStringProperty' );
addToMapIfDefined( 'a11y_controls_sliderControls', 'a11y.controls.sliderControlsStringProperty' );
addToMapIfDefined( 'a11y_controls_slidersDescription', 'a11y.controls.slidersDescriptionStringProperty' );
addToMapIfDefined( 'a11y_controls_sizeChangeAlertPattern', 'a11y.controls.sizeChangeAlertPatternStringProperty' );
addToMapIfDefined( 'a11y_controls_letterName', 'a11y.controls.letterNameStringProperty' );

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
      resistancePattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_summary_resistancePattern', _.get( ResistanceInAWireStrings, 'a11y.summary.resistancePatternStringProperty' ), [{"name":"value"}] ),
      resistivityPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_summary_resistivityPattern', _.get( ResistanceInAWireStrings, 'a11y.summary.resistivityPatternStringProperty' ), [{"name":"value"}] ),
      lengthPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_summary_lengthPattern', _.get( ResistanceInAWireStrings, 'a11y.summary.lengthPatternStringProperty' ), [{"name":"value"}] ),
      areaPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_summary_areaPattern', _.get( ResistanceInAWireStrings, 'a11y.summary.areaPatternStringProperty' ), [{"name":"value"}] ),
      interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_summary_interactionHint', _.get( ResistanceInAWireStrings, 'a11y.summary.interactionHintStringProperty' ) )
    },
    equation: {
      resistanceEquationStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_equation_resistanceEquation', _.get( ResistanceInAWireStrings, 'a11y.equation.resistanceEquationStringProperty' ) ),
      resistanceEquationDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_equation_resistanceEquationDescription', _.get( ResistanceInAWireStrings, 'a11y.equation.resistanceEquationDescriptionStringProperty' ) ),
      rhoLAndAComparablePattern: new FluentPattern<{ rToAll: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_equation_rhoLAndAComparablePattern', _.get( ResistanceInAWireStrings, 'a11y.equation.rhoLAndAComparablePatternStringProperty' ), [{"name":"rToAll"}] ),
      lAndAComparablePattern: new FluentPattern<{ rToLAndA: FluentVariable, rToRho: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_equation_lAndAComparablePattern', _.get( ResistanceInAWireStrings, 'a11y.equation.lAndAComparablePatternStringProperty' ), [{"name":"rToLAndA"},{"name":"rToRho"}] ),
      noneComparablePattern: new FluentPattern<{ rToA: FluentVariable, rToL: FluentVariable, rToRho: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_equation_noneComparablePattern', _.get( ResistanceInAWireStrings, 'a11y.equation.noneComparablePatternStringProperty' ), [{"name":"rToA"},{"name":"rToL"},{"name":"rToRho"}] ),
      relativeSizeDescription: new FluentPattern<{ relativeSize: 'muchMuchSmaller' | 'muchSmaller' | 'slightlySmaller' | 'comparable' | 'slightlyLarger' | 'muchLarger' | 'muchMuchLarger' | TReadOnlyProperty<'muchMuchSmaller' | 'muchSmaller' | 'slightlySmaller' | 'comparable' | 'slightlyLarger' | 'muchLarger' | 'muchMuchLarger'> }>( fluentSupport.bundleProperty, 'a11y_equation_relativeSizeDescription', _.get( ResistanceInAWireStrings, 'a11y.equation.relativeSizeDescriptionStringProperty' ), [{"name":"relativeSize","variants":["muchMuchSmaller","muchSmaller","slightlySmaller","comparable","slightlyLarger","muchLarger","muchMuchLarger"]}] ),
      sizeChange: new FluentPattern<{ sizeChange: 'grows' | 'shrinks' | 'growsALot' | 'shrinksALot' | TReadOnlyProperty<'grows' | 'shrinks' | 'growsALot' | 'shrinksALot'> }>( fluentSupport.bundleProperty, 'a11y_equation_sizeChange', _.get( ResistanceInAWireStrings, 'a11y.equation.sizeChangeStringProperty' ), [{"name":"sizeChange","variants":["grows","shrinks","growsALot","shrinksALot"]}] )
    },
    wire: {
      wireDescriptionPattern: new FluentPattern<{ impurities: 'tiny' | 'verySmall' | 'small' | 'medium' | 'large' | 'veryLarge' | 'huge' | TReadOnlyProperty<'tiny' | 'verySmall' | 'small' | 'medium' | 'large' | 'veryLarge' | 'huge'>, length: 'extremelyShort' | 'veryShort' | 'short' | 'medium' | 'long' | 'veryLong' | 'extremelyLong' | TReadOnlyProperty<'extremelyShort' | 'veryShort' | 'short' | 'medium' | 'long' | 'veryLong' | 'extremelyLong'>, resistance: FluentVariable, thickness: 'extremelyThin' | 'veryThin' | 'thin' | 'medium' | 'thick' | 'veryThick' | 'extremelyThick' | TReadOnlyProperty<'extremelyThin' | 'veryThin' | 'thin' | 'medium' | 'thick' | 'veryThick' | 'extremelyThick'> }>( fluentSupport.bundleProperty, 'a11y_wire_wireDescriptionPattern', _.get( ResistanceInAWireStrings, 'a11y.wire.wireDescriptionPatternStringProperty' ), [{"name":"impurities","variants":["tiny","verySmall","small","medium","large","veryLarge","huge"]},{"name":"length","variants":["extremelyShort","veryShort","short","medium","long","veryLong","extremelyLong"]},{"name":"resistance"},{"name":"thickness","variants":["extremelyThin","veryThin","thin","medium","thick","veryThick","extremelyThick"]}] ),
      resistivityUnitsPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_wire_resistivityUnitsPattern', _.get( ResistanceInAWireStrings, 'a11y.wire.resistivityUnitsPatternStringProperty' ), [{"name":"value"}] ),
      lengthClause: new FluentPattern<{ length: 'extremelyShort' | 'veryShort' | 'short' | 'medium' | 'long' | 'veryLong' | 'extremelyLong' | TReadOnlyProperty<'extremelyShort' | 'veryShort' | 'short' | 'medium' | 'long' | 'veryLong' | 'extremelyLong'> }>( fluentSupport.bundleProperty, 'a11y_wire_lengthClause', _.get( ResistanceInAWireStrings, 'a11y.wire.lengthClauseStringProperty' ), [{"name":"length","variants":["extremelyShort","veryShort","short","medium","long","veryLong","extremelyLong"]}] ),
      thicknessClause: new FluentPattern<{ thickness: 'extremelyThin' | 'veryThin' | 'thin' | 'medium' | 'thick' | 'veryThick' | 'extremelyThick' | TReadOnlyProperty<'extremelyThin' | 'veryThin' | 'thin' | 'medium' | 'thick' | 'veryThick' | 'extremelyThick'> }>( fluentSupport.bundleProperty, 'a11y_wire_thicknessClause', _.get( ResistanceInAWireStrings, 'a11y.wire.thicknessClauseStringProperty' ), [{"name":"thickness","variants":["extremelyThin","veryThin","thin","medium","thick","veryThick","extremelyThick"]}] ),
      impuritiesClause: new FluentPattern<{ impurities: 'tiny' | 'verySmall' | 'small' | 'medium' | 'large' | 'veryLarge' | 'huge' | TReadOnlyProperty<'tiny' | 'verySmall' | 'small' | 'medium' | 'large' | 'veryLarge' | 'huge'> }>( fluentSupport.bundleProperty, 'a11y_wire_impuritiesClause', _.get( ResistanceInAWireStrings, 'a11y.wire.impuritiesClauseStringProperty' ), [{"name":"impurities","variants":["tiny","verySmall","small","medium","large","veryLarge","huge"]}] )
    },
    controls: {
      lengthUnitsPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_lengthUnitsPattern', _.get( ResistanceInAWireStrings, 'a11y.controls.lengthUnitsPatternStringProperty' ), [{"name":"value"}] ),
      areaUnitsPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_areaUnitsPattern', _.get( ResistanceInAWireStrings, 'a11y.controls.areaUnitsPatternStringProperty' ), [{"name":"value"}] ),
      resistivitySliderLabelStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_resistivitySliderLabel', _.get( ResistanceInAWireStrings, 'a11y.controls.resistivitySliderLabelStringProperty' ) ),
      lengthSliderLabelStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_lengthSliderLabel', _.get( ResistanceInAWireStrings, 'a11y.controls.lengthSliderLabelStringProperty' ) ),
      areaSliderLabelStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_areaSliderLabel', _.get( ResistanceInAWireStrings, 'a11y.controls.areaSliderLabelStringProperty' ) ),
      sliderControlsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_sliderControls', _.get( ResistanceInAWireStrings, 'a11y.controls.sliderControlsStringProperty' ) ),
      slidersDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controls_slidersDescription', _.get( ResistanceInAWireStrings, 'a11y.controls.slidersDescriptionStringProperty' ) ),
      sizeChangeAlertPattern: new FluentPattern<{ letter: FluentVariable, letterChange: FluentVariable, rChange: FluentVariable, resistance: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controls_sizeChangeAlertPattern', _.get( ResistanceInAWireStrings, 'a11y.controls.sizeChangeAlertPatternStringProperty' ), [{"name":"letter"},{"name":"letterChange"},{"name":"rChange"},{"name":"resistance"}] ),
      letterName: new FluentPattern<{ letter: 'rho' | 'length' | 'area' | TReadOnlyProperty<'rho' | 'length' | 'area'> }>( fluentSupport.bundleProperty, 'a11y_controls_letterName', _.get( ResistanceInAWireStrings, 'a11y.controls.letterNameStringProperty' ), [{"name":"letter","variants":["rho","length","area"]}] )
    }
  }
};

export default ResistanceInAWireFluent;

resistanceInAWire.register('ResistanceInAWireFluent', ResistanceInAWireFluent);
