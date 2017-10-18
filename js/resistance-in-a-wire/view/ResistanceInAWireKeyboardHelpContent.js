// Copyright 2017, University of Colorado Boulder

/**
 * Content for the "Hot Keys and Help" dialog that can be brought up from the sim navigation bar.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var Panel = require( 'SUN/Panel' );
  var SliderControlsHelpContent = require( 'SCENERY_PHET/keyboard/help/SliderControlsHelpContent' );
  var GeneralNavigationHelpContent = require( 'SCENERY_PHET/keyboard/help/GeneralNavigationHelpContent' );

  /**
   * Constructor.
   *
   * @param {Tandem} tandem
   * @constructor
   */
  function ResistanceInAWireKeyboardHelpContent( tandem ) {

    var sliderControlsHelpContent = new SliderControlsHelpContent();
    var generalNavigationHelpContent = new GeneralNavigationHelpContent();

    var content = new HBox( {
      children: [ sliderControlsHelpContent, generalNavigationHelpContent ],
      align: 'top',
      spacing: 30
    } );

    Panel.call( this, content, {
      stroke: null,
      fill: 'rgb( 214, 237, 249 )',
      tandem: tandem
    } );
  }

  resistanceInAWire.register( 'ResistanceInAWireKeyboardHelpContent', ResistanceInAWireKeyboardHelpContent );

  return inherit( Panel, ResistanceInAWireKeyboardHelpContent );
} );