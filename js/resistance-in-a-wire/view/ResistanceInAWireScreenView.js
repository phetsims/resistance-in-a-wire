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
  var AccessibleSectionNode = require( 'SCENERY_PHET/accessibility/AccessibleSectionNode' );
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
  var JoistA11yStrings = require( 'JOIST/JoistA11yStrings' );

  // a11y strings
  var playAreaString = JoistA11yStrings.playArea.value;
  var controlPanelString = JoistA11yStrings.controlPanel.value;

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
    var a11ySummaryNode = new AccessibleSummaryNode( model );
    this.addChild( a11ySummaryNode );

    // a11y - the play area for this sim, containing elements that are significant to the pedagogy of the sim
    var a11yPlayAreaNode = new AccessibleSectionNode( playAreaString );
    this.addChild( a11yPlayAreaNode );

    // a11y - the control panel for this sim, containing supplemental controls
    var a11yControlPanelNode = new AccessibleSectionNode( controlPanelString );
    this.addChild( a11yControlPanelNode );

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
    a11yPlayAreaNode.addChild( formulaNode );

    // Create the wire display to represent the formula
    var wireNode = new WireNode( model, tandem.createTandem( 'wireNode' ), {
      centerX: formulaNode.centerX,
      centerY: formulaNode.centerY + 270
    } );
    a11yPlayAreaNode.addChild( wireNode );

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
    a11yPlayAreaNode.addChild( arrowNode );

    var resetAllButton = new ResetAllButton( {
      listener: function() { model.reset(); },
      radius: 30,
      right: controlPanel.right,
      bottom: this.layoutBounds.bottom - 20,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    a11yControlPanelNode.addChild( resetAllButton );

    // the outer stroke of the ResetAllButton focus highlight is black so that it is visible when the equation
    // resistance letter grows too large
    var highlightShape = resetAllButton.focusHighlight;
    assert && assert( highlightShape instanceof Shape, 'highlightShape must be a Shape' );
    resetAllButton.focusHighlight = new FocusHighlightPath( highlightShape , { outerStroke: 'black' } );

    // add the control panel last so it is always on top.
    a11yPlayAreaNode.addChild( controlPanel );

    // a11y - the reset all button should come last, control panel first
    this.accessibleOrder = [ a11ySummaryNode, a11yPlayAreaNode ];
  }

  resistanceInAWire.register( 'ResistanceInAWireScreenView', ResistanceInAWireScreenView );

  return inherit( ScreenView, ResistanceInAWireScreenView );
} );