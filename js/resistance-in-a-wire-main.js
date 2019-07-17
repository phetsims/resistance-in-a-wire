// Copyright 2013-2019, University of Colorado Boulder

/**
 * Main entry point for the "resistance in a wire" sim.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var ResistanceInAWireScreen = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var SliderAndGeneralKeyboardHelpContent = require( 'SCENERY_PHET/keyboard/help/SliderAndGeneralKeyboardHelpContent' );
  var Tandem = require( 'TANDEM/Tandem' );

  // constants
  var tandem = Tandem.rootTandem;

  // strings
  var resistanceInAWireTitleString = require( 'string!RESISTANCE_IN_A_WIRE/resistance-in-a-wire.title' );

  // help content to describe keyboard interactions
  var keyboardHelpContent = new SliderAndGeneralKeyboardHelpContent();

  var simOptions = {
    credits: {
      leadDesign: 'Michael Dubson',
      softwareDevelopment: 'Michael Dubson, John Blanco, Jesse Greenberg, Michael Kauzmann',
      team: 'Wendy Adams, Mindy Gratny, Emily B. Moore, Ariel Paul, Taliesin Smith, Brianna Tomlinson',
      qualityAssurance: 'Steele Dalton, Kerrie Dochen, Alex Dornan, Bryce Griebenow, Ethan Johnson, Megan Lai, ' +
                        'Elise Morgan, Liam Mulhall, Oliver Orejola, Arnab Purkayastha, Laura Rea, Benjamin Roberts, ' +
                        'Jacob Romero, Clara Wilson, Kathryn Woessner, Kelly Wurtz, Bryan Yoelin',
      thanks: 'Thanks to Mobile Learner Labs for working with the PhET development team to convert this ' +
              'simulation to HTML5.',
      soundDesign: 'Ashton Morris, Mike Winters'
    },

    // a11y enabled
    keyboardHelpNode: keyboardHelpContent,
    accessibility: true,
    supportsSound: true
  };

  SimLauncher.launch( function() {

    // Create and start the sim
    var sim = new Sim( resistanceInAWireTitleString,
      [ new ResistanceInAWireScreen( tandem.createTandem( 'resistanceInAWireScreen' ) ) ], simOptions );
    sim.start();
  } );
} );
