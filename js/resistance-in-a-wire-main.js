// Copyright 2002-2013, University of Colorado Boulder

/**
 * Copyright 2002-2013, University of Colorado
 * Main entry point for the "resistance in a wire" sim.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var SimLauncher = require( 'JOIST/SimLauncher' ),
    Sim = require( 'JOIST/Sim' ),
    Strings = require( 'resistance-in-a-wire-strings' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    ResistanceInAWireModel = require( 'model/ResistanceInAWireModel' ),
    ResistanceInAWireView = require( 'view/ResistanceInAWireView' ),
    imageLoader = require( 'imageLoader' );

  SimLauncher.launch( imageLoader, function() {
    //Create and start the sim
    new Sim( Strings.simTitle, [
      {
        name: Strings.simTitle,
        icon: new Rectangle( 0, 0, 50, 50, { fill: 'blue' } ),
        createModel: function() { return new ResistanceInAWireModel( 1000, 650 ); },
        createView: function( model ) { return new ResistanceInAWireView( model ); },
        backgroundColor: "#ffffdf"
      }
    ] ).start();
  } );
} );
