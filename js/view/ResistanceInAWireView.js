// Copyright 2002-2013, University of Colorado Boulder

/**
 * Copyright 2002-2013, University of Colorado
 * View for ResistanceInAWire simulations. Contains stage and reset button
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var ResistanceInAWireStage = require( 'view/ResistanceInAWireStageContainer' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var TabView = require( 'JOIST/TabView' );
  var inherit = require( 'PHET_CORE/inherit' );

  function ResistanceInAWireView( model ) {
    TabView.call( this, { renderer: 'svg' } );
    this.addChild( new ResistanceInAWireStage( model ) );
    this.addChild( new Node( { scale: 0.8, x: 600, y: 440, children: [ new ResetAllButton( function() {model.reset();} )]} ) );
  }

  inherit( TabView, ResistanceInAWireView );
  return ResistanceInAWireView;

} )
;
