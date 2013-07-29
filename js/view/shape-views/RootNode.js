// Copyright 2002-2013, University of Colorado Boulder

/**
 * Copyright 2002-2013, University of Colorado
 * Main container for all part of scene
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var SlidersBox = require( "view/shape-views/SlidersBox" );
  var FormulaView = require( "view/shape-views/FormulaView" );
  var ResistorView = require( "view/shape-views/ResistorView" );

  function RootNode( model ) {
    Node.call( this );
    this.addChild( new FormulaView( model, 70, 180 ) );
    this.addChild( new ResistorView( model, 290, 470 ) );
    this.addChild( new ArrowNode( 200, 600, 350, 600, 50, 30, 10, {fill: "#FFF", stroke: "#000", lineWidth: 1} ) );
    this.addChild( new SlidersBox( model, 600, 40 ) );
  }

  inherit( Node, RootNode );
  return RootNode;
} );
