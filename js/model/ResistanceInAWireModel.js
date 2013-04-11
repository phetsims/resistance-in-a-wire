// Copyright 2002-2013, University of Colorado
/**
 * Model container for the "resistance-in-a-wire" module.
 */
define( function ( require ) {
  'use strict';

  var Property = require( 'PHETCOMMON/model/property/Property' );

  function ResistanceInAWireModel() {
    var self = this;

    //properties
    self.resistivity = {
      property: new Property( 0.5 ),
      MIN: 0.01,
      MAX: 1,
      acc: 2,
      name: "resistivity"
    };

    self.length = {
      property: new Property( 10 ),
      MIN: 0.1,
      MAX: 20,
      acc: 2,
      name: "length"
    };

    self.area = {
      property: new Property( 7.5 ),
      MIN: 0.01,
      MAX: 15,
      acc: 2,
      name: "area"
    };

    self.props = [self.resistivity, self.length, self.area];


    var init = function () {
      //initialize variables
      self.resistance = {property: new Property()};

      //@overrides set, with accuracy and adds observer - resistance update
      self.props.forEach( function ( entry ) {
        self['oldSet' + entry.name] = entry.property.set;
        entry.property.set = function ( val ) {
          self['oldSet' + entry.name]( round( val, entry.acc ) );
        };
        entry.property.addObserver( updateResistance );
      } );

      self.reset();
    };

    //sets resistance if any props changed
    var updateResistance = function () {
      var val = self.resistivity.property.get() * self.length.property.get() / self.area.property.get();
      self.resistance.property.set( round( val, 2 ) );
    };

    //round val to acc
    var round = function ( val, acc ) {
      var tens = Math.pow( 10, acc );
      return (Math.round( val * tens ) / tens).toFixed( acc );
    };

    init();
  }

  //initialize default values
  ResistanceInAWireModel.prototype.reset = function () {
    var self = this;
    this.props.forEach( function ( entry ) {
      entry.property.reset();
    } );
  };

  return ResistanceInAWireModel;
} );
