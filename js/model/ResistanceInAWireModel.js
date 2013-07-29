// Copyright 2002-2013, University of Colorado Boulder
/**
 * Model container for the "resistance-in-a-wire" module.
 *
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );

  function ResistanceInAWireModel( width, height ) {
    var thisModel = this;
    this.DEFAULTWIDTH = width;
    this.DEFAULTHEIGHT = height;
    this.RESISTYVITYMAX = 1;
    this.RESISTYVITYMIN = 0.01;
    this.RESISTYVITYDEFAULT = 0.5;
    this.LENGTHMAX = 20;
    this.LENGTHMIN = 0.1;
    this.LENGTHDEFAULT = 10;
    this.AREAMAX = 15;
    this.AREAMIN = 0.01;
    this.AREADEFAULT = 7.5;

    PropertySet.call( this, {
      resistance: 0,
      resistivity: thisModel.RESISTYVITYDEFAULT,
      length: thisModel.LENGTHDEFAULT,
      area: thisModel.AREADEFAULT
    } );

    //@override resistivity.set (accuracy 0.01)
    var oldRS = this.resistivityProperty.set.bind( this.resistivityProperty );
    this.resistivityProperty.set = function( val ) {
      oldRS( Math.round( val * 100 ) / 100 );
    };

    //@override length.set (accuracy 0.01)
    var oldLS = this.lengthProperty.set.bind( this.lengthProperty );
    this.lengthProperty.set = function( val ) {
      oldLS( Math.round( val * 100 ) / 100 );
    };

    //@override area.set (accuracy 0.01)
    var oldAS = this.areaProperty.set.bind( this.areaProperty );
    this.areaProperty.set = function( val ) {
      oldAS( Math.round( val * 100 ) / 100 );
    };

    var updateResistance = function() {
      thisModel.resistance = Math.round( (thisModel.resistivity * thisModel.length / thisModel.area) * 100 ) / 100;
    };
    this.resistivityProperty.link( updateResistance );
    this.lengthProperty.link( updateResistance );
    this.areaProperty.link( updateResistance );

    this.reset();
  }

  inherit( PropertySet, ResistanceInAWireModel, {
    step: function() { },
    reset: function() {
      this.resistivity = this.RESISTYVITYDEFAULT;
      this.length = this.LENGTHDEFAULT;
      this.area = this.AREADEFAULT;
    }
  } );

  return ResistanceInAWireModel;
} );
