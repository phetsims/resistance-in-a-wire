// Copyright 2013-2017, University of Colorado Boulder

/**
 * Model which includes resistivity, length, area and resistance.
 *
 * @author Vasily Shakhov (Mlearner)
 * @author John Blanco (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );

  // phet-io modules
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function ResistanceInAWireModel( tandem ) {

    // @public {Property.<number>} in Ohm*cm
    this.resistivityProperty = new NumberProperty( ResistanceInAWireConstants.RESISTIVITY_RANGE.defaultValue, {
      tandem: tandem.createTandem( 'resistivityProperty' ),
      phetioValueType: TNumber( {
        units: 'ohm-centimeters',
        range: ResistanceInAWireConstants.RESISTIVITY_RANGE
      } )
    } );

    // @public {Property.<number>} in cm
    this.lengthProperty = new NumberProperty( ResistanceInAWireConstants.LENGTH_RANGE.defaultValue, {
      tandem: tandem.createTandem( 'lengthProperty' ),
      phetioValueType: TNumber( {
        units: 'centimeters',
        range: ResistanceInAWireConstants.LENGTH_RANGE
      } )
    } );

    // @public {Property.<number>} in cm^2
    this.areaProperty = new NumberProperty( ResistanceInAWireConstants.AREA_RANGE.defaultValue, {
      tandem: tandem.createTandem( 'areaProperty' ),
      phetioValueType: TNumber( {
        units: 'centimeters-squared',
        range: ResistanceInAWireConstants.AREA_RANGE
      } )
    } );

    // Derived property that tracks the resistance of the wire
    // @public {Property.<number>} in Ohms
    this.resistanceProperty = new DerivedProperty( [ this.resistivityProperty, this.lengthProperty, this.areaProperty ],
      function( resistivity, length, area ) {
        return resistivity * length / area;
      }, {
        tandem: tandem.createTandem( 'resistanceProperty' ),
        phetioValueType: TNumber( { units: 'ohms' } )
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