// Copyright 2016, University of Colorado Boulder

/**
 * Block shows R = ρL/A formula with letters scaling
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );

  // strings
  var areaSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/areaSymbol' );
  var lengthSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/lengthSymbol' );
  var resistanceSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/resistanceSymbol' );
  var resistivitySymbolString = require( 'string!RESISTANCE_IN_A_WIRE/resistivitySymbol' );

  // constants
  var FONT_FAMILY = 'Times New Roman';

  // FormulaView assumes that each symbol is a single character long.  The following code enforces this assumption so
  // that translators can't create messed up versions of the sim.
  function getFirstNonEmbeddingCharacter( str ){
    var char = null;
    for ( var i = 0; i < str.length; i++ ){
      // skip any characters related to directional control of the string, such as right-to-left embedding
      if ( str.charCodeAt( i ) < 0x202A || str.charCodeAt( i ) > 0x202E ){
        char = str.charAt( i );
        break;
      }
    }
    return char;
  }
  areaSymbolString = getFirstNonEmbeddingCharacter( areaSymbolString );
  lengthSymbolString = getFirstNonEmbeddingCharacter( lengthSymbolString );
  resistanceSymbolString = getFirstNonEmbeddingCharacter( resistanceSymbolString );
  resistivitySymbolString = getFirstNonEmbeddingCharacter( resistivitySymbolString );

  /**
   * @param {ResistanceInAWireModel} model
   * @param x
   * @param y
   * @constructor
   */
  function FormulaView( model, x, y ) {

    var thisNode = this;
    Node.call( this, { x: x, y: y } );

    var texts = [
      {
        label: resistanceSymbolString,
        scale: 3 / 2,
        x: 20,
        y: 0,
        targetProperty: 'resistanceProperty',
        color: '#ed1c24'
      },
      {
        label: resistivitySymbolString,
        x: 220,
        y: -90,
        targetProperty: 'resistivityProperty',
        color: '#0f0ffb'
      },
      {
        label: lengthSymbolString,
        x: 320,
        y: -90,
        targetProperty: 'lengthProperty',
        color: '#0f0ffb'
      },
      {
        label: areaSymbolString,
        x: 280,
        y: 90,
        targetProperty: 'areaProperty',
        color: '#0f0ffb'
      }
    ];

    //static text
    thisNode.addChild( new Text( '=', {
      font: new PhetFont( { family: FONT_FAMILY, size: 90 } ),
      fill: '#000',
      centerX: 100,
      centerY: 0
    } ) );

    thisNode.addChild( new Path( Shape.lineSegment( 150, 8, 400, 8 ), { stroke: 'black', lineWidth: 6 } ) );

    //dynamic text
    texts.forEach( function( entry ) {

      entry.view = new Text( entry.label, {
        font: new PhetFont( { family: FONT_FAMILY, size: 115 } ),
        fill: entry.color,
        centerX: entry.x,
        centerY: entry.y
      } );
      thisNode.addChild( entry.view );

      entry.scale = entry.scale || 1 / model[ entry.targetProperty ].get();
      model[ entry.targetProperty ].link( function updateProperty( val ) {
        entry.view.matrix = Matrix3.identity();
        entry.view.scale( entry.scale * val + 0.125 );
        entry.view.centerX = entry.x;
        entry.view.centerY = entry.y;
      } );
    } );
  }

  resistanceInAWire.register( 'FormulaView', FormulaView );

  return inherit( Node, FormulaView );
} );