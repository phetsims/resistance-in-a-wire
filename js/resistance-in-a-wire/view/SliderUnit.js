// Copyright 2017-2018, University of Colorado Boulder

/**
 * Slider unit with a vertical slider, a title above the slider and a readout display below the slider. Layout is dynamic
 * based on the center of the slider.
 * @author Martin Veillette (Berea College)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  var RichText = require( 'SCENERY/nodes/RichText' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var VSlider = require( 'SUN/VSlider' );

  /**
   * @param {Property.<number>} property
   * @param {RangeWithValue} range
   * @param {string} symbolString
   * @param {string} nameString
   * @param {string} unitString
   * @param {string} labelContent - a11y, label read by a screen reader
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function SliderUnit( property, range, symbolString, nameString, unitString, labelContent, tandem, options ) {

    Node.call( this );

    options = _.extend( {
      accessibleDecimalPlaces: 2,
      keyboardStep: 1,
      shiftKeyboardStep: 0.01,
      accessibleValuePattern: '{{value}}', // string pattern used for formatting the value read by the screen reader
      endDrag: function() {}, // called at end of drag by HSlider
      startDrag: function() {}
    }, options );

    // text for the symbol, text bounds must be accurate for correct layou
    var symbolText = new Text( symbolString, {
      font: ResistanceInAWireConstants.SYMBOL_FONT,
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH,
      boundsMethod: 'accurate',
      tandem: tandem.createTandem( 'symbolText' )
    } );

    var nameText = new Text( nameString, {
      font: ResistanceInAWireConstants.NAME_FONT,
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH,
      tandem: tandem.createTandem( 'nameText' )
    } );

    // @private
    this.slider = new VSlider( property, range, {
      trackFillEnabled: 'black',
      trackSize: new Dimension2( ResistanceInAWireConstants.SLIDER_HEIGHT - 30, 4 ),
      thumbFillEnabled: '#c3c4c5',
      thumbFillHighlighted: '#dedede',
      tandem: tandem.createTandem( 'slider' ),

      // physical values in this sim can have up to 2 decimals
      constrainValue: function( value ) {
        return Util.toFixedNumber( value, 2 );
      },

      // a11y
      keyboardStep: options.keyboardStep, // delta for keyboard step
      shiftKeyboardStep: options.shiftKeyboardStep, // delta when holding shift
      accessibleValuePattern: options.accessibleValuePattern,
      accessibleDecimalPlaces: options.accessibleDecimalPlaces, // demimal places for readout
      ariaOrientation: 'vertical',
      roundToStepSize: true, // default keyboard step rounds to pedegogically useful values
      startDrag: options.startDrag,
      endDrag: options.endDrag,

      // a11y
      containerTagName: 'li',
      labelContent: labelContent,
      labelTagName: 'label'
    } );

    var valueText = new Text( Util.toFixed( range.max, 2 ), {
      font: ResistanceInAWireConstants.READOUT_FONT,
      fill: ResistanceInAWireConstants.BLACK_COLOR,
      maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH,
      tandem: tandem.createTandem( 'valueText' )
    } );

    var unitText = new RichText( unitString, {
      font: ResistanceInAWireConstants.UNIT_FONT,
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH,
      boundsMethod: 'accurate',
      tandem: tandem.createTandem( 'unitText' )
    } );

    // units text at the bottom, everything stacked on top of it
    unitText.y = 0;
    valueText.centerX = unitText.centerX;

    // value text above unitText
    valueText.y = unitText.y - 35;

    // sliders along the top of values
    this.slider.bottom = valueText.y - 30;
    this.slider.centerX = unitText.centerX;

    // names along the top of the slider
    nameText.y = this.slider.top - 5;
    nameText.centerX = this.slider.centerX;

    // symbol texts along the top
    symbolText.bottom = nameText.y - 20;
    symbolText.centerX = nameText.centerX;

    // Add children, from top to bottom of the slider unit
    this.addChild( symbolText );
    this.addChild( nameText );
    this.addChild( this.slider );
    this.addChild( valueText );
    this.addChild( unitText );

    // Update value of the readout. No need to unlink, present for the lifetime of the simulation.
    property.link( function( value ) {
      valueText.text = Util.toFixed( value, 2 );
      valueText.centerX = unitText.centerX;
    } );

    this.mutate( options );
  }

  resistanceInAWire.register( 'SliderUnit', SliderUnit );

  return inherit( Node, SliderUnit, {

    /**
     * flag indicating whether the slider thumb is being dragged
     * @return {boolean}
     */
    get thumbDragging() {

      // pass the value through from the actual slider component
      return this.slider.thumbDragging;
    }
  } );
} );