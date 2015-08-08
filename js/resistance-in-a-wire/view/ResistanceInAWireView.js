// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for ResistanceInAWire simulations. Contains stage and reset button
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var ResistanceInAWireStageContainer = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/ResistanceInAWireStageContainer' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );

  function ResistanceInAWireView( model ) {
    ScreenView.call( this, { layoutBounds: new Bounds2( 0, 0, 768, 504 ) } );
    this.addChild( new ResistanceInAWireStageContainer( model ) );
  }

  return inherit( ScreenView, ResistanceInAWireView );
} );
