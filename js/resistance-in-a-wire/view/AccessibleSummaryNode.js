// Copyright 2018-2020, University of Colorado Boulder

/**
 * The Screen Summary for Resistance in a Wire. This summary is at the top of the document, and is the first thing
 * that a screen reader user reads when using the sim. It provides overview information about the resistance
 * equation, visualization of the circuit, and the controls in the interface.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Utils from '../../../../dot/js/Utils.js';
import inherit from '../../../../phet-core/js/inherit.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import AccessibleSectionNode from '../../../../scenery-phet/js/accessibility/AccessibleSectionNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import resistanceInAWire from '../../resistanceInAWire.js';
import ResistanceInAWireA11yStrings from '../ResistanceInAWireA11yStrings.js';
import ResistanceInAWireConstants from '../ResistanceInAWireConstants.js';

// a11y strings
const summarySimString = ResistanceInAWireA11yStrings.summarySimString.value;
const currentlyString = ResistanceInAWireA11yStrings.currentlyString.value;
const summaryResistancePatternString = ResistanceInAWireA11yStrings.summaryResistancePatternString.value;
const summaryResistivityPatternString = ResistanceInAWireA11yStrings.summaryResistivityPatternString.value;
const summaryLengthPatternString = ResistanceInAWireA11yStrings.summaryLengthPatternString.value;
const summaryAreaPatternString = ResistanceInAWireA11yStrings.summaryAreaPatternString.value;
const summaryInteractionHintString = ResistanceInAWireA11yStrings.summaryInteractionHintString.value;

// constants
function AccessibleSummaryNode( model ) {
  Node.call( this );

  // main summary for this sim - this content never changes
  this.addChild( new Node( {
    tagName: 'p',
    innerContent: summarySimString
  } ) );

  // indicates that the summary updates with model changes
  this.addChild( new Node( { tagName: 'p', innerContent: currentlyString } ) );

  // list that updates according to model Properties
  const listNode = new Node( { tagName: 'ul' } );
  const resistanceItemNode = new Node( { tagName: 'li' } );
  const resistivityItemNode = new Node( { tagName: 'li' } );
  const lengthItemNode = new Node( { tagName: 'li' } );
  const areaItemNode = new Node( { tagName: 'li' } );
  this.addChild( listNode );
  listNode.children = [ resistanceItemNode, resistivityItemNode, lengthItemNode, areaItemNode ];

  // hint to look for other elements in the UI
  this.addChild( new Node( { tagName: 'p', innerContent: summaryInteractionHintString } ) );

  // add listeners - add all values to a list so we can easily iterate and add listeners to update descriptions
  // with each property
  const valueItemList = [
    {
      property: model.resistivityProperty,
      patternString: summaryResistivityPatternString,
      node: resistivityItemNode,
      precision: ResistanceInAWireConstants.SLIDER_READOUT_DECIMALS
    },
    {
      property: model.lengthProperty,
      patternString: summaryLengthPatternString,
      node: lengthItemNode,
      precision: ResistanceInAWireConstants.SLIDER_READOUT_DECIMALS
    },
    {
      property: model.areaProperty,
      patternString: summaryAreaPatternString,
      node: areaItemNode,
      precision: ResistanceInAWireConstants.SLIDER_READOUT_DECIMALS
    },
    {
      property: model.resistanceProperty,
      patternString: summaryResistancePatternString,
      node: resistanceItemNode,
      precision: ResistanceInAWireConstants.getResistanceDecimals // TODO: get dynamically, it will update
    }
  ];

  // register listeners that update the labels in the screen summary - this summary exists for life of sim,
  // no need to dispose
  valueItemList.forEach( function( item ) {
    item.property.link( function( value ) {

      // the precision might change during interaction, get precision if property is a function
      const precision = typeof item.precision === 'number' ? item.precision : item.precision( value );
      item.node.innerContent = StringUtils.fillIn( item.patternString, {
        value: Utils.toFixed( value, precision )
      } );
    } );
  } );
}

resistanceInAWire.register( 'AccessibleSummaryNode', AccessibleSummaryNode );

export default inherit( AccessibleSectionNode, AccessibleSummaryNode, {} );