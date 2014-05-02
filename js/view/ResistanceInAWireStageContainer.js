/**
 * Copyright 2002-2013, University of Colorado
 * Stage for the "ResistanceInAWire" view.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButtonDeprecated = require( 'SCENERY_PHET/ResetAllButtonDeprecated' );
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var SlidersBox = require( "view/shape-views/SlidersBox" );
  var FormulaView = require( "view/shape-views/FormulaView" );
  var ResistorView = require( "view/shape-views/ResistorView" );

  function ResistanceInAWireStage( model ) {
    Node.call( this, {scale: 0.75} );
    var options = {
      resistivity: {max: 1, min: 0.01},
      length: {max: 20, min: 0.1},
      area: {max: 15, min: 0.01}
    };

    this.addChild( new FormulaView( model, 70, 180 ) );
    this.addChild( new ResistorView( model, 290, 470, options ) );
    this.addChild( new ArrowNode( 200, 600, 350, 600, { headHeight: 50, headWidth: 30, tailWidth: 10, fill: "#FFF", stroke: "#000", lineWidth: 1} ) );
    var slidersBox = new SlidersBox( model, 600, 40, options );
    this.addChild( slidersBox );
    this.addChild( new ResetAllButtonDeprecated( function() { model.reset(); }, { top: slidersBox.bottom + 20, centerX: slidersBox.centerX } ) );
  }

  inherit( Node, ResistanceInAWireStage );
  return ResistanceInAWireStage;
} );
