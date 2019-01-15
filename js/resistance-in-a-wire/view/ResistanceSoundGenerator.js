// Copyright 2018, University of Colorado Boulder

/**
 * A sound generator used to indicate the resistance level in the RIAW simulation.  This uses the values for the
 * resistivity, length, and area of the wire to decide WHEN to generate a sound, and the value of the resistance to
 * determine the nature of the sound to be generated.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Range = require( 'DOT/Range' );
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
  var brightMarimbaSound = require( 'sound!TAMBO/bright-marimba-short.mp3' );

  /**
   * @constructor
   * {Object} config - a configuration object that includes property values for the resistivity, area, and length of
   * the wire and the sliders that control each, as well as a property the indicates whether a reset is in progress.
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

    // @private - objects that monitor the parameter and play the sound, references kept for debugging and clarity
    var resistivityMonitor = new ParameterMonitor(
      config.resistivityProperty,
      config.resistivitySlider,
      new Range( MIN_RESISTIVITY, MAX_RESISTIVITY ),
      playResistanceSound
    );
    var lengthMonitor = new ParameterMonitor(
      config.lengthProperty,
      config.lengthSlider,
      new Range( MIN_LENGTH, MAX_LENGTH ),
      playResistanceSound
    );
    var areaMonitor = new ParameterMonitor(
      config.areaProperty,
      config.areaSlider,
      new Range( MIN_AREA, MAX_AREA ),
      playResistanceSound
    );

    this.disposeResistanceSoundGenerator = function() {
      resistivityMonitor.dispose();
      lengthMonitor.dispose();
      areaMonitor.dispose();
    };
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
     * @returns {number}
     */
    selectBin: function( value ) {
      assert && assert( value <= this.maxValue );
      assert && assert( value >= this.minValue );

      // this calculation means that values on the boundaries will go into the higher bin except for the max value
      var proportion = ( value - this.minValue ) / ( this.span );
      return Math.min( Math.floor( proportion * this.numBins ), this.numBins - 1 );
    }
  } );

  /**
   * inner type for monitoring a parameter a playing a sound when warranted
   * @param {NumberProperty} valueProperty - the value of the parameter, enclosed in an Axon Property
   * @param {SliderUnit} sliderUnit - the slider unit that controls the parameter's value
   * @param {Range} parameterRange - the range of values that the parameter can take on
   * @param {function} generateSound - function that will be called to generate the sound
   * @constructor
   */
  function ParameterMonitor( valueProperty, sliderUnit, parameterRange, generateSound ) {
    var binSelector = new BinSelector( parameterRange.min, parameterRange.max, BINS_PER_SLIDER );
    var selectedBin = binSelector.selectBin( valueProperty.value );

    // @private - for dispose
    this.valueProperty = valueProperty;

    // @private - for dispose
    this.valuePropertyListener = function( parameterValue ) {
      var bin = binSelector.selectBin( parameterValue );

      // Play the sound if a change has occurred due to keyboard interaction, if the area value has moved to a new bin,
      // or if a min or max has been reached.
      if ( sliderUnit.keyboardDragging || bin !== selectedBin ||
           parameterValue === parameterRange.min || parameterValue === parameterRange.max ) {
        generateSound();
      }
      selectedBin = bin;
    };

    // hook up the listener
    valueProperty.lazyLink( this.valuePropertyListener );
  }

  inherit( Object, ParameterMonitor, {

    /**
     * dispose
     * @public
     */
    dispose: function() {
      this.valueProperty.unlink( this.valuePropertyListener );
    }
  } );

  resistanceInAWire.register( 'ResistanceSoundGenerator', ResistanceSoundGenerator );

  return inherit( SoundClip, ResistanceSoundGenerator, {

    dispose: function() {
      this.disposeResistanceSoundGenerator();
    }
  } );
} );
