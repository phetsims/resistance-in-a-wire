// Copyright 2021-2026, University of Colorado Boulder

/* eslint-disable */
/* @formatter:off */

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */

import getStringModule from '../../chipper/js/browser/getStringModule.js';
import type LocalizedStringProperty from '../../chipper/js/browser/LocalizedStringProperty.js';
import resistanceInAWire from './resistanceInAWire.js';

type StringsType = {
  'resistance-in-a-wire': {
    'title': string;
    'titleStringProperty': LocalizedStringProperty;
  };
  'area': string;
  'areaStringProperty': LocalizedStringProperty;
  'areaSymbol': string;
  'areaSymbolStringProperty': LocalizedStringProperty;
  'cm': string;
  'cmStringProperty': LocalizedStringProperty;
  'length': string;
  'lengthStringProperty': LocalizedStringProperty;
  'lengthSymbol': string;
  'lengthSymbolStringProperty': LocalizedStringProperty;
  'ohm': string;
  'ohmStringProperty': LocalizedStringProperty;
  'pattern': {
    '0label': {
      '1value': {
        '2units': string;
        '2unitsStringProperty': LocalizedStringProperty;
      }
    };
    '0resistanceUnits': {
      '1lengthUnits': string;
      '1lengthUnitsStringProperty': LocalizedStringProperty;
    }
  };
  'resistance': string;
  'resistanceStringProperty': LocalizedStringProperty;
  'resistanceSymbol': string;
  'resistanceSymbolStringProperty': LocalizedStringProperty;
  'resistivity': string;
  'resistivityStringProperty': LocalizedStringProperty;
  'a11y': {
    'resistanceInAWireScreen': {
      'screenSummary': {
        'playArea': string;
        'playAreaStringProperty': LocalizedStringProperty;
        'currentDetails': {
          'currently': string;
          'currentlyStringProperty': LocalizedStringProperty;
          'resistancePattern': string;
          'resistancePatternStringProperty': LocalizedStringProperty;
          'resistivityPattern': string;
          'resistivityPatternStringProperty': LocalizedStringProperty;
          'lengthPattern': string;
          'lengthPatternStringProperty': LocalizedStringProperty;
          'areaPattern': string;
          'areaPatternStringProperty': LocalizedStringProperty;
        };
        'interactionHint': string;
        'interactionHintStringProperty': LocalizedStringProperty;
      }
    };
    'formulaNode': {
      'accessibleHeading': string;
      'accessibleHeadingStringProperty': LocalizedStringProperty;
      'accessibleHelpText': string;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'lettersNode': {
        'descriptionContentPattern': {
          'rhoLAndAComparable': string;
          'rhoLAndAComparableStringProperty': LocalizedStringProperty;
          'lAndAComparable': string;
          'lAndAComparableStringProperty': LocalizedStringProperty;
          'noneComparable': string;
          'noneComparableStringProperty': LocalizedStringProperty;
        }
      };
      'relativeSizeDescription': string;
      'relativeSizeDescriptionStringProperty': LocalizedStringProperty;
    };
    'wireNode': {
      'accessibleHeading': string;
      'accessibleHeadingStringProperty': LocalizedStringProperty;
      'descriptionContentPattern': string;
      'descriptionContentPatternStringProperty': LocalizedStringProperty;
      'lengthClause': string;
      'lengthClauseStringProperty': LocalizedStringProperty;
      'thicknessClause': string;
      'thicknessClauseStringProperty': LocalizedStringProperty;
      'impuritiesClause': string;
      'impuritiesClauseStringProperty': LocalizedStringProperty;
    };
    'controlPanel': {
      'accessibleHeading': string;
      'accessibleHeadingStringProperty': LocalizedStringProperty;
      'accessibleHelpText': string;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'resistivitySlider': {
        'labelContent': string;
        'labelContentStringProperty': LocalizedStringProperty;
      };
      'lengthSlider': {
        'labelContent': string;
        'labelContentStringProperty': LocalizedStringProperty;
      };
      'areaSlider': {
        'labelContent': string;
        'labelContentStringProperty': LocalizedStringProperty;
      };
      'sliderChange': {
        'accessibleContextResponsePattern': string;
        'accessibleContextResponsePatternStringProperty': LocalizedStringProperty;
        'changedLetterClause': string;
        'changedLetterClauseStringProperty': LocalizedStringProperty;
        'resistanceLetterClause': string;
        'resistanceLetterClauseStringProperty': LocalizedStringProperty;
        'letterName': string;
        'letterNameStringProperty': LocalizedStringProperty;
        'letterSizeChange': string;
        'letterSizeChangeStringProperty': LocalizedStringProperty;
        'resistanceSizeChange': string;
        'resistanceSizeChangeStringProperty': LocalizedStringProperty;
      }
    }
  }
};

const ResistanceInAWireStrings = getStringModule( 'RESISTANCE_IN_A_WIRE' ) as StringsType;

resistanceInAWire.register( 'ResistanceInAWireStrings', ResistanceInAWireStrings );

export default ResistanceInAWireStrings;
