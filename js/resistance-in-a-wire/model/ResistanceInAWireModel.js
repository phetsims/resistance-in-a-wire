// Copyright 2013-2017, University of Colorado Boulder

/**
 * Model container for the "resistance-in-a-wire" module.
 *
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 * @author John Blanco (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );

  // constants
  var DEFAULT_RESISTIVITY = 0.5;
  var DEFAULT_LENGTH = 10;
  var DEFAULT_AREA = 7.5;

  /**
   * @constructor
   */
  function ResistanceInAWireModel() {

    this.resistivityProperty = new NumberProperty( DEFAULT_RESISTIVITY );
    this.lengthProperty = new NumberProperty( DEFAULT_LENGTH );
    this.areaProperty = new NumberProperty( DEFAULT_AREA );

    // create a derived property that tracks the total resistance
    this.resistanceProperty = new DerivedProperty( [ this.resistivityProperty, this.lengthProperty, this.areaProperty ],
      function( resistivity, length, area ) {
        return resistivity * length / area;
      }
    );
  }

  resistanceInAWire.register( 'ResistanceInAWireModel', ResistanceInAWireModel );

  return inherit( Object, ResistanceInAWireModel, {
    /**
     * resets the properties of the model
     * @public
     */
    reset: function() {
      this.resistivityProperty.reset();
      this.lengthProperty.reset();
      this.areaProperty.reset();
    }
  } );
} );
