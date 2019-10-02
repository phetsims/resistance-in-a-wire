// Copyright 2017-2019, University of Colorado Boulder

/**
 * Slider unit with a vertical slider, a title above the slider and a readout display below the slider. Layout is dynamic
 * based on the center of the slider.
 * @author Martin Veillette (Berea College)
 */
define( require => {
  'use strict';

  // modules
  const Dimension2 = require( 'DOT/Dimension2' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  const ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );
  const VSlider = require( 'SUN/VSlider' );

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

    const self = this;
    Node.call( this );

    options = _.extend( {
      a11yMapValue: value => Util.toFixedNumber( value, 2 ),
      keyboardStep: 1,
      shiftKeyboardStep: 0.01,
      startDrag: _.noop,
      endDrag: _.noop
    }, options );

    // text for the symbol, text bounds must be accurate for correct layou
    const symbolText = new Text( symbolString, {
      font: ResistanceInAWireConstants.SYMBOL_FONT,
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH,
      boundsMethod: 'accurate',
      tandem: tandem.createTandem( 'symbolText' )
    } );

    const nameText = new Text( nameString, {
      font: ResistanceInAWireConstants.NAME_FONT,
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH,
      tandem: tandem.createTandem( 'nameText' )
    } );

    // @public (read-only) {boolean} - flag that indicates whether the slider is being dragged by the keyboard
    this.keyboardDragging = false;

    // @private
    const slider = new VSlider( property, range, {
      trackFillEnabled: 'black',
      trackSize: new Dimension2( ResistanceInAWireConstants.SLIDER_HEIGHT - 30, 4 ),
      thumbSize: new Dimension2( 22, 45 ),
      thumbFill: '#c3c4c5',
      thumbFillHighlighted: '#dedede',
      tandem: tandem.createTandem( 'slider' ),
      startDrag: function( event ) {
        if ( event.type === 'keydown' ) {
          self.keyboardDragging = true;
        }
        options.startDrag && options.startDrag( event );
      },
      endDrag: function( event ) {
        self.keyboardDragging = false;
        options.endDrag && options.endDrag( event );
      },

      // physical values in this sim can have up to 2 decimals
      constrainValue: function( value ) {
        return Util.toFixedNumber( value, 2 );
      },

      // a11y
      keyboardStep: options.keyboardStep, // delta for keyboard step
      shiftKeyboardStep: options.shiftKeyboardStep, // delta when holding shift
      a11yCreateAriaValueText: options.a11yCreateAriaValueText,
      a11yMapValue: options.a11yMapValue,
      roundToStepSize: true, // default keyboard step rounds to pedegogically useful values

      // a11y
      containerTagName: 'li',
      labelContent: labelContent,
      labelTagName: 'label'
    } );

    const valueText = new Text( Util.toFixed( range.max, 2 ), {
      font: ResistanceInAWireConstants.READOUT_FONT,
      fill: ResistanceInAWireConstants.BLACK_COLOR,
      maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH,
      tandem: tandem.createTandem( 'valueText' )
    } );

    const unitText = new RichText( unitString, {
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
    slider.bottom = valueText.y - 30;
    slider.centerX = unitText.centerX;

    // names along the top of the slider
    nameText.y = slider.top - 5;
    nameText.centerX = slider.centerX;

    // symbol texts along the top
    symbolText.bottom = nameText.y - 20;
    symbolText.centerX = nameText.centerX;

    // Add children, from top to bottom of the slider unit
    this.addChild( symbolText );
    this.addChild( nameText );
    this.addChild( slider );
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

  return inherit( Node, SliderUnit );
} );