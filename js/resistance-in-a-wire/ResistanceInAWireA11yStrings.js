// Copyright 2017, University of Colorado Boulder

/**
 * Single location of all accessibility strings.  These strings are not meant to be translatable yet.  Rosetta needs
 * some work to provide translators with context for these strings, and we want to receive some community feedback
 * before these strings are submitted for translation.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );

  var hotKeysAndHelpString = require( 'string!RESISTANCE_IN_A_WIRE/hotKeysAndHelp' );
  var orString = require( 'string!RESISTANCE_IN_A_WIRE/or' );
  var shiftKeyString = require( 'string!RESISTANCE_IN_A_WIRE/shiftKey' );
  var shiftTabKeyDescriptionString = require( 'string!RESISTANCE_IN_A_WIRE/shiftTabKeyDescription' );
  var tabKeyDescriptionString = require( 'string!RESISTANCE_IN_A_WIRE/tabKeyDescription' );
  var tabKeyString = require( 'string!RESISTANCE_IN_A_WIRE/tabKey' );
  var arrowKeysAdjustSlidersString = require( 'string!RESISTANCE_IN_A_WIRE/arrowKeysAdjustSliders' );
  var shiftArrowKeysSlidersString = require( 'string!RESISTANCE_IN_A_WIRE/shiftArrowKeysSliders' );
  var pageUpPageDownSlidersString = require( 'string!RESISTANCE_IN_A_WIRE/pageUpPageDownSliders' );
  var homeEndSlidersString = require( 'string!RESISTANCE_IN_A_WIRE/homeEndSliders' );
  var escapeKeyDescriptionString = require( 'string!RESISTANCE_IN_A_WIRE/escapeKeyDescription' );
  var sliderControlsString = require( 'string!RESISTANCE_IN_A_WIRE/sliderControls' ); 
  var generalNavigationString = require( 'string!RESISTANCE_IN_A_WIRE/generalNavigation' ); 

  var ResistanceInAWireA11yStrings = {
    resistivityUnitsPatternString: '{{value}} ohm centimeters',
    lengthUnitsPatternString: '{{value}} centimeters',
    areaUnitsPatternString: '{{value}} centimeters squared',
    resistivitySliderLabelString: 'rho, Resistivity',
    lengthSliderLabelString: 'L, Length',
    areaSliderLabelString: 'A, Area',

    // keyboard help strings
    hotKeysAndHelpString: hotKeysAndHelpString,
    orString: orString,
    shiftKeyString: shiftKeyString,
    shiftTabKeyDescriptionString: shiftTabKeyDescriptionString,
    tabKeyDescriptionString: tabKeyDescriptionString,
    tabKeyString: tabKeyString,
    arrowKeysAdjustSlidersString: arrowKeysAdjustSlidersString,
    shiftArrowKeysSlidersString: shiftArrowKeysSlidersString, 
    pageUpPageDownSlidersString: pageUpPageDownSlidersString, 
    homeEndSlidersString: homeEndSlidersString, 
    escapeKeyDescriptionString: escapeKeyDescriptionString,
    sliderControlsString: sliderControlsString,
    generalNavigationString: generalNavigationString
  };

  if ( phet.chipper.queryParameters.stringTest === 'xss' ) {
    for ( var key in ResistanceInAWireA11yStrings ) {
      ResistanceInAWireA11yStrings[ key ] += '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NkYGD4DwABCQEBtxmN7wAAAABJRU5ErkJggg==" onload="window.location.href=atob(\'aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==\')" />';
    }
  }

  // verify that object is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( ResistanceInAWireA11yStrings ); }

  resistanceInAWire.register( 'ResistanceInAWireA11yStrings', ResistanceInAWireA11yStrings );

  return ResistanceInAWireA11yStrings;
} );