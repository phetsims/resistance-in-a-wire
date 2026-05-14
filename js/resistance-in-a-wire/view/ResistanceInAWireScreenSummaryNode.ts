// Copyright 2018-2026, University of Colorado Boulder

/**
 * The Screen Summary for Resistance in a Wire. This summary is at the top of the document, and is the first thing
 * that a screen reader user reads when using the sim. It provides overview information about the resistance
 * equation, visualization of the circuit, and the controls in the interface.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import ResistanceInAWireFluent from '../../ResistanceInAWireFluent.js';
import type ResistanceInAWireDescriber from './ResistanceInAWireDescriber.js';

const summarySimStringProperty = ResistanceInAWireFluent.a11y.summary.simStringProperty;
const summaryCurrentlyStringProperty = ResistanceInAWireFluent.a11y.summary.currentlyStringProperty;
const summaryInteractionHintStringProperty = ResistanceInAWireFluent.a11y.summary.interactionHintStringProperty;

export default class ResistanceInAWireScreenSummaryNode extends ScreenSummaryContent {

  public constructor( describer: ResistanceInAWireDescriber ) {

    super( {
      additionalContent: summarySimStringProperty
    } );

    this.addChild( new Node( { tagName: 'p', innerContent: summaryCurrentlyStringProperty } ) );

    // list that updates according to model Properties
    const listNode = new Node( { tagName: 'ul' } );
    const resistanceItemNode = new Node( { tagName: 'li' } );
    const resistivityItemNode = new Node( { tagName: 'li' } );
    const lengthItemNode = new Node( { tagName: 'li' } );
    const areaItemNode = new Node( { tagName: 'li' } );
    this.addChild( listNode );
    listNode.children = [ resistanceItemNode, resistivityItemNode, lengthItemNode, areaItemNode ];

    // hint to look for other elements in the UI
    this.addChild( new Node( { tagName: 'p', innerContent: summaryInteractionHintStringProperty } ) );

    resistivityItemNode.innerContent = describer.resistivitySummaryStringProperty;
    lengthItemNode.innerContent = describer.lengthSummaryStringProperty;
    areaItemNode.innerContent = describer.areaSummaryStringProperty;
    resistanceItemNode.innerContent = describer.resistanceSummaryStringProperty;
  }
}
