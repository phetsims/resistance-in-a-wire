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
addToMapIfDefined( 'a11y_resistanceInAWireScreen_screenSummary_playArea', 'a11y.resistanceInAWireScreen.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_resistanceInAWireScreen_screenSummary_currentDetails_currently', 'a11y.resistanceInAWireScreen.screenSummary.currentDetails.currentlyStringProperty' );
addToMapIfDefined( 'a11y_resistanceInAWireScreen_screenSummary_currentDetails_resistancePattern', 'a11y.resistanceInAWireScreen.screenSummary.currentDetails.resistancePatternStringProperty' );
addToMapIfDefined( 'a11y_resistanceInAWireScreen_screenSummary_currentDetails_resistivityPattern', 'a11y.resistanceInAWireScreen.screenSummary.currentDetails.resistivityPatternStringProperty' );
addToMapIfDefined( 'a11y_resistanceInAWireScreen_screenSummary_currentDetails_lengthPattern', 'a11y.resistanceInAWireScreen.screenSummary.currentDetails.lengthPatternStringProperty' );
addToMapIfDefined( 'a11y_resistanceInAWireScreen_screenSummary_currentDetails_areaPattern', 'a11y.resistanceInAWireScreen.screenSummary.currentDetails.areaPatternStringProperty' );
addToMapIfDefined( 'a11y_resistanceInAWireScreen_screenSummary_interactionHint', 'a11y.resistanceInAWireScreen.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_formulaNode_accessibleHeading', 'a11y.formulaNode.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_formulaNode_accessibleHelpText', 'a11y.formulaNode.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_formulaNode_lettersNode_descriptionContentPattern_rhoLAndAComparable', 'a11y.formulaNode.lettersNode.descriptionContentPattern.rhoLAndAComparableStringProperty' );
addToMapIfDefined( 'a11y_formulaNode_lettersNode_descriptionContentPattern_lAndAComparable', 'a11y.formulaNode.lettersNode.descriptionContentPattern.lAndAComparableStringProperty' );
addToMapIfDefined( 'a11y_formulaNode_lettersNode_descriptionContentPattern_noneComparable', 'a11y.formulaNode.lettersNode.descriptionContentPattern.noneComparableStringProperty' );
addToMapIfDefined( 'a11y_formulaNode_relativeSizeDescription', 'a11y.formulaNode.relativeSizeDescriptionStringProperty' );
addToMapIfDefined( 'a11y_wireNode_accessibleHeading', 'a11y.wireNode.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_wireNode_descriptionContentPattern', 'a11y.wireNode.descriptionContentPatternStringProperty' );
addToMapIfDefined( 'a11y_wireNode_lengthClause', 'a11y.wireNode.lengthClauseStringProperty' );
addToMapIfDefined( 'a11y_wireNode_thicknessClause', 'a11y.wireNode.thicknessClauseStringProperty' );
addToMapIfDefined( 'a11y_wireNode_impuritiesClause', 'a11y.wireNode.impuritiesClauseStringProperty' );
addToMapIfDefined( 'a11y_controlPanel_accessibleHeading', 'a11y.controlPanel.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_controlPanel_accessibleHelpText', 'a11y.controlPanel.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_controlPanel_resistivitySlider_labelContent', 'a11y.controlPanel.resistivitySlider.labelContentStringProperty' );
addToMapIfDefined( 'a11y_controlPanel_lengthSlider_labelContent', 'a11y.controlPanel.lengthSlider.labelContentStringProperty' );
addToMapIfDefined( 'a11y_controlPanel_areaSlider_labelContent', 'a11y.controlPanel.areaSlider.labelContentStringProperty' );
addToMapIfDefined( 'a11y_controlPanel_sliderChange_accessibleContextResponsePattern', 'a11y.controlPanel.sliderChange.accessibleContextResponsePatternStringProperty' );
addToMapIfDefined( 'a11y_controlPanel_sliderChange_changedLetterClause', 'a11y.controlPanel.sliderChange.changedLetterClauseStringProperty' );
addToMapIfDefined( 'a11y_controlPanel_sliderChange_resistanceLetterClause', 'a11y.controlPanel.sliderChange.resistanceLetterClauseStringProperty' );
addToMapIfDefined( 'a11y_controlPanel_sliderChange_letterName', 'a11y.controlPanel.sliderChange.letterNameStringProperty' );
addToMapIfDefined( 'a11y_controlPanel_sliderChange_letterSizeChange', 'a11y.controlPanel.sliderChange.letterSizeChangeStringProperty' );
addToMapIfDefined( 'a11y_controlPanel_sliderChange_resistanceSizeChange', 'a11y.controlPanel.sliderChange.resistanceSizeChangeStringProperty' );

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
    resistanceInAWireScreen: {
      screenSummary: {
        playAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_resistanceInAWireScreen_screenSummary_playArea', _.get( ResistanceInAWireStrings, 'a11y.resistanceInAWireScreen.screenSummary.playAreaStringProperty' ) ),
        currentDetails: {
          currentlyStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_resistanceInAWireScreen_screenSummary_currentDetails_currently', _.get( ResistanceInAWireStrings, 'a11y.resistanceInAWireScreen.screenSummary.currentDetails.currentlyStringProperty' ) ),
          resistancePattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_resistanceInAWireScreen_screenSummary_currentDetails_resistancePattern', _.get( ResistanceInAWireStrings, 'a11y.resistanceInAWireScreen.screenSummary.currentDetails.resistancePatternStringProperty' ), [{"name":"value"}] ),
          resistivityPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_resistanceInAWireScreen_screenSummary_currentDetails_resistivityPattern', _.get( ResistanceInAWireStrings, 'a11y.resistanceInAWireScreen.screenSummary.currentDetails.resistivityPatternStringProperty' ), [{"name":"value"}] ),
          lengthPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_resistanceInAWireScreen_screenSummary_currentDetails_lengthPattern', _.get( ResistanceInAWireStrings, 'a11y.resistanceInAWireScreen.screenSummary.currentDetails.lengthPatternStringProperty' ), [{"name":"value"}] ),
          areaPattern: new FluentPattern<{ value: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_resistanceInAWireScreen_screenSummary_currentDetails_areaPattern', _.get( ResistanceInAWireStrings, 'a11y.resistanceInAWireScreen.screenSummary.currentDetails.areaPatternStringProperty' ), [{"name":"value"}] )
        },
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_resistanceInAWireScreen_screenSummary_interactionHint', _.get( ResistanceInAWireStrings, 'a11y.resistanceInAWireScreen.screenSummary.interactionHintStringProperty' ) )
      }
    },
    formulaNode: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_formulaNode_accessibleHeading', _.get( ResistanceInAWireStrings, 'a11y.formulaNode.accessibleHeadingStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_formulaNode_accessibleHelpText', _.get( ResistanceInAWireStrings, 'a11y.formulaNode.accessibleHelpTextStringProperty' ) ),
      lettersNode: {
        descriptionContentPattern: {
          rhoLAndAComparable: new FluentPattern<{ rToAll: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_formulaNode_lettersNode_descriptionContentPattern_rhoLAndAComparable', _.get( ResistanceInAWireStrings, 'a11y.formulaNode.lettersNode.descriptionContentPattern.rhoLAndAComparableStringProperty' ), [{"name":"rToAll"}] ),
          lAndAComparable: new FluentPattern<{ rToLAndA: FluentVariable, rToRho: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_formulaNode_lettersNode_descriptionContentPattern_lAndAComparable', _.get( ResistanceInAWireStrings, 'a11y.formulaNode.lettersNode.descriptionContentPattern.lAndAComparableStringProperty' ), [{"name":"rToLAndA"},{"name":"rToRho"}] ),
          noneComparable: new FluentPattern<{ rToA: FluentVariable, rToL: FluentVariable, rToRho: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_formulaNode_lettersNode_descriptionContentPattern_noneComparable', _.get( ResistanceInAWireStrings, 'a11y.formulaNode.lettersNode.descriptionContentPattern.noneComparableStringProperty' ), [{"name":"rToA"},{"name":"rToL"},{"name":"rToRho"}] )
        }
      },
      relativeSizeDescription: new FluentPattern<{ relativeSize: 'muchMuchSmaller' | 'muchSmaller' | 'slightlySmaller' | 'comparable' | 'slightlyLarger' | 'muchLarger' | 'muchMuchLarger' | TReadOnlyProperty<'muchMuchSmaller' | 'muchSmaller' | 'slightlySmaller' | 'comparable' | 'slightlyLarger' | 'muchLarger' | 'muchMuchLarger'> }>( fluentSupport.bundleProperty, 'a11y_formulaNode_relativeSizeDescription', _.get( ResistanceInAWireStrings, 'a11y.formulaNode.relativeSizeDescriptionStringProperty' ), [{"name":"relativeSize","variants":["muchMuchSmaller","muchSmaller","slightlySmaller","comparable","slightlyLarger","muchLarger","muchMuchLarger"]}] )
    },
    wireNode: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_wireNode_accessibleHeading', _.get( ResistanceInAWireStrings, 'a11y.wireNode.accessibleHeadingStringProperty' ) ),
      descriptionContentPattern: new FluentPattern<{ impurities: 'tiny' | 'verySmall' | 'small' | 'medium' | 'large' | 'veryLarge' | 'huge' | TReadOnlyProperty<'tiny' | 'verySmall' | 'small' | 'medium' | 'large' | 'veryLarge' | 'huge'>, length: 'extremelyShort' | 'veryShort' | 'short' | 'medium' | 'long' | 'veryLong' | 'extremelyLong' | TReadOnlyProperty<'extremelyShort' | 'veryShort' | 'short' | 'medium' | 'long' | 'veryLong' | 'extremelyLong'>, resistance: FluentVariable, thickness: 'extremelyThin' | 'veryThin' | 'thin' | 'medium' | 'thick' | 'veryThick' | 'extremelyThick' | TReadOnlyProperty<'extremelyThin' | 'veryThin' | 'thin' | 'medium' | 'thick' | 'veryThick' | 'extremelyThick'> }>( fluentSupport.bundleProperty, 'a11y_wireNode_descriptionContentPattern', _.get( ResistanceInAWireStrings, 'a11y.wireNode.descriptionContentPatternStringProperty' ), [{"name":"impurities","variants":["tiny","verySmall","small","medium","large","veryLarge","huge"]},{"name":"length","variants":["extremelyShort","veryShort","short","medium","long","veryLong","extremelyLong"]},{"name":"resistance"},{"name":"thickness","variants":["extremelyThin","veryThin","thin","medium","thick","veryThick","extremelyThick"]}] ),
      lengthClause: new FluentPattern<{ length: 'extremelyShort' | 'veryShort' | 'short' | 'medium' | 'long' | 'veryLong' | 'extremelyLong' | TReadOnlyProperty<'extremelyShort' | 'veryShort' | 'short' | 'medium' | 'long' | 'veryLong' | 'extremelyLong'> }>( fluentSupport.bundleProperty, 'a11y_wireNode_lengthClause', _.get( ResistanceInAWireStrings, 'a11y.wireNode.lengthClauseStringProperty' ), [{"name":"length","variants":["extremelyShort","veryShort","short","medium","long","veryLong","extremelyLong"]}] ),
      thicknessClause: new FluentPattern<{ thickness: 'extremelyThin' | 'veryThin' | 'thin' | 'medium' | 'thick' | 'veryThick' | 'extremelyThick' | TReadOnlyProperty<'extremelyThin' | 'veryThin' | 'thin' | 'medium' | 'thick' | 'veryThick' | 'extremelyThick'> }>( fluentSupport.bundleProperty, 'a11y_wireNode_thicknessClause', _.get( ResistanceInAWireStrings, 'a11y.wireNode.thicknessClauseStringProperty' ), [{"name":"thickness","variants":["extremelyThin","veryThin","thin","medium","thick","veryThick","extremelyThick"]}] ),
      impuritiesClause: new FluentPattern<{ impurities: 'tiny' | 'verySmall' | 'small' | 'medium' | 'large' | 'veryLarge' | 'huge' | TReadOnlyProperty<'tiny' | 'verySmall' | 'small' | 'medium' | 'large' | 'veryLarge' | 'huge'> }>( fluentSupport.bundleProperty, 'a11y_wireNode_impuritiesClause', _.get( ResistanceInAWireStrings, 'a11y.wireNode.impuritiesClauseStringProperty' ), [{"name":"impurities","variants":["tiny","verySmall","small","medium","large","veryLarge","huge"]}] )
    },
    controlPanel: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controlPanel_accessibleHeading', _.get( ResistanceInAWireStrings, 'a11y.controlPanel.accessibleHeadingStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controlPanel_accessibleHelpText', _.get( ResistanceInAWireStrings, 'a11y.controlPanel.accessibleHelpTextStringProperty' ) ),
      resistivitySlider: {
        labelContentStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controlPanel_resistivitySlider_labelContent', _.get( ResistanceInAWireStrings, 'a11y.controlPanel.resistivitySlider.labelContentStringProperty' ) )
      },
      lengthSlider: {
        labelContentStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controlPanel_lengthSlider_labelContent', _.get( ResistanceInAWireStrings, 'a11y.controlPanel.lengthSlider.labelContentStringProperty' ) )
      },
      areaSlider: {
        labelContentStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_controlPanel_areaSlider_labelContent', _.get( ResistanceInAWireStrings, 'a11y.controlPanel.areaSlider.labelContentStringProperty' ) )
      },
      sliderChange: {
        accessibleContextResponsePattern: new FluentPattern<{ letter: 'rho' | 'length' | 'area' | TReadOnlyProperty<'rho' | 'length' | 'area'>, letterChange: 'grows' | 'shrinks' | 'growsALot' | 'shrinksALot' | TReadOnlyProperty<'grows' | 'shrinks' | 'growsALot' | 'shrinksALot'>, rChange: 'grows' | 'shrinks' | 'growsALot' | 'shrinksALot' | TReadOnlyProperty<'grows' | 'shrinks' | 'growsALot' | 'shrinksALot'>, resistance: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_controlPanel_sliderChange_accessibleContextResponsePattern', _.get( ResistanceInAWireStrings, 'a11y.controlPanel.sliderChange.accessibleContextResponsePatternStringProperty' ), [{"name":"letter","variants":["rho","length","area"]},{"name":"letterChange","variants":["grows","shrinks","growsALot","shrinksALot"]},{"name":"rChange","variants":["grows","shrinks","growsALot","shrinksALot"]},{"name":"resistance"}] ),
        changedLetterClause: new FluentPattern<{ letter: 'rho' | 'length' | 'area' | TReadOnlyProperty<'rho' | 'length' | 'area'>, letterChange: 'grows' | 'shrinks' | 'growsALot' | 'shrinksALot' | TReadOnlyProperty<'grows' | 'shrinks' | 'growsALot' | 'shrinksALot'> }>( fluentSupport.bundleProperty, 'a11y_controlPanel_sliderChange_changedLetterClause', _.get( ResistanceInAWireStrings, 'a11y.controlPanel.sliderChange.changedLetterClauseStringProperty' ), [{"name":"letter","variants":["rho","length","area"]},{"name":"letterChange","variants":["grows","shrinks","growsALot","shrinksALot"]}] ),
        resistanceLetterClause: new FluentPattern<{ rChange: 'grows' | 'shrinks' | 'growsALot' | 'shrinksALot' | TReadOnlyProperty<'grows' | 'shrinks' | 'growsALot' | 'shrinksALot'> }>( fluentSupport.bundleProperty, 'a11y_controlPanel_sliderChange_resistanceLetterClause', _.get( ResistanceInAWireStrings, 'a11y.controlPanel.sliderChange.resistanceLetterClauseStringProperty' ), [{"name":"rChange","variants":["grows","shrinks","growsALot","shrinksALot"]}] ),
        letterName: new FluentPattern<{ letter: 'rho' | 'length' | 'area' | TReadOnlyProperty<'rho' | 'length' | 'area'> }>( fluentSupport.bundleProperty, 'a11y_controlPanel_sliderChange_letterName', _.get( ResistanceInAWireStrings, 'a11y.controlPanel.sliderChange.letterNameStringProperty' ), [{"name":"letter","variants":["rho","length","area"]}] ),
        letterSizeChange: new FluentPattern<{ letterChange: 'grows' | 'shrinks' | 'growsALot' | 'shrinksALot' | TReadOnlyProperty<'grows' | 'shrinks' | 'growsALot' | 'shrinksALot'> }>( fluentSupport.bundleProperty, 'a11y_controlPanel_sliderChange_letterSizeChange', _.get( ResistanceInAWireStrings, 'a11y.controlPanel.sliderChange.letterSizeChangeStringProperty' ), [{"name":"letterChange","variants":["grows","shrinks","growsALot","shrinksALot"]}] ),
        resistanceSizeChange: new FluentPattern<{ rChange: 'grows' | 'shrinks' | 'growsALot' | 'shrinksALot' | TReadOnlyProperty<'grows' | 'shrinks' | 'growsALot' | 'shrinksALot'> }>( fluentSupport.bundleProperty, 'a11y_controlPanel_sliderChange_resistanceSizeChange', _.get( ResistanceInAWireStrings, 'a11y.controlPanel.sliderChange.resistanceSizeChangeStringProperty' ), [{"name":"rChange","variants":["grows","shrinks","growsALot","shrinksALot"]}] )
      }
    }
  }
};

export default ResistanceInAWireFluent;

resistanceInAWire.register('ResistanceInAWireFluent', ResistanceInAWireFluent);
