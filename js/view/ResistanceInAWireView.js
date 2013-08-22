/**
 * Copyright 2002-2013, University of Colorado
 * View for ResistanceInAWire simulations. Contains stage and reset button
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var ResistanceInAWireStage = require( 'view/ResistanceInAWireStageContainer' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );

  function ResistanceInAWireView( model ) {
    ScreenView.call( this, { renderer: 'svg' } );
    this.addChild( new ResistanceInAWireStage( model ) );
  }

  inherit( ScreenView, ResistanceInAWireView );
  return ResistanceInAWireView;

} )
;
