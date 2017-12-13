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
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var platform = require( 'PHET_CORE/platform' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var areaSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/areaSymbol' );
  var lengthSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/lengthSymbol' );
  var resistanceSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/resistanceSymbol' );
  var resistivitySymbolString = require( 'string!RESISTANCE_IN_A_WIRE/resistivitySymbol' );

  /**
   * @param {ResistanceInAWireModel} model
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function FormulaNode( model, tandem, options ) {

    Node.call( this, { tandem: tandem } );

    // equals sign, hard coded
    var equalsSignText = new Text( '=', { // we never internationalize the '=' sign
      font: new PhetFont( { family: ResistanceInAWireConstants.FONT_FAMILY, size: 90 } ),
      fill: ResistanceInAWireConstants.BLACK_COLOR,
      center: new Vector2( 100, 0 ),
      tandem: tandem.createTandem( 'equalsSign' )
    } );

    // An array of attributes related to text
    var symbolTexts = [ {
      label: resistanceSymbolString,
      center: new Vector2( equalsSignText.centerX - 100, 0 ),
      property: model.resistanceProperty,
      color: ResistanceInAWireConstants.RED_COLOR,
      cappedSize: true, // To make sure that the 'R' doesn't get too big, see https://github.com/phetsims/resistance-in-a-wire/issues/28
      tandem: tandem.createTandem( 'resistanceSymbol' )
    }, {
      label: resistivitySymbolString,
      center: new Vector2( equalsSignText.centerX + 120, -90 ),
      property: model.resistivityProperty,
      color: ResistanceInAWireConstants.BLUE_COLOR,
      tandem: tandem.createTandem( 'resistivitySymbol' )
    }, {
      label: lengthSymbolString,
      center: new Vector2( equalsSignText.centerX + 220, -90 ),
      property: model.lengthProperty,
      color: ResistanceInAWireConstants.BLUE_COLOR,
      tandem: tandem.createTandem( 'lengthSymbol' )
    }, {
      label: areaSymbolString,
      center: new Vector2( equalsSignText.centerX + 170, 90 ),
      property: model.areaProperty,
      color: ResistanceInAWireConstants.BLUE_COLOR,
      tandem: tandem.createTandem( 'areaSymbol' )
    } ];

    var lettersNode = new Node();

    // if we are on a safari platform render with canvas to prevent these issues, but only on safari because
    // canvas doesn't perform as well on other browsers
    // https://github.com/phetsims/resistance-in-a-wire/issues/108 and
    // https://github.com/phetsims/resistance-in-a-wire/issues/112
    if ( platform.safari ) { lettersNode.renderer = 'canvas'; }

    // dynamically sized text
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
      var antiArtifactRectangle = Rectangle.bounds( text.bounds.dilatedX( 1 ) );

      var letterNode = new Node( { children: [ antiArtifactRectangle, text ] } );
      lettersNode.addChild( letterNode );

      // Set the scale based on the default value of the property; normalize the scale for all letters.
      var scale = 7 / entry.property.value; // empirically determined '7'

      // The size of the formula letter will scale with the value the letter represents. This does not need an unlink
      // because it exists for the life of the sim.
      entry.property.link( function( value ) {
        letterNode.setScaleMagnitude( scale * value + 1 );
        letterNode.center = entry.center;
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
  }

  resistanceInAWire.register( 'FormulaNode', FormulaNode );

  return inherit( Node, FormulaNode );
} );