// Copyright 2013-2019, University of Colorado Boulder

/**
 * Main View for the "ResistanceInAWire" screen.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 * @author John Blanco (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const AccessibleSummaryNode = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/AccessibleSummaryNode' );
  const ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  const ControlPanel = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/ControlPanel' );
  const FocusHighlightPath = require( 'SCENERY/accessibility/FocusHighlightPath' );
  const FormulaNode = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/FormulaNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ResetAllSoundGenerator = require( 'TAMBO/sound-generators/ResetAllSoundGenerator' );
  const resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  const ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const Shape = require( 'KITE/Shape' );
  const soundManager = require( 'TAMBO/soundManager' );
  const WireNode = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/WireNode' );

  /**
   * @param {ResistanceInAWireModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function ResistanceInAWireScreenView( model, tandem ) {

    ScreenView.call( this, {
      tandem: tandem,
      screenSummaryContent: new AccessibleSummaryNode( model )
    } );

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
    this.playAreaNode.addChild( formulaNode );

    // Create the wire display to represent the formula
    var wireNode = new WireNode( model, tandem.createTandem( 'wireNode' ), {
      centerX: formulaNode.centerX,
      centerY: formulaNode.centerY + 270
    } );
    this.playAreaNode.addChild( wireNode );

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
    this.playAreaNode.addChild( arrowNode );

    var resetAllButton = new ResetAllButton( {
      listener: function() { model.reset(); },
      radius: 30,
      right: controlPanel.right,
      bottom: this.layoutBounds.bottom - 20,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.controlAreaNode.addChild( resetAllButton );
    soundManager.addSoundGenerator( new ResetAllSoundGenerator( model.resetInProgressProperty, {
      initialOutputLevel: 0.7
    } ) );

    // the outer stroke of the ResetAllButton focus highlight is black so that it is visible when the equation
    // resistance letter grows too large
    var highlightShape = resetAllButton.focusHighlight;
    assert && assert( highlightShape instanceof Shape, 'highlightShape must be a Shape' );
    resetAllButton.focusHighlight = new FocusHighlightPath( highlightShape, { outerStroke: 'black' } );

    // add the control panel last so it is always on top.
    this.playAreaNode.addChild( controlPanel );
  }

  resistanceInAWire.register( 'ResistanceInAWireScreenView', ResistanceInAWireScreenView );

  return inherit( ScreenView, ResistanceInAWireScreenView );
} );