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
    'titleStringProperty': LocalizedStringProperty;
  };
  'areaStringProperty': LocalizedStringProperty;
  'areaSymbolStringProperty': LocalizedStringProperty;
  'cmStringProperty': LocalizedStringProperty;
  'lengthStringProperty': LocalizedStringProperty;
  'lengthSymbolStringProperty': LocalizedStringProperty;
  'ohmStringProperty': LocalizedStringProperty;
  'pattern': {
    '0label': {
      '1value': {
        '2unitsStringProperty': LocalizedStringProperty;
      }
    };
    '0resistanceUnits': {
      '1lengthUnitsStringProperty': LocalizedStringProperty;
    }
  };
  'resistanceStringProperty': LocalizedStringProperty;
  'resistanceSymbolStringProperty': LocalizedStringProperty;
  'resistivityStringProperty': LocalizedStringProperty;
  'a11y': {
    'resistanceInAWireScreen': {
      'screenSummary': {
        'playAreaStringProperty': LocalizedStringProperty;
        'controlAreaStringProperty': LocalizedStringProperty;
        'currentDetails': {
          'currentlyStringProperty': LocalizedStringProperty;
          'resistancePatternStringProperty': LocalizedStringProperty;
          'resistivityPatternStringProperty': LocalizedStringProperty;
          'lengthPatternStringProperty': LocalizedStringProperty;
          'areaPatternStringProperty': LocalizedStringProperty;
        };
        'interactionHintStringProperty': LocalizedStringProperty;
      }
    };
    'formulaNode': {
      'accessibleHeadingStringProperty': LocalizedStringProperty;
      'accessibleParagraphStringProperty': LocalizedStringProperty;
      'accessibleParagraphPattern': {
        'rhoLAndAComparableStringProperty': LocalizedStringProperty;
        'lAndAComparableStringProperty': LocalizedStringProperty;
        'noneComparableStringProperty': LocalizedStringProperty;
      };
      'relativeSizeDescriptionStringProperty': LocalizedStringProperty;
    };
    'wireNode': {
      'accessibleHeadingStringProperty': LocalizedStringProperty;
      'accessibleParagraphPatternStringProperty': LocalizedStringProperty;
      'lengthClauseStringProperty': LocalizedStringProperty;
      'thicknessClauseStringProperty': LocalizedStringProperty;
      'impuritiesClauseStringProperty': LocalizedStringProperty;
    };
    'controlPanel': {
      'accessibleHeadingStringProperty': LocalizedStringProperty;
      'accessibleHelpTextStringProperty': LocalizedStringProperty;
      'resistivityControl': {
        'accessibleNameStringProperty': LocalizedStringProperty;
      };
      'lengthControl': {
        'accessibleNameStringProperty': LocalizedStringProperty;
      };
      'areaControl': {
        'accessibleNameStringProperty': LocalizedStringProperty;
      };
      'controlChange': {
        'accessibleContextResponsePatternStringProperty': LocalizedStringProperty;
        'changedLetterClauseStringProperty': LocalizedStringProperty;
        'resistanceLetterClauseStringProperty': LocalizedStringProperty;
        'letterNameStringProperty': LocalizedStringProperty;
        'letterSizeChangeStringProperty': LocalizedStringProperty;
        'resistanceSizeChangeStringProperty': LocalizedStringProperty;
      }
    }
  }
};

const ResistanceInAWireStrings = getStringModule( 'RESISTANCE_IN_A_WIRE' ) as StringsType;

resistanceInAWire.register( 'ResistanceInAWireStrings', ResistanceInAWireStrings );

export default ResistanceInAWireStrings;
