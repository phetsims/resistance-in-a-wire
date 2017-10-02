// Copyright 2013-2017, University of Colorado Boulder

/**
 * Main entry point for the "resistance in a wire" sim.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var ResistanceInAWireKeyboardHelpContent = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/ResistanceInAWireKeyboardHelpContent' );
  var ResistanceInAWireScreen = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Tandem = require( 'TANDEM/Tandem' );

  // constants
  var tandem = Tandem.createRootTandem();

  // strings
  var resistanceInAWireTitleString = require( 'string!RESISTANCE_IN_A_WIRE/resistance-in-a-wire.title' );

  // help content to describe keyboard interactions
  var keyboardHelpContent = new ResistanceInAWireKeyboardHelpContent( Tandem.createStaticTandem( 'keyboardHelpContent' ) );

  var simOptions = {
    credits: {
      leadDesign: 'Michael Dubson',
      softwareDevelopment: 'Michael Dubson, John Blanco',
      team: 'Wendy Adams, Mindy Gratny, Ariel Paul',
      qualityAssurance: 'Steele Dalton, Alex Dornan, Bryce Griebenow, Ethan Johnson, Elise Morgan, ' +
                        'Oliver Orejola, Benjamin Roberts, Bryan Yoelin',
      thanks: 'Thanks to Mobile Learner Labs for working with the PhET development team to convert this ' +
              'simulation to HTML5.'
    },

    // a11y enabled
    keyboardHelpNode: keyboardHelpContent,
    accessibility: true 
  };

  SimLauncher.launch( function() {

    // Create and start the sim
    var sim = new Sim( resistanceInAWireTitleString,
      [ new ResistanceInAWireScreen( tandem.createTandem( 'resistanceInAWireScreen' ) ) ], simOptions );
    sim.start();
  } );
} );
