// Copyright 2013-2017, University of Colorado Boulder

/**
 * Block shows R = ρL/A formula with letters scaling
 * The layout is based off of the equals sign.
 *
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 * @author John Blanco (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var platform = require( 'PHET_CORE/platform' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireA11yStrings = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireA11yStrings' );
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  var Shape = require( 'KITE/Shape' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var areaSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/areaSymbol' );
  var lengthSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/lengthSymbol' );
  var resistanceSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/resistanceSymbol' );

  // a11y strings
  var resistanceEquationString = ResistanceInAWireA11yStrings.resistanceEquationString.value;
  var resistanceEquationDescriptionString = ResistanceInAWireA11yStrings.resistanceEquationDescriptionString.value;
  var rhoLAndAComparablePatternString = ResistanceInAWireA11yStrings.rhoLAndAComparablePatternString.value;
  var lAndAComparablePatternString = ResistanceInAWireA11yStrings.lAndAComparablePatternString.value;
  var noneComparablePatternString = ResistanceInAWireA11yStrings.noneComparablePatternString.value;

  // constants - rather than keep a reference to each letter node, a map from key to scale magnitude is used
  // to track letter scales
  var RESISTANCE_KEY = 'resistance';
  var RESISTIVITY_KEY = 'resistivity';
  var AREA_KEY = 'area';
  var LENGTH_KEY = 'length';

  /**
   * @param {ResistanceInAWireModel} model
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function FormulaNode( model, tandem, options ) {

    Node.call( this, {
      tandem: tandem,

      // a11y
      tagName: 'div',
      labelTagName: 'h3',
      labelContent: resistanceEquationString,
      descriptionContent: resistanceEquationDescriptionString
    } );

    // equals sign, hard coded
    var equalsSignText = new Text( '=', { // we never internationalize the '=' sign
      font: new PhetFont( { family: ResistanceInAWireConstants.FONT_FAMILY, size: 90 } ),
      fill: ResistanceInAWireConstants.BLACK_COLOR,
      center: new Vector2( 100, 0 ),
      tandem: tandem.createTandem( 'equalsSign' )
    } );

    // maps identifier to scale magnitude
    this.a11yScaleMap = {};
    this.a11yScaleMap[ RESISTANCE_KEY ] = 0;
    this.a11yScaleMap[ RESISTIVITY_KEY ] = 0;
    this.a11yScaleMap[ AREA_KEY ] = 0;
    this.a11yScaleMap[ LENGTH_KEY ] = 0;

    // An array of attributes related to text
    var symbolTexts = [ {
      label: resistanceSymbolString,
      center: new Vector2( equalsSignText.centerX - 100, 0 ),
      property: model.resistanceProperty,
      color: ResistanceInAWireConstants.RED_COLOR,
      cappedSize: true, // To make sure that the 'R' doesn't get too big, see https://github.com/phetsims/resistance-in-a-wire/issues/28
      tandem: tandem.createTandem( 'resistanceSymbol' ),
      scaleKey: RESISTANCE_KEY
    }, {
      label: MathSymbols.RHO,
      center: new Vector2( equalsSignText.centerX + 120, -90 ),
      property: model.resistivityProperty,
      color: ResistanceInAWireConstants.BLUE_COLOR,
      tandem: tandem.createTandem( 'resistivitySymbol' ),
      scaleKey: RESISTIVITY_KEY
    }, {
      label: lengthSymbolString,
      center: new Vector2( equalsSignText.centerX + 220, -90 ),
      property: model.lengthProperty,
      color: ResistanceInAWireConstants.BLUE_COLOR,
      tandem: tandem.createTandem( 'lengthSymbol' ),
      scaleKey: LENGTH_KEY
    }, {
      label: areaSymbolString,
      center: new Vector2( equalsSignText.centerX + 170, 90 ),
      property: model.areaProperty,
      color: ResistanceInAWireConstants.BLUE_COLOR,
      tandem: tandem.createTandem( 'areaSymbol' ),
      scaleKey: AREA_KEY
    } ];

    // parent for all letters in the equation - given a 'p' tag for a11y because this node will hold the relative
    // size description, see getRelativeSizeDescription()
    var lettersNode = new Node( { tagName: 'p' } );

    // if we are on a safari platform render with canvas to prevent these issues, but only on safari because
    // canvas doesn't perform as well on other browsers
    // https://github.com/phetsims/resistance-in-a-wire/issues/108 and
    // https://github.com/phetsims/resistance-in-a-wire/issues/112
    if ( platform.safari ) { lettersNode.renderer = 'canvas'; }

    // dynamically sized text
    var self = this;
    symbolTexts.forEach( function( entry ) {

      var text = new Text( entry.label, {
        font: new PhetFont( { family: ResistanceInAWireConstants.FONT_FAMILY, size: 15 } ),
        fill: entry.color,
        center: entry.center,
        tandem: entry.tandem
      } );

      // Add an invisible rectangle with bounds slightly larger than the text so that artifacts aren't left on the
      // screen, see https://github.com/phetsims/ohms-law/issues/26.
      // This also serves as the rectangle surrounding the 'R' that 'caps' the scaling when it gets too big.
      var antiArtifactRectangle = Rectangle.bounds( text.bounds.dilated( 1 ) );

      var letterNode = new Node( { children: [ antiArtifactRectangle, text ] } );
      lettersNode.addChild( letterNode );

      // Set the scale based on the default value of the property; normalize the scale for all letters.
      var scale = 7 / entry.property.value; // empirically determined '7'

      // The size of the formula letter will scale with the value the letter represents. The accessible description for
      // the equation will also update. This does not need an unlink because it exists for the life of the sim.
      entry.property.link( function( value ) {
        var scaleMagnitude = scale * value + 1;
        letterNode.setScaleMagnitude( scaleMagnitude );
        letterNode.center = entry.center;

        // for lookup when describing relative letter sizes
        self.a11yScaleMap[ entry.scaleKey ] = scaleMagnitude;
      } );

      // linked lazily so that relative scales are defined
      entry.property.lazyLink( function() {
        lettersNode.setDescriptionContent( self.getRelativeSizeDescription() );
      } );
    } );

    this.addChild( lettersNode );

    // Add the dividing line and equals sign after the letters so that they are on top when resistance is too large
    this.addChild( equalsSignText );

    // dividing line, hard coded
    this.addChild( new Path( Shape.lineSegment( 150, 8, 400, 8 ), {
      stroke: 'black',
      lineWidth: 6,
      tandem: tandem.createTandem( 'dividingLine' )
    } ) );

    this.mutate( options );

    // a11y - set the initial description
    lettersNode.setDescriptionContent( self.getRelativeSizeDescription() );
  }

  resistanceInAWire.register( 'FormulaNode', FormulaNode );

  inherit( Node, FormulaNode, {

    /**
     * Get a description of the relative size of various letters. Size of each letter is described relative to
     * resistance R. When all or L and A letters are the same size, a simplified sentence is used to reduce verbosity,
     * so this function might return something like:
     *
     * "Size of letter R is comparable to the size of letter rho, letter L, and letter A" or
     * "Size of letter R is much larger than the size of letter rho, and slightly larger than letter L and letter A." or
     * "Size of letter R is much smaller than letter rho, comparable to letter L, and much much larger than letter A."
     *
     * @return {string}
     * @a11y
     */
    getRelativeSizeDescription: function() {
      var resistanceScale = this.a11yScaleMap[ RESISTANCE_KEY ];
      var resistivityScale = this.a11yScaleMap[ RESISTIVITY_KEY ];
      var areaScale = this.a11yScaleMap[ AREA_KEY ];
      var lengthScale = this.a11yScaleMap[ LENGTH_KEY ];

      var rToRho = resistanceScale / resistivityScale;
      var rToA = resistanceScale / areaScale;
      var rToL = resistanceScale / lengthScale;
      var lToA = lengthScale / areaScale;
      var lToRho = lengthScale / resistivityScale;

      var rToRhoDescription = getRelativeSizeDescription( rToRho );
      var roTLDescription = getRelativeSizeDescription( rToL );
      var rToADescription = getRelativeSizeDescription( rToA );

      var description;
      var comparableRange = ResistanceInAWireConstants.RELATIVE_SIZE_MAP.comparable.range;

      // even if right hand side variables are not comparable in size, if R is relatively larger or smaller than all
      // by the same amount, combine size description
      var relativeSizeKeys = Object.keys( ResistanceInAWireConstants.RELATIVE_SIZE_MAP );
      var allRelativeSizesSame = false;
      for ( var i = 0; i < relativeSizeKeys.length; i++ ) {
        var key = relativeSizeKeys[ i ];
        var sizeRange = ResistanceInAWireConstants.RELATIVE_SIZE_MAP[ key ].range;
        var containsRToRho = sizeRange.contains( rToRho );
        var containsRToA = sizeRange.contains( rToA );
        var containsRToL = sizeRange.contains( rToL );

        if ( containsRToRho && containsRToA && containsRToL ) {
          allRelativeSizesSame = true;
          break;
        }
      }

      if ( ( comparableRange.contains( lToA ) && comparableRange.contains( lToRho ) ) || allRelativeSizesSame ) {

        // all right hand side letters are comparable in size
        description = StringUtils.fillIn( rhoLAndAComparablePatternString, {
          rToAll: rToRhoDescription // any size description will work
        } );
      }
      else if ( comparableRange.contains( lToA ) ) {

        // L and A are comparable, so they are the same size relative to R
        description = StringUtils.fillIn( lAndAComparablePatternString, {
          rToRho: rToRhoDescription,
          rToLAndA: roTLDescription // either length or area relative descriptions will work
        } );
      }
      else {

        // all relative sizes could be unique
        description = StringUtils.fillIn( noneComparablePatternString, {
          rToRho: rToRhoDescription,
          rToL: roTLDescription,
          rToA: rToADescription
        } );
      }

      return description;
    }
  } );

  /**
   * Get a relative size description from a relative scale, used to describe letters relative to each other. Will return
   * something like
   *
   * "comparable to" or
   * "much much larger than"
   *
   * @param {number} relativeScale
   * @return {string}
   */
  var getRelativeSizeDescription = function( relativeScale ) {

    // get described ranges of each relative scale
    var keys = Object.keys( ResistanceInAWireConstants.RELATIVE_SIZE_MAP );
    for ( var i = 0; i < keys.length; i++ ) {
      var relativeEntry = ResistanceInAWireConstants.RELATIVE_SIZE_MAP[ keys[ i ] ];

      if ( relativeEntry.range.contains( relativeScale ) ) {
        return relativeEntry.description;
      }
    }
  };

  return FormulaNode;
} );