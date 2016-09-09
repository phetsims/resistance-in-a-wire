// Copyright 2016, University of Colorado Boulder

/**
 * The main screen class for the 'Resistance in a Wire' simulation.  This is where the main model and view instances are
 * created and inserted into the framework.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ResistanceInAWireModel = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/model/ResistanceInAWireModel' );
  var ResistanceInAWireScreenView = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/ResistanceInAWireScreenView' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var resistanceInAWireTitleString = require( 'string!RESISTANCE_IN_A_WIRE/resistance-in-a-wire.title' );

  /**
   * Creates the model and view for the ResistanceInAWireScreen
   * @constructor
   */
  function ResistanceInAWireScreen() {
    Screen.call( this, resistanceInAWireTitleString, null /* no icon, single-screen sim */,
      function() { return new ResistanceInAWireModel(); },
      function( model ) { return new ResistanceInAWireScreenView( model ); },
      { backgroundColor: '#ffffdf' }
    );
  }

  return inherit( Screen, ResistanceInAWireScreen );
} );