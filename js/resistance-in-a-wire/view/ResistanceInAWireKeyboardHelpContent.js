// Copyright 2017-2019, University of Colorado Boulder

/**
 * Content for the "Hot Keys and Help" dialog that can be brought up from the sim navigation bar.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const GeneralKeyboardHelpSection = require( 'SCENERY_PHET/keyboard/help/GeneralKeyboardHelpSection' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  const SliderKeyboardHelpSection = require( 'SCENERY_PHET/keyboard/help/SliderKeyboardHelpSection' );

  class ResistanceInAWireKeyboardHelpContent extends HBox {
    
    /**
     * Constructor.
     *
     * @param {Tandem} tandem
     * @constructor
     */
    constructor( tandem ) {
      const sliderKeyboardHelpSection = new SliderKeyboardHelpSection();
      const generalNavigationHelpSection = new GeneralKeyboardHelpSection();

      super( {
        children: [ sliderKeyboardHelpSection, generalNavigationHelpSection ],
        align: 'top',
        spacing: 35,
        tandem: tandem
      } );
    }
  }

  return resistanceInAWire.register( 'ResistanceInAWireKeyboardHelpContent', ResistanceInAWireKeyboardHelpContent );
} );