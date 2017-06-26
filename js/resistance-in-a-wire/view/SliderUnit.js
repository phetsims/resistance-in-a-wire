// Copyright 2016-2017, University of Colorado Boulder

/**
 * Slider unit with a vertical slider, a title above the slider and a readout display below the slider.
 * @author Martin Veillette (Berea College)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var HSlider = require( 'SUN/HSlider' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  var RichText = require( 'SCENERY_PHET/RichText' );

  // images
  var thumbImage = require( 'image!RESISTANCE_IN_A_WIRE/thumb.png' );

  // constants
  var MAX_TEXT_WIDTH = ResistanceInAWireConstants.SLIDERS_HORIZONTAL_SEPARATION * 0.90; // Max text width for labels

  /**
   * @param {Property.<number>} property
   * @param {RangeWithValue} range
   * @param {string} symbolString
   * @param {string} nameString
   * @param {string} unitString
   * @param {Tandem} tandem
   * @constructor
   */
  function SliderUnit( property, range, symbolString, nameString, unitString, tandem, options ) {

    options = _.extend( {
      numberDecimalPlaces: 2,
      keyboardStep: 1
    }, options );

    // Positions for vertical alignment
    var symbolStringCenterY = ResistanceInAWireConstants.SLIDER_UNIT_VERTICAL_OFFSET;
    var nameTop = symbolStringCenterY + 40;
    var valueTextTop = nameTop + ResistanceInAWireConstants.SLIDER_HEIGHT + 40;
    var unitBottom = valueTextTop + 65;
    var sliderCenterY = (valueTextTop + nameTop) / 2;

    var symbolText = new Text( symbolString, {
      font: ResistanceInAWireConstants.SYMBOL_FONT,
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: 0,
      centerY: symbolStringCenterY,
      maxWidth: MAX_TEXT_WIDTH,
      tandem: tandem.createTandem( 'symbolText' )
    } );

    var nameText = new Text( nameString, {
      font: ResistanceInAWireConstants.NAME_FONT,
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: 0,
      top: nameTop,
      maxWidth: MAX_TEXT_WIDTH,
      tandem: tandem.createTandem( 'nameText' )
    } );

    // Thumb for the slider
    var thumb = new Image( thumbImage, { rotation: Math.PI / 2, tandem: tandem.createTandem( 'thumb' ) } );
    thumb.scale( ResistanceInAWireConstants.THUMB_HEIGHT / thumb.height );
    thumb.touchArea = thumb.localBounds.dilated( 30 );

    var slider = new HSlider( property, range, {
      trackFillEnabled: 'black',
      rotation: -Math.PI / 2,
      trackSize: new Dimension2( ResistanceInAWireConstants.SLIDER_HEIGHT - 2 * thumb.height, 4 ),
      thumbNode: thumb,
      x: 0,
      centerY: sliderCenterY,
      tandem: tandem.createTandem( 'slider' ),
      numberDecimalPlaces: options.numberDecimalPlaces,
      keyboardStep: options.keyboardStep,
      modifiedKeyboardStep: options.modifiedKeyboardStep
    } );

    var valueText = new Text( Util.toFixed( property.value, 2 ), {
      font: ResistanceInAWireConstants.READOUT_FONT,
      fill: ResistanceInAWireConstants.BLACK_COLOR,
      centerX: 0,
      top: valueTextTop,
      tandem: tandem.createTandem( 'valueText' )
    } );

    var unitText = new RichText( unitString, {
      font: ResistanceInAWireConstants.UNIT_FONT,
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      centerX: 0,
      bottom: unitBottom,
      maxWidth: MAX_TEXT_WIDTH,
      tandem: tandem.createTandem( 'unitText' )
    } );

    Node.call( this, {
      children: [
        symbolText, nameText, slider, valueText, unitText
      ],
      tandem: tandem
    } );

    // Update value of the readout. No need to unlink, present for the lifetime of the simulation.
    property.link( function( value ) {
      valueText.text = Util.toFixed( value, 2 );
      valueText.centerX = 0;
    } );
  }

  resistanceInAWire.register( 'SliderUnit', SliderUnit );

  return inherit( Node, SliderUnit );
} );