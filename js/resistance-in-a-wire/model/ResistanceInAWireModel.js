// Copyright 2013-2015, University of Colorado Boulder

/**
 * Model container for the "resistance-in-a-wire" module.
 *
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   */
  function ResistanceInAWireModel() {

    var thisModel = this;

    PropertySet.call( this, {
      resistance: 0,
      resistivity: 0.5,
      length: 10,
      area: 7.5
    } );

    var updateResistance = function() {
      thisModel.resistance = (thisModel.resistivity * thisModel.length / thisModel.area);
    };
    this.resistivityProperty.link( updateResistance ); // @public
    this.lengthProperty.link( updateResistance ); // @public
    this.areaProperty.link( updateResistance ); // @public

    this.reset();
  }

  return inherit( PropertySet, ResistanceInAWireModel, {

    // @public
    step: function() { },

    // @public
    reset: function() {
      this.resistivityProperty.reset();
      this.lengthProperty.reset();
      this.areaProperty.reset();
    }
  } );
} );
