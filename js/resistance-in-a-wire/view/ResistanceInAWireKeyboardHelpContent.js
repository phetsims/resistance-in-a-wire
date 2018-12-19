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

  /**
   * Constructor.
   *
   * @param {Tandem} tandem
   * @constructor
   */
  function ResistanceInAWireKeyboardHelpContent( tandem ) {

    var sliderControlsHelpContent = new SliderControlsHelpContent();
    var generalNavigationHelpContent = new GeneralNavigationHelpContent();

    HBox.call( this, {
      children: [ sliderControlsHelpContent, generalNavigationHelpContent ],
      align: 'top',
      spacing: 35,

      // empirically determined to have some margin relative to max width
      // TODO: We may limit content width in the dialog itself, see https://github.com/phetsims/joist/issues/546
      // TODO: If we proceed with that issue, this line could be removed
      maxWidth: 650,
      tandem: tandem
    } );
  }

  resistanceInAWire.register( 'ResistanceInAWireKeyboardHelpContent', ResistanceInAWireKeyboardHelpContent );

  return inherit( HBox, ResistanceInAWireKeyboardHelpContent );
} );