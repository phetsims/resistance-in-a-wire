// Copyright 2016-2017, University of Colorado Boulder

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
  var Property = require( 'AXON/Property' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireModel = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/model/ResistanceInAWireModel' );
  var ResistanceInAWireScreenView = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/ResistanceInAWireScreenView' );
  var Screen = require( 'JOIST/Screen' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function ResistanceInAWireScreen( tandem ) {
    Screen.call( this,
      function() { return new ResistanceInAWireModel( tandem.createTandem( 'resistanceInAWireModel' ) ); },
      function( model ) { return new ResistanceInAWireScreenView( model, tandem.createTandem( 'resistanceInAWireScreenView' ) ); }, {
        backgroundColorProperty: new Property( '#ffffdf' ),
        tandem: tandem
      }
    );
  }

  resistanceInAWire.register( 'ResistanceInAWireScreen', ResistanceInAWireScreen );

  return inherit( Screen, ResistanceInAWireScreen );
} );
