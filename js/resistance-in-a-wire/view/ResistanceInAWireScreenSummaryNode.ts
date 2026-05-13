// Copyright 2018-2026, University of Colorado Boulder

/**
 * The Screen Summary for Resistance in a Wire. This summary is at the top of the document, and is the first thing
 * that a screen reader user reads when using the sim. It provides overview information about the resistance
 * equation, visualization of the circuit, and the controls in the interface.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import type { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import ResistanceInAWireFluent from '../../ResistanceInAWireFluent.js';
import type ResistanceInAWireModel from '../model/ResistanceInAWireModel.js';
import ResistanceInAWireConstants from '../ResistanceInAWireConstants.js';

const summarySimStringProperty = ResistanceInAWireFluent.a11y.summary.simStringProperty;
const summaryCurrentlyStringProperty = ResistanceInAWireFluent.a11y.summary.currentlyStringProperty;
const summaryResistancePattern = ResistanceInAWireFluent.a11y.summary.resistancePattern;
const summaryResistivityPattern = ResistanceInAWireFluent.a11y.summary.resistivityPattern;
const summaryLengthPattern = ResistanceInAWireFluent.a11y.summary.lengthPattern;
const summaryAreaPattern = ResistanceInAWireFluent.a11y.summary.areaPattern;
const summaryInteractionHintStringProperty = ResistanceInAWireFluent.a11y.summary.interactionHintStringProperty;

type SummaryItem = {
  property: TReadOnlyProperty<number>;
  format: ( value: string ) => string;
  node: Node;
  precision: number | ( ( value: number ) => number );
};

export default class ResistanceInAWireScreenSummaryNode extends ScreenSummaryContent {

  public constructor( model: ResistanceInAWireModel ) {

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

    // add listeners - add all values to a list so we can easily iterate and add listeners to update descriptions
    // with each property
    const summaryItems: SummaryItem[] = [
      {
        property: model.resistivityProperty,
        format: value => summaryResistivityPattern.format( { value: value } ),
        node: resistivityItemNode,
        precision: ResistanceInAWireConstants.SLIDER_READOUT_DECIMALS
      },
      {
        property: model.lengthProperty,
        format: value => summaryLengthPattern.format( { value: value } ),
        node: lengthItemNode,
        precision: ResistanceInAWireConstants.SLIDER_READOUT_DECIMALS
      },
      {
        property: model.areaProperty,
        format: value => summaryAreaPattern.format( { value: value } ),
        node: areaItemNode,
        precision: ResistanceInAWireConstants.SLIDER_READOUT_DECIMALS
      },
      {
        property: model.resistanceProperty,
        format: value => summaryResistancePattern.format( { value: value } ),
        node: resistanceItemNode,
        precision: ResistanceInAWireConstants.getResistanceDecimals
      }
    ];

    summaryItems.forEach( item => {

      // register listeners that update the labels in the screen summary - this summary exists for life of sim,
      // no need to dispose
      item.property.link( ( value: number ) => {

        // the precision might change during interaction, get precision if property is a function
        const precision = typeof item.precision === 'number' ? item.precision : item.precision( value );
        item.node.innerContent = item.format( Utils.toFixed( value, precision ) );
      } );
    } );
  }
}
