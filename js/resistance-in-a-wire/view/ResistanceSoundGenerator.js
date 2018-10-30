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
  var BINS_PER_SLIDER = 9; // odd numbers generally work best because a bin then spans the middle initial value
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

    // add sound for the resistivity slider
    var resistivityBinSelector = new BinSelector( MIN_RESISTIVITY, MAX_RESISTIVITY, BINS_PER_SLIDER );
    var resistivityBin = resistivityBinSelector.selectBin( config.resistivityProperty.value );
    config.resistivityProperty.lazyLink( function( resistivity ) {
      var bin = resistivityBinSelector.selectBin( resistivity );

      // Play the sound if a change has occurred due to keyboard interaction, if the area value has moved to a new bin,
      // or if a min or max has been reached.
      if ( !config.resistivitySlider.thumbDragging || bin !== resistivityBin ||
           resistivity === MIN_RESISTIVITY || resistivity === MAX_RESISTIVITY ) {
        playResistanceSound();
      }
      resistivityBin = bin;
    } );

    // add sound for the length slider
    var lengthBinSelector = new BinSelector( MIN_LENGTH, MAX_LENGTH, BINS_PER_SLIDER );
    var lengthBin = lengthBinSelector.selectBin( config.lengthProperty.value );
    config.lengthProperty.lazyLink( function( length ) {
      var bin = lengthBinSelector.selectBin( length );

      // Play the sound if a change has occurred due to keyboard interaction, if the area value has moved to a new bin,
      // or if a min or max has been reached.
      if ( !config.lengthSlider.thumbDragging || bin !== lengthBin ||
           length === MIN_LENGTH || length === MAX_LENGTH ) {
        playResistanceSound();
      }
      lengthBin = bin;
    } );

    // add sound for the area slider
    var areaBinSelector = new BinSelector( MIN_AREA, MAX_AREA, BINS_PER_SLIDER );
    var areaBin = areaBinSelector.selectBin( config.areaProperty.value );
    config.areaProperty.lazyLink( function( area ) {
      var bin = areaBinSelector.selectBin( area );

      // Play the sound if a change has occurred due to keyboard interaction, if the area value has moved to a new bin,
      // or if a min or max has been reached.
      if ( !config.areaSlider.thumbDragging || bin !== areaBin ||
           area === MIN_AREA || area === MAX_AREA ) {
        playResistanceSound();
      }
      areaBin = bin;
    } );

  }

  /**
   * inner type for placing values in a bin
   * @param {number} minValue
   * @param {number} maxValue
   * @param {number} numBins
   * @constructor
   */
  function BinSelector( minValue, maxValue, numBins ) {

    // parameter checking
    assert && assert( maxValue > minValue );
    assert && assert( numBins > 0 );

    // @private
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.span = this.maxValue - this.minValue;
    this.numBins = numBins;

  }

  inherit( Object, BinSelector, {

    /**
     * put the provided value in a bin
     * @param value
     * @return {number}
     */
    selectBin: function( value ) {
      assert && assert( value <= this.maxValue );
      assert && assert( value >= this.minValue );

      // this calculation means that values on the boundaries will go into the higher bin except for the max value
      var proportion = ( value - this.minValue ) / ( this.span );
      return Math.min( Math.floor( proportion * this.numBins ), this.numBins - 1 );
    }
  } );

  resistanceInAWire.register( 'ResistanceSoundGenerator', ResistanceSoundGenerator );

  return inherit( SoundClip, ResistanceSoundGenerator );
} );
