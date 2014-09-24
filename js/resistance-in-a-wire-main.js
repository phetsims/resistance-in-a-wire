/**
 * Copyright 2002-2013, University of Colorado
 * Main entry point for the "resistance in a wire" sim.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // Imports
  var Screen = require( 'JOIST/Screen' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Sim = require( 'JOIST/Sim' );
  var ResistanceInAWireModel = require( 'model/ResistanceInAWireModel' );
  var ResistanceInAWireView = require( 'view/ResistanceInAWireView' );

  // Resources
  var simTitle = require( 'string!RESISTANCE_IN_A_WIRE/simTitle' );

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
        { backgroundColor: "#ffffdf" }
      )
    ], simOptions ).start();
  } );
} );
