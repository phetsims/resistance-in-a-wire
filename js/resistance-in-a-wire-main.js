// Copyright 2013-2015, University of Colorado Boulder

/**
 * Main entry point for the "resistance in a wire" sim.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Screen = require( 'JOIST/Screen' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Sim = require( 'JOIST/Sim' );
  var ResistanceInAWireModel = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/model/ResistanceInAWireModel' );
  var ResistanceInAWireView = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/ResistanceInAWireView' );

  // strings
  var simTitle = require( 'string!RESISTANCE_IN_A_WIRE/resistance-in-a-wire.title' );

  var simOptions = {
    credits: {
      leadDesign: 'Michael Dubson',
      softwareDevelopment: 'Michael Dubson, John Blanco',
      team: 'Wendy Adams, Mindy Gratny, Ariel Paul',
      thanks: 'Thanks to Mobile Learner Labs for working with the PhET development team\nto convert this simulation to HTML5.'
    }
  };

  SimLauncher.launch( function() {
    //Create and start the sim
    new Sim( simTitle, [
      new Screen( simTitle, null, /* single-screen sim, no icon */
        function() { return new ResistanceInAWireModel(); },
        function( model ) { return new ResistanceInAWireView( model ); },
        { backgroundColor: '#ffffdf' }
      )
    ], simOptions ).start();
  } );
} );
