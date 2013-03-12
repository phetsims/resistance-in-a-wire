// Copyright 2002-2013, University of Colorado
/**
 * Model container for the "OhmsLaw" module.
 */
define(
  [
    '../../common/phetcommon/js/model/property/Property'
  ],
  function ( Property ) {
    'use strict';
    function ResistanceInAWireModel() {
      var self = this;

      //properties
      var props = [
        {
          name: 'resistivity',
          MIN: 0.01,
          MAX: 1,
          acc: 2,
          DEFAULT: 0.5
        },
        {
          name: 'length',
          MIN: 0.1,
          MAX: 20,
          acc: 1,
          DEFAULT: 10
        },
        {
          name: 'area',
          MIN: 0.01,
          MAX: 15,
          acc: 2,
          DEFAULT: 7.5
        }
      ];

      this.init = function () {
        //initialize all variables
        props.forEach( function ( entry ) {
          self[entry.name] = new Property();
          self[entry.name].MIN = entry.MIN;
          self[entry.name].MAX = entry.MAX;
        } );
        this.resistance = new Property();

        //@overrides set, with accuracy and adds observer - resistance update
        props.forEach( function ( entry ) {
          self['oldSet' + entry.name] = self[entry.name].set;
          self[entry.name].set = function ( val ) {
            self['oldSet' + entry.name]( setAccuracy( val, entry.acc ) );
          };
          self[entry.name].addObserver( updateResistance );
        } );

        this.setDefault();
      };

      //initialize default values
      this.setDefault = function () {
        props.forEach( function ( entry ) {
          self[entry.name].set( entry.DEFAULT );
        } );
      };

      //sets resistance if any props changed
      var updateResistance = function () {
        var val = self.resistivity.get() * self.length.get() / self.area.get();
        self.resistance.set( setAccuracy( val, 2 ) );
      };

      //round val to acc
      var setAccuracy = function ( val, acc ) {
        var tens = Math.pow( 10, acc );
        return (Math.round( val * tens ) / tens).toFixed( acc );
      };

      this.init();
    }

    return ResistanceInAWireModel;
  } );
