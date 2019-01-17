// Copyright 2017-2018, University of Colorado Boulder

/**
 * Content for the "Hot Keys and Help" dialog that can be brought up from the sim navigation bar.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var GeneralNavigationHelpContent = require( 'SCENERY_PHET/keyboard/help/GeneralNavigationHelpContent' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var SliderControlsHelpContent = require( 'SCENERY_PHET/keyboard/help/SliderControlsHelpContent' );

  // constants
  var LABEL_MAX_WIDTH = 150; // i18n, for inspection so that the help contents fits side by side

  /**
   * Constructor.
   *
   * @param {Tandem} tandem
   * @constructor
   */
  function ResistanceInAWireKeyboardHelpContent( tandem ) {

    var sliderControlsHelpContent = new SliderControlsHelpContent( {
      labelOptions: {
        maxWidth: LABEL_MAX_WIDTH
      }
    } );
    var generalNavigationHelpContent = new GeneralNavigationHelpContent( {
      labelOptions: {
        maxWidth: LABEL_MAX_WIDTH
      }
    } );

    HBox.call( this, {
      children: [ sliderControlsHelpContent, generalNavigationHelpContent ],
      align: 'top',
      spacing: 35,
      tandem: tandem
    } );
  }

  resistanceInAWire.register( 'ResistanceInAWireKeyboardHelpContent', ResistanceInAWireKeyboardHelpContent );

  return inherit( HBox, ResistanceInAWireKeyboardHelpContent );
} );