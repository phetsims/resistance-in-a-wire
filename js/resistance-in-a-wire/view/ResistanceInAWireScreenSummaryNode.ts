// Copyright 2018-2026, University of Colorado Boulder

/**
 * The Screen Summary for Resistance in a Wire. This summary is at the top of the document, and is the first thing
 * that a screen reader user reads when using the sim. It provides overview information about the resistance
 * equation, visualization of the circuit, and the controls in the interface.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import AccessibleList, { type AccessibleListOptions } from '../../../../scenery-phet/js/accessibility/AccessibleList.js';
import ResistanceInAWireFluent from '../../ResistanceInAWireFluent.js';
import type ResistanceInAWireDescriber from './ResistanceInAWireDescriber.js';

const summaryPlayAreaStringProperty = ResistanceInAWireFluent.a11y.resistanceInAWireScreen.screenSummary.playAreaStringProperty;
const summaryControlAreaStringProperty = ResistanceInAWireFluent.a11y.resistanceInAWireScreen.screenSummary.controlAreaStringProperty;
const summaryCurrentlyStringProperty = ResistanceInAWireFluent.a11y.resistanceInAWireScreen.screenSummary.currentDetails.currentlyStringProperty;
const summaryInteractionHintStringProperty = ResistanceInAWireFluent.a11y.resistanceInAWireScreen.screenSummary.interactionHintStringProperty;

export default class ResistanceInAWireScreenSummaryNode extends ScreenSummaryContent {

  public constructor( describer: ResistanceInAWireDescriber ) {

    const currentDetailsListOptions: AccessibleListOptions = {
      leadingParagraphStringProperty: summaryCurrentlyStringProperty,
      listItems: [
        describer.resistanceSummaryStringProperty,
        describer.resistivitySummaryStringProperty,
        describer.lengthSummaryStringProperty,
        describer.areaSummaryStringProperty
      ],
      renderFormattingTags: true
    };

    super( {
      playAreaContent: summaryPlayAreaStringProperty,
      controlAreaContent: summaryControlAreaStringProperty,
      currentDetailsContent: AccessibleList.createTemplateProperty( currentDetailsListOptions ),
      interactionHintContent: summaryInteractionHintStringProperty
    } );
  }
}
