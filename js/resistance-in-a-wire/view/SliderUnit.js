// Copyright 2017-2020, University of Colorado Boulder

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
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  const ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Utils = require( 'DOT/Utils' );
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

    options = merge( {
      sliderOptions: {
        trackFillEnabled: 'black',
        trackSize: new Dimension2( 4, ResistanceInAWireConstants.SLIDER_HEIGHT - 30 ),
        thumbSize: new Dimension2( 45, 22 ),
        thumbFill: '#c3c4c5',
        thumbFillHighlighted: '#dedede',

        // physical values in this sim can have up to 2 decimals
        constrainValue: function( value ) {
          return Utils.toFixedNumber( value, 2 );
        },
        startDrag: _.noop,
        endDrag: _.noop,

        // a11y
        keyboardStep: 1, // delta for keyboard step
        shiftKeyboardStep: 0.01, // delta when holding shift
        roundToStepSize: true, // default keyboard step rounds to pedagogically useful values
        containerTagName: 'li',
        labelContent: labelContent,
        labelTagName: 'label',
        a11yMapValue: value => Utils.toFixedNumber( value, 2 ),

        // phet-io
        tandem: tandem.createTandem( 'slider' )
      },

      // {number}
      decimalPlaces: 0

    }, options );

    // override the start and end drag functions in the options
    const providedStartDragFunction = options.sliderOptions.startDrag;
    options.sliderOptions.startDrag = function( event ) {
      if ( event.type === 'keydown' ) {
        self.keyboardDragging = true;
      }
      providedStartDragFunction && providedStartDragFunction();
    };
    const providedEndDragFunction = options.sliderOptions.endDrag;
    options.sliderOptions.endDrag = function() {
      self.keyboardDragging = false;
      providedEndDragFunction && providedEndDragFunction();
    };

    // text for the symbol, text bounds must be accurate for correct layout
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
    const slider = new VSlider( property, range, options.sliderOptions );

    const valueText = new Text( Utils.toFixed( range.max, 2 ), {
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
      valueText.text = Utils.toFixed( value, 2 );
      valueText.centerX = unitText.centerX;
    } );

    this.mutate( options );
  }

  resistanceInAWire.register( 'SliderUnit', SliderUnit );

  return inherit( Node, SliderUnit );
} );