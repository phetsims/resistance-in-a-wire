// Copyright 2016-2017, University of Colorado Boulder

/**
 * Slider unit with a vertical slider, a title above the slider and a readout display below the slider. Layout is dynamic
 * based on the center of the slider.
 * @author Martin Veillette (Berea College)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  var RichText = require( 'SCENERY/nodes/RichText' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  /**
   * @param {Property.<number>} property
   * @param {RangeWithValue} range
   * @param {string} symbolString
   * @param {string} nameString
   * @param {string} unitString
   * @param {Tandem} tandem
   * @param {object} options
   * @constructor
   */
  function SliderUnit( property, range, symbolString, nameString, unitString, accessibleLabel, tandem, options ) {

    Node.call( this );

    options = _.extend( {
      accessibleDecimalPlaces: 2,
      keyboardStep: 1,
      shiftKeyboardStep: 0.01,
      accessibleValuePattern: '{{value}}' // string pattern used for formating the value read by the screen reader
    }, options );

    var symbolText = new Text( symbolString, {
      font: ResistanceInAWireConstants.SYMBOL_FONT,
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH,
      centerX: 0,
      tandem: tandem.createTandem( 'symbolText' )
    } );

    var nameText = new Text( nameString, {
      font: ResistanceInAWireConstants.NAME_FONT,
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: 0,
      maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH,
      tandem: tandem.createTandem( 'nameText' )
    } );

    var slider = new HSlider( property, range, {
      trackFillEnabled: 'black',
      rotation: -Math.PI / 2,
      trackSize: new Dimension2( ResistanceInAWireConstants.SLIDER_HEIGHT - 30, 4 ),
      thumbFillEnabled: '#c3c4c5',
      thumbFillHighlighted: '#dedede',
      centerX: 0,
      tandem: tandem.createTandem( 'slider' ),

      // a11y
      keyboardStep: options.keyboardStep, // delta for keyboard step
      shiftKeyboardStep: options.shiftKeyboardStep, // delta when holding shift
      accessibleValuePattern: options.accessibleValuePattern,
      accessibleDecimalPlaces: options.accessibleDecimalPlaces, // demimal places for readout

      parentContainerTagName: 'li',
      labelTagName: 'label',
      accessibleLabel: accessibleLabel,
      prependLabels: true
    } );

    var valueText = new Text( Util.toFixed( range.max, 2 ), {
      font: ResistanceInAWireConstants.READOUT_FONT,
      fill: ResistanceInAWireConstants.BLACK_COLOR,
      centerX: 0,
      maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH,
      tandem: tandem.createTandem( 'valueText' )
    } );

    var valueTextBackground = Rectangle.bounds( valueText.bounds, {
      children: [ valueText ]
    } );

    var unitText = new RichText( unitString, {
      font: ResistanceInAWireConstants.UNIT_FONT,
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: 0,
      maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH,
      tandem: tandem.createTandem( 'unitText' )
    } );


    // Layout
    // Don't use centerY because the super text in units will cause problems, empirically determined
    symbolText.bottom = slider.centerY - slider.height / 2 - 30;
    nameText.bottom = slider.centerY - slider.height / 2 - 10;
    valueTextBackground.bottom = slider.centerY + slider.height / 2 + 35;
    unitText.bottom = slider.centerY + slider.height / 2 + 70;

    // Add children, from top to bottom of the slider unit
    this.addChild( symbolText );
    this.addChild( nameText );
    this.addChild( slider );
    this.addChild( valueTextBackground );
    this.addChild( unitText );

    // Update value of the readout. No need to unlink, present for the lifetime of the simulation.
    property.link( function( value ) {
      valueText.text = Util.toFixed( value, 2 );
      valueText.centerX = 0;
    } );

    this.mutate( options );
  }

  resistanceInAWire.register( 'SliderUnit', SliderUnit );

  return inherit( Node, SliderUnit );
} );