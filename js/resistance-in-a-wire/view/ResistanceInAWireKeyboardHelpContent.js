// Copyright 2017-2019, University of Colorado Boulder

/**
 * Content for the "Hot Keys and Help" dialog that can be brought up from the sim navigation bar.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var GeneralKeyboardHelpSection = require( 'SCENERY_PHET/keyboard/help/GeneralKeyboardHelpSection' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var SliderKeyboardHelpSection = require( 'SCENERY_PHET/keyboard/help/SliderKeyboardHelpSection' );

  /**
   * Constructor.
   *
   * @param {Tandem} tandem
   * @constructor
   */
  function ResistanceInAWireKeyboardHelpContent( tandem ) {

    var sliderKeyboardHelpSection = new SliderKeyboardHelpSection();
    var generalNavigationHelpSection = new GeneralKeyboardHelpSection();

    HBox.call( this, {
      children: [ sliderKeyboardHelpSection, generalNavigationHelpSection ],
      align: 'top',
      spacing: 35,
      tandem: tandem
    } );
  }

  resistanceInAWire.register( 'ResistanceInAWireKeyboardHelpContent', ResistanceInAWireKeyboardHelpContent );

  return inherit( HBox, ResistanceInAWireKeyboardHelpContent );
} );