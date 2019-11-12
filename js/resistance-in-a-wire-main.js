// Copyright 2013-2019, University of Colorado Boulder

/**
 * Main entry point for the "resistance in a wire" sim.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const ResistanceInAWireScreen = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireScreen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const SliderAndGeneralKeyboardHelpContent = require( 'SCENERY_PHET/keyboard/help/SliderAndGeneralKeyboardHelpContent' );
  const Tandem = require( 'TANDEM/Tandem' );

  // constants
  const tandem = Tandem.rootTandem;

  // strings
  const resistanceInAWireTitleString = require( 'string!RESISTANCE_IN_A_WIRE/resistance-in-a-wire.title' );

  // help content to describe keyboard interactions
  const keyboardHelpContent = new SliderAndGeneralKeyboardHelpContent();

  const simOptions = {
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
    accessibility: true
  };

  SimLauncher.launch( function() {

    // Create and start the sim
    const sim = new Sim( resistanceInAWireTitleString,
      [ new ResistanceInAWireScreen( tandem.createTandem( 'resistanceInAWireScreen' ) ) ], simOptions );
    sim.start();
  } );
} );
