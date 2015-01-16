// Copyright 2002-2013, University of Colorado Boulder

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
    this.resistivityProperty.link( updateResistance );
    this.lengthProperty.link( updateResistance );
    this.areaProperty.link( updateResistance );

    this.reset();
  }

  inherit( PropertySet, ResistanceInAWireModel, {
    step: function() { },
    reset: function() {
      this.resistivityProperty.reset();
      this.lengthProperty.reset();
      this.areaProperty.reset();
    }
  } );

  return ResistanceInAWireModel;
} );
