// Copyright 2013-2017, University of Colorado Boulder

/**
 * Main View for the "ResistanceInAWire" screen.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 * @author John Blanco (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var AccessibleSummaryNode = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/AccessibleSummaryNode' );
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var ControlPanel = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/ControlPanel' );
  var FocusHighlightPath = require( 'SCENERY/accessibility/FocusHighlightPath' );
  var FormulaNode = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/FormulaNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Shape = require( 'KITE/Shape' );
  var WireNode = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/WireNode' );

  /**
   * @param {ResistanceInAWireModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function ResistanceInAWireScreenView( model, tandem ) {

    ScreenView.call( this, {
      tandem: tandem
    } );

    // a11y - Create and add the summary for this simulation, the first thing screen reader users encounter
    var summaryNode = new AccessibleSummaryNode( model );
    this.addChild( summaryNode );

    // Create the control panel with sliders that change the values of the equation's variables. Hard coded
    var controlPanel = new ControlPanel( model, tandem.createTandem( 'controlPanel' ), {
      right: this.layoutBounds.right - 30,
      top: 40
    } );

    // Create the formula node that holds the equation with size changing variables.
    var formulaNode = new FormulaNode( model, tandem.createTandem( 'formulaNode' ), {
      centerX: controlPanel.left / 2,
      centerY: 190
    } );
    this.addChild( formulaNode );

    // Create the wire display to represent the formula
    var wireNode = new WireNode( model, tandem.createTandem( 'wireNode' ), {
      centerX: formulaNode.centerX,
      centerY: formulaNode.centerY + 270
    } );
    this.addChild( wireNode );

    var tailX = wireNode.centerX - ResistanceInAWireConstants.TAIL_LENGTH / 2;
    var tipX = wireNode.centerX + ResistanceInAWireConstants.TAIL_LENGTH / 2;
    var arrowHeight = this.layoutBounds.bottom - 47;

    // create static arrow below the wire
    var arrowNode = new ArrowNode( tailX, arrowHeight, tipX, arrowHeight, {
      headHeight: ResistanceInAWireConstants.HEAD_HEIGHT,
      headWidth: ResistanceInAWireConstants.HEAD_WIDTH,
      tailWidth: ResistanceInAWireConstants.TAIL_WIDTH,
      fill: ResistanceInAWireConstants.WHITE_COLOR,
      stroke: ResistanceInAWireConstants.BLACK_COLOR,
      lineWidth: 1,
      tandem: tandem.createTandem( 'arrowNode' )
    } );
    this.addChild( arrowNode );

    var resetAllButton = new ResetAllButton( {
      listener: function() { model.reset(); },
      radius: 30,
      right: controlPanel.right,
      bottom: this.layoutBounds.bottom - 20,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );

    // the outer stroke of the ResetAllButton focus highlight is black so that it is visible when the equation
    // resistance letter grows too large
    var highlightShape = resetAllButton.focusHighlight;
    assert && assert( highlightShape instanceof Shape, 'highlightShape must be a Shape' );
    resetAllButton.focusHighlight = new FocusHighlightPath( highlightShape , { outerStroke: 'black' } );

    // add the control panel last so it is always on top.
    this.addChild( controlPanel );

    // a11y - the reset all button should come last, control panel first
    this.accessibleOrder = [ summaryNode, controlPanel ];
  }

  resistanceInAWire.register( 'ResistanceInAWireScreenView', ResistanceInAWireScreenView );

  return inherit( ScreenView, ResistanceInAWireScreenView );
} );