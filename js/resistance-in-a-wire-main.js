/**
 * Copyright 2002-2013, University of Colorado
 * Main entry point for the "resistance in a wire" sim.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // Imports
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Sim = require( 'JOIST/Sim' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ResistanceInAWireModel = require( 'model/ResistanceInAWireModel' );
  var ResistanceInAWireView = require( 'view/ResistanceInAWireView' );

  // Resources
  var simTitle = require( 'string!RESISTANCE_IN_A_WIRE/simTitle' );

  // Credits
  var simOptions = {
    credits: 'PhET Development Team -\n' +
             'Lead Design: Michael Dubson\n' +
             'Software Development: Michael Dubson, John Blanco\n' +
             'Design Team: Ariel Paul\n' +
             'Interviews: Wendy Adams, Mindy Gratny\n',
    thanks: 'Thanks -\n' +
            'Thanks to Mobile Learner Labs for working with the PhET development team to convert this simulation to HTML5.'
  };
  SimLauncher.launch( function() {
    //Create and start the sim
    new Sim( simTitle, [
      {
        name: simTitle,
        icon: new Rectangle( 0, 0, 50, 50, { fill: 'blue' } ),
        createModel: function() { return new ResistanceInAWireModel(); },
        createView: function( model ) { return new ResistanceInAWireView( model ); },
        backgroundColor: "#ffffdf"
      }
    ], simOptions ).start();
  } );
} );
