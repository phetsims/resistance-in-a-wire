// Copyright 2013-2017, University of Colorado Boulder

/**
 * Model which includes resistivity, length, area and resistance.
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
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );

  // phet-io modules
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function ResistanceInAWireModel( tandem ) {

    // @public {Property.<number>} in Ohm*cm
    this.resistivityProperty = new NumberProperty( ResistanceInAWireConstants.RESISTIVITY_RANGE.getDefaultValue(), {
      tandem: tandem.createTandem( 'resistivityProperty' ),
      phetioValueType: TNumber( {
        type: 'FloatingPoint',
        units: 'ohm-centimeters',
        range: ResistanceInAWireConstants.RESISTIVITY_RANGE
      } )
    } );

    // @public {Property.<number>} in cm
    this.lengthProperty = new NumberProperty( ResistanceInAWireConstants.LENGTH_RANGE.getDefaultValue(), {
      tandem: tandem.createTandem( 'lengthProperty' ),
      phetioValueType: TNumber( {
        type: 'FloatingPoint',
        units: 'centimeters',
        range: ResistanceInAWireConstants.LENGTH_RANGE
      } )
    } );

    // @public {Property.<number>} in cm^2
    this.areaProperty = new NumberProperty( ResistanceInAWireConstants.AREA_RANGE.getDefaultValue(), {
      tandem: tandem.createTandem( 'areaProperty' ),
      phetioValueType: TNumber( {
        type: 'FloatingPoint',
        units: 'centimeters-squared',
        range: ResistanceInAWireConstants.AREA_RANGE
      } )
    } );

    // create a derived property that tracks the resistance of the wire
    // @public {Property.<number>} in Ohms
    this.resistanceProperty = new DerivedProperty( [ this.resistivityProperty, this.lengthProperty, this.areaProperty ],
      function( resistivity, length, area ) {
        return resistivity * length / area;
      }, {
        tandem: tandem.createTandem( 'resistanceProperty' ),
        phetioValueType: TNumber( { type: 'FloatingPoint', units: 'ohms' } )
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