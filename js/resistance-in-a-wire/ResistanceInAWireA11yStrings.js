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

  // modules
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );

  var ResistanceInAWireA11yStrings = {
    summarySimString: {
      value: 'This is an interactive sim. Descriptions change as you play with it. It has a Play Area and Control Panel. ' +
             'In the Play Area you find the Resistance equation, <b>R</b> equals <b>rho</b> times <b>L</b> over <b>A</b>, and a piece of wire. ' +
             'Sliders for resistivity, length, and area allow changes to the equation and the piece of wire. ' +
             'The Control Panel has a button to reset the sim.'
    },
    currentlyString: {
      value: 'Currently,'
    },
    summaryResistancePatternString: {
      value: 'resistance, <b>R</b>, is {{value}} ohms',
    },
    summaryResistivityPatternString: {
      value: 'resistivity, <b>rho</b>, is {{value}} ohm centimeters',
    },
    summaryLengthPatternString: {
      value: 'length, <b>L</b>, is {{value}} centimeters',
    },
    summaryAreaPatternString: {
      value: 'area, <b>A</b>, is {{value}} centimeters squared',
    },
    resistanceEquationString: {
      value: 'Resistance Equation'
    },
    resistanceEquationDescriptionString: {
      value: 'Resistance, <b>R</b>, is equal to resistivity, <b>rho</b>, times length, <b>L</b>, over area, <b>A</b>.'
    },
    rhoLAndAComparablePatternString: {
      value: 'Size of letter R is {{rToAll}} the size of the letter rho, letter L, and letter A.'
    },
    lAndAComparablePatternString: {
      value: 'Size of letter R is {{rToRho}} the size of letter rho, and {{rToLAndA}} than letter L and letter A.'
    },
    noneComparablePatternString: {
      value: 'Size of letter R is {{rToRho}} the size of letter rho, {{rToL}} letter L, and {{rToA}} letter A.'
    },
    muchMuchSmallerThanString: {
      value: 'much much smaller than',
    },
    muchSmallerThanString: {
      value: 'much smaller than',
    },
    slightlySmallerThanString: {
      value: 'slightly smaller than',
    },
    comparableToString: {
      value: 'comparable to', 
    },
    slightlyLargerThanString: {
      value: 'slightly larger than',
    },
    muchLargerThanString: {
      value: 'much larger than',
    },
    muchMuchLargerThanString: {
      value: 'much much larger than', 
    },
    wireDescriptionPatternString: {
      value: 'Currently, wire is {{length}}, {{thickness}}, and there is a {{impurities}} of impurities in wire. Resistance is {{resistance}} ohms.'
    },
    resistivityUnitsPatternString: {
      value: '{{value}} ohm centimeters',
    },
    extremelyShortString: {
      value: 'extremely short'
    },
    veryShortString: {
      value: 'very short'
    },
    shortString: {
      value: 'short'
    },
    ofMediumLengthString: {
      value: 'of medium length'
    },
    longString: {
      value: 'long'
    },
    veryLongString: {
      value: 'very long'
    },
    extremelyLongString: {
      value: 'extremely long'
    },
    extremelyThinString: {
      value: 'extremely thin'
    },
    veryThinString: {
      value: 'very thin'
    },
    thinString: {
      value: 'thin'
    },
    ofMediumThicknessString: {
      value: 'of medium thickness'
    },
    thickString: {
      value: 'thick'
    },
    veryThickString: {
      value: 'very thick'
    },
    extremelyThickString: {
      value: 'extremely thick'
    },
    aTinyAmountOfImpuritiesString: {
      value: 'tiny amount'
    },
    aVerySmallAmountOfImpuritiesString: {
      value: 'very small amount'
    },
    aSmallAmountOfImpuritiesString: {
      value: 'small amount'
    },
    aMediumAmountOfImpuritiesString: {
      value: 'medium amount'
    },
    aLargeAmountOfImpuritiesString: {
      value: 'large amount'
    },
    aVeryLargeAmountOfImpuritiesString: {
      value: 'very large amount'
    },
    aHugeAmountOfImpuritiesString: {
      value: 'huge amount'
    },
    summaryInteractionHintString: {
      value: 'Look for resistivity, length, and area sliders to play, or read on for details about equation and wire.'
    },
    lengthUnitsPatternString: {
      value: '{{value}} centimeters',
    },
    areaUnitsPatternString: {
      value: '{{value}} centimeters squared',
    },
    resistivitySliderLabelString: {
      value: 'rho, Resistivity',
    },
    lengthSliderLabelString: {
      value: 'L, Length',
    },
    areaSliderLabelString: {
      value: 'A, Area'
    },
    sliderControlsString: {
      value: 'Slider Controls'
    },
    slidersDescriptionString: {
      value: 'Resistivity, Length, and Area sliders allow changes to equation and wire.'
    },
    sizeChangeAlertPatternString: {
      value: 'As letter {{letter}} {{letterChange}}, letter R {{rChange}}. Resistance now {{resistance}} ohms.'
    },
    letterRhoString: {
      value: 'rho'
    },
    letterLString: {
      value: 'L'
    },
    letterAString: {
      value: 'A'
    },
    growsString: {
      value: 'grows'
    },
    shrinksString: {
      value: 'shrinks'
    },
    growsALotString: {
      value: 'grows a lot'
    },
    shrinksALotString: {
      value: 'shrinks a lot'
    }
  };

  if ( phet.chipper.queryParameters.stringTest === 'xss' ) {
    for ( var key in ResistanceInAWireA11yStrings ) {
      ResistanceInAWireA11yStrings[ key ].value += '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NkYGD4DwABCQEBtxmN7wAAAABJRU5ErkJggg==" onload="window.location.href=atob(\'aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==\')" />';
    }
  }

  // verify that object is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( ResistanceInAWireA11yStrings ); }

  resistanceInAWire.register( 'ResistanceInAWireA11yStrings', ResistanceInAWireA11yStrings );

  return ResistanceInAWireA11yStrings;
} );