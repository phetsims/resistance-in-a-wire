// Copyright 2016-2017, University of Colorado Boulder

/**
 * Block shows R = ρL/A formula with letters scaling
 * The layout is based off of the equals sign.
 *
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 * @author John Blanco (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var areaSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/areaSymbol' );
  var lengthSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/lengthSymbol' );
  var resistanceSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/resistanceSymbol' );
  var resistivitySymbolString = require( 'string!RESISTANCE_IN_A_WIRE/resistivitySymbol' );

  // constants
  var MAX_CAPPED_VALUE = 2.8; // empirically determined
  var CAP_RECTANGLE_LINE_WIDTH = .5;

  /**
   * @param {ResistanceInAWireModel} model
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function FormulaNode( model, tandem, options ) {

    Node.call( this );

    // equals sign, hard coded
    var equalsSignText = new Text( '=', { // we never internationalize the '=' sign
      font: new PhetFont( { family: ResistanceInAWireConstants.FONT_FAMILY, size: 90 } ),
      fill: ResistanceInAWireConstants.BLACK_COLOR,
      center: new Vector2( 100, 0 ),
      tandem: tandem.createTandem( 'equalsSign' )
    } );
    this.addChild( equalsSignText );

    // An array of attributes related to text
    var symbolTexts = [ {
      label: resistanceSymbolString,
      scale: 3 / 2, // warning, do not change this without thinking about MAX_CAPPED_VALUE
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

    // dividing line, hard coded
    this.addChild( new Path( Shape.lineSegment( 150, 8, 400, 8 ), {
      stroke: 'black',
      lineWidth: 6,
      tandem: tandem.createTandem( 'dividingLine' )
    } ) );

    var lettersNode = new Node();

    // dynamic text
    symbolTexts.forEach( function( entry ) {

      var text = new Text( entry.label, {
        font: new PhetFont( { family: ResistanceInAWireConstants.FONT_FAMILY, size: 115 } ),
        fill: entry.color,
        center: entry.center,
        tandem: entry.tandem,
        boundsMethod: 'accurate'
      } );

      // Add an invisible rectangle with bounds slightly larger than the text so that artifacts aren't left on the
      // screen, see https://github.com/phetsims/ohms-law/issues/26.
      // This also serves as the rectangle surrounding the 'R' that 'caps' the scaling when it gets too big.
      var antiArtifactRectangle = Rectangle.bounds( text.bounds.dilatedX( 3 ), {
        lineWidth: CAP_RECTANGLE_LINE_WIDTH,
        cornerRadius: 3
      } );

      var letterNode = new Node( { children: [ antiArtifactRectangle, text ] } );
      lettersNode.addChild( letterNode );

      var scale = entry.scale || 1 / entry.property.value;

      // The size of the formula letter will scale with the value the letter represents. This does not need an unlink
      // because it exists for the life of the sim.
      entry.property.link( function( value ) {
        letterNode.setScaleMagnitude( scale * value + 0.125 );
        letterNode.center = entry.center;

        // If it is the capped letter (the 'R') and it is passed the capped value
        if ( entry.cappedSize && value >= MAX_CAPPED_VALUE ) {

          // Scale the line width instead of the letter once capped
          // Max the lineWidth out so that the lowest area doesn't have too thick of a square around it.
          var lineWidth = CAP_RECTANGLE_LINE_WIDTH + value * .01 < 3 ? CAP_RECTANGLE_LINE_WIDTH + value * .01 : 3;
          antiArtifactRectangle.setLineWidth( lineWidth );
          antiArtifactRectangle.setStroke( ResistanceInAWireConstants.RED_COLOR );
          letterNode.setScaleMagnitude( scale * MAX_CAPPED_VALUE + 0.125 );
          letterNode.center = entry.center;
        }
        else {

          // If we are not capped or more that the max value, don't show the border
          antiArtifactRectangle.setStroke( null );
        }
      } );
    } );

    this.addChild( lettersNode );

    options.tandem = tandem;
    this.mutate( options );
  }

  resistanceInAWire.register( 'FormulaNode', FormulaNode );

  return inherit( Node, FormulaNode );
} );