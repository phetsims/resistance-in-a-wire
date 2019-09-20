// Copyright 2016-2019, University of Colorado Boulder

/**
 * The main screen class for the 'Resistance in a Wire' simulation.  This is where the main model and view instances are
 * created and inserted into the framework.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const Property = require( 'AXON/Property' );
  const resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  const ResistanceInAWireModel = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/model/ResistanceInAWireModel' );
  const ResistanceInAWireScreenView = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/ResistanceInAWireScreenView' );
  const Screen = require( 'JOIST/Screen' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function ResistanceInAWireScreen( tandem ) {
    Screen.call( this,
      function() { return new ResistanceInAWireModel( tandem.createTandem( 'model' ) ); },
      function( model ) { return new ResistanceInAWireScreenView( model, tandem.createTandem( 'view' ) ); }, {
        backgroundColorProperty: new Property( '#ffffdf' ),
        tandem: tandem
      }
    );
  }

  resistanceInAWire.register( 'ResistanceInAWireScreen', ResistanceInAWireScreen );

  return inherit( Screen, ResistanceInAWireScreen );
} );
