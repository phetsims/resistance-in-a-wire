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
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var ControlPanel = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/ControlPanel' );
  var FormulaNode = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/FormulaNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var WireNode = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/WireNode' );

  /**
   * @param {ResistanceInAWireModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function ResistanceInAWireScreenView( model, tandem ) {

    ScreenView.call( this, {
      layoutBounds: new Bounds2( 0, 0, 1024, 618 ),
      tandem: tandem
    } );

    // Create the formula node that holds the equation with size changing variables.
    var formulaNode = new FormulaNode( model, tandem.createTandem( 'formulaNode' ) );
    formulaNode.left = 100;
    formulaNode.centerY = 190;
    this.addChild( formulaNode );

    // Create the wire display to represent the formula
    var wireNode = new WireNode( model, tandem.createTandem( 'wireNode' ) );
    wireNode.centerX = formulaNode.centerX;
    wireNode.centerY = formulaNode.centerY + 270;
    this.addChild( wireNode );

    // Create the control panel with sliders that change the values of the equation's variables.
    var controlPanel = new ControlPanel( model, tandem.createTandem( 'controlPanel' ) );
    controlPanel.right = this.layoutBounds.right - 30;
    controlPanel.top = 40;
    this.addChild( controlPanel );


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
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    resetAllButton.right = controlPanel.right;
    resetAllButton.top = controlPanel.bottom + 20;
    this.addChild( resetAllButton );
  }

  resistanceInAWire.register( 'ResistanceInAWireScreenView', ResistanceInAWireScreenView );

  return inherit( ScreenView, ResistanceInAWireScreenView );
} );
