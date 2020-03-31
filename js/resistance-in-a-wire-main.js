// Copyright 2013-2020, University of Colorado Boulder

/**
 * Main entry point for the "resistance in a wire" sim.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

import Sim from '../../joist/js/Sim.js';
import SimLauncher from '../../joist/js/SimLauncher.js';
import SliderAndGeneralKeyboardHelpContent
  from '../../scenery-phet/js/keyboard/help/SliderAndGeneralKeyboardHelpContent.js';
import Tandem from '../../tandem/js/Tandem.js';
import resistanceInAWireStrings from './resistanceInAWireStrings.js';
import ResistanceInAWireScreen from './resistance-in-a-wire/ResistanceInAWireScreen.js';

// constants
const tandem = Tandem.ROOT;

const resistanceInAWireTitleString = resistanceInAWireStrings[ 'resistance-in-a-wire' ].title;

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
  keyboardHelpNode: keyboardHelpContent
};

SimLauncher.launch( function() {

  // Create and start the sim
  const sim = new Sim( resistanceInAWireTitleString,
    [ new ResistanceInAWireScreen( tandem.createTandem( 'resistanceInAWireScreen' ) ) ], simOptions );
  sim.start();
} );