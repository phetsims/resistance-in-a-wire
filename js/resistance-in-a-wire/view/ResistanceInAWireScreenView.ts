// Copyright 2013-2026, University of Colorado Boulder

/**
 * Main View for the "ResistanceInAWire" screen.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 * @author John Blanco (PhET Interactive Simulations)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import Shape from '../../../../kite/js/Shape.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import HighlightPath from '../../../../scenery/js/accessibility/HighlightPath.js';
import type Tandem from '../../../../tandem/js/Tandem.js';
import type ResistanceInAWireModel from '../model/ResistanceInAWireModel.js';
import ResistanceInAWireConstants from '../ResistanceInAWireConstants.js';
import ControlPanel from './ControlPanel.js';
import FormulaNode from './FormulaNode.js';
import ResistanceInAWireDescriber from './ResistanceInAWireDescriber.js';
import ResistanceInAWireScreenSummaryNode from './ResistanceInAWireScreenSummaryNode.js';
import WireNode from './WireNode.js';

export default class ResistanceInAWireScreenView extends ScreenView {

  public constructor( model: ResistanceInAWireModel, tandem: Tandem ) {
    const describer = new ResistanceInAWireDescriber( model );

    super( {
      tandem: tandem,
      screenSummaryContent: new ResistanceInAWireScreenSummaryNode( describer )
    } );

    // Create the control panel with sliders that change the values of the equation's variables. Hard coded
    const controlPanel = new ControlPanel( model, describer, tandem.createTandem( 'controlPanel' ), {
      right: this.layoutBounds.right - 30,
      top: 40
    } );

    // Create the formula node that holds the equation with size changing variables.
    const formulaNode = new FormulaNode( model, describer, tandem.createTandem( 'formulaNode' ), {
      centerX: controlPanel.left / 2,
      centerY: 190
    } );
    this.pdomPlayAreaNode.addChild( formulaNode );

    // Create the wire display to represent the formula
    const wireNode = new WireNode( model, describer, tandem.createTandem( 'wireNode' ), {
      centerX: formulaNode.centerX,
      centerY: formulaNode.centerY + 270
    } );
    this.pdomPlayAreaNode.addChild( wireNode );

    const tailX = wireNode.centerX - ResistanceInAWireConstants.TAIL_LENGTH / 2;
    const tipX = wireNode.centerX + ResistanceInAWireConstants.TAIL_LENGTH / 2;
    const arrowHeight = this.layoutBounds.bottom - 47;

    // create static arrow below the wire
    const arrowNode = new ArrowNode( tailX, arrowHeight, tipX, arrowHeight, {
      headHeight: ResistanceInAWireConstants.HEAD_HEIGHT,
      headWidth: ResistanceInAWireConstants.HEAD_WIDTH,
      tailWidth: ResistanceInAWireConstants.TAIL_WIDTH,
      fill: ResistanceInAWireConstants.WHITE_COLOR,
      stroke: ResistanceInAWireConstants.BLACK_COLOR,
      lineWidth: 1,
      tandem: tandem.createTandem( 'arrowNode' )
    } );
    this.pdomPlayAreaNode.addChild( arrowNode );

    const resetAllButton = new ResetAllButton( {
      listener: () => { model.reset(); },
      radius: 30,
      right: controlPanel.right,
      bottom: this.layoutBounds.bottom - 20,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.pdomControlAreaNode.addChild( resetAllButton );

    // the outer stroke of the ResetAllButton focus highlight is black so that it is visible when the equation
    // resistance letter grows too large
    const highlightShape = resetAllButton.focusHighlight as Shape;
    affirm( highlightShape, 'highlightShape must be a Shape' );
    resetAllButton.focusHighlight = new HighlightPath( highlightShape, { outerStroke: 'black' } );

    // add the control panel last so it is always on top.
    this.pdomPlayAreaNode.addChild( controlPanel );
  }
}
