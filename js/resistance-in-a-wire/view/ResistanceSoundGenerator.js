// Copyright 2018, University of Colorado Boulder

/**
 * a sound generator used to indicate the resistance level in the RIAW simulation
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  var SoundClip = require( 'TAMBO/sound-generators/SoundClip' );

  // constants
  var BINS_PER_SLIDER = 10;
  var MIN_RESISTANCE = ResistanceInAWireConstants.RESISTANCE_RANGE.min;
  var MAX_RESISTANCE = ResistanceInAWireConstants.RESISTANCE_RANGE.max;
  var MIN_RESISTIVITY = ResistanceInAWireConstants.RESISTIVITY_RANGE.min;
  var MAX_RESISTIVITY = ResistanceInAWireConstants.RESISTIVITY_RANGE.max;
  var MIN_AREA = ResistanceInAWireConstants.AREA_RANGE.min;
  var MAX_AREA = ResistanceInAWireConstants.AREA_RANGE.max;
  var MIN_LENGTH = ResistanceInAWireConstants.LENGTH_RANGE.min;
  var MAX_LENGTH = ResistanceInAWireConstants.LENGTH_RANGE.max;

  // sounds
  var brightMarimbaSound = require( 'sound!TAMBO/bright-marimba.mp3' );

  /**
   * @constructor
   * TODO: document when finalized
   * {Object} config
   */
  function ResistanceSoundGenerator( config ) {

    var self = this;
    SoundClip.call( this, brightMarimbaSound, { initialOutputLevel: 0.5 } );

    // function to map the resistance to a playback speed and play the sound
    function playResistanceSound() {

      if ( !config.resetInProgressProperty.value ) {

        // normalize the resistance value between 0 and 1, taking into account several orders of magnitude
        var normalizedResistance = Math.log( config.resistanceProperty.value / MIN_RESISTANCE ) /
                                   Math.log( MAX_RESISTANCE / MIN_RESISTANCE );

        // map the normalized resistance value to a playback rate for the sound clip
        var playbackRate = Math.pow( 2, ( 1 - normalizedResistance ) * 3 ) / 3;

        self.setPlaybackRate( playbackRate );
        self.play();
      }
    }

    var resistivityBin = -1;
    config.resistivityProperty.lazyLink( function( resistivity ) {
      var proportion = ( resistivity - MIN_RESISTIVITY ) / ( MAX_RESISTIVITY - MIN_RESISTIVITY );
      var bin = Math.floor( proportion * BINS_PER_SLIDER );
      if ( bin !== resistivityBin || resistivity === MIN_RESISTIVITY || resistivity === MAX_RESISTIVITY ) {
        playResistanceSound();
      }
      resistivityBin = bin;
    } );

    var lengthBin = -1;
    config.lengthProperty.lazyLink( function( length ) {
      var proportion = ( length - MIN_LENGTH ) / ( MAX_LENGTH - MIN_LENGTH );
      var bin = Math.floor( proportion * BINS_PER_SLIDER );
      if ( bin !== lengthBin || length === MIN_LENGTH || length === MAX_LENGTH ) {
        playResistanceSound();
      }
      lengthBin = bin;
    } );

    var areaBin = -1;
    config.areaProperty.lazyLink( function( area ) {
      var proportion = ( area - MIN_AREA ) / ( MAX_AREA - MIN_AREA );
      var bin = Math.floor( proportion * BINS_PER_SLIDER );
      if ( bin !== areaBin || area === MIN_AREA || area === MAX_AREA ) {
        playResistanceSound();
      }
      areaBin = bin;
    } );

  }

  resistanceInAWire.register( 'ResistanceSoundGenerator', ResistanceSoundGenerator );

  return inherit( SoundClip, ResistanceSoundGenerator );
} );