// Copyright 2018, University of Colorado Boulder

/**
 * The Screen Summary for Resistance in a Wire. This summary is at the top of the document, and is the first thing
 * that a screen reader user reads when using the sim. It provides overview information about the resistance
 * equation, visualization of the circuit, and the controls in the interface.
 * 
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

define( function( require ) {
  'use strict';

  // modules
  var AccessibleSectionNode = require( 'SCENERY_PHET/accessibility/AccessibleSectionNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireA11yStrings = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireA11yStrings' );
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Util = require( 'DOT/Util' );

  // a11y strings
  var summarySimString = ResistanceInAWireA11yStrings.summarySimString.value;
  var currentlyString = ResistanceInAWireA11yStrings.currentlyString.value;
  var summaryResistancePatternString = ResistanceInAWireA11yStrings.summaryResistancePatternString.value;
  var summaryResistivityPatternString = ResistanceInAWireA11yStrings.summaryResistivityPatternString.value;
  var summaryLengthPatternString = ResistanceInAWireA11yStrings.summaryLengthPatternString.value;
  var summaryAreaPatternString = ResistanceInAWireA11yStrings.summaryAreaPatternString.value;
  var summaryInteractionHintString = ResistanceInAWireA11yStrings.summaryInteractionHintString.value;

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
    var listNode = new Node( { tagName: 'ul' } );
    var resistanceItemNode = new Node( { tagName: 'li' } );
    var resistivityItemNode = new Node( { tagName: 'li' } );
    var lengthItemNode = new Node( { tagName: 'li' } );
    var areaItemNode = new Node( { tagName: 'li' } );
    this.addChild( listNode );
    listNode.children = [ resistanceItemNode, resistivityItemNode, lengthItemNode, areaItemNode ];

    // hint to look for other elements in the UI
    this.addChild( new Node( { tagName: 'p', innerContent: summaryInteractionHintString } ) );

    // add listeners - add all values to a list so we can easily iterate and add listeners to update descriptions
    // with each property
    var valueItemList = [
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
        var precision = typeof item.precision === 'number' ? item.precision : item.precision( value );
        item.node.innerContent = StringUtils.fillIn( item.patternString, {
          value: Util.toFixed( value, precision )
        } );
      } );
    } );
  }

  resistanceInAWire.register( 'AccessibleSummaryNode', AccessibleSummaryNode );

  return inherit( AccessibleSectionNode, AccessibleSummaryNode, {} );
} );