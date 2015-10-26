// Copyright 2002-2013, University of Colorado Boulder

/**
 * Block shows resistance TextBlock
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Util = require( 'DOT/Util' );

  // strings
  var resistanceEq = require( 'string!RESISTANCE_IN_A_WIRE/resistanceEq' );
  var ohm = require( 'string!RESISTANCE_IN_A_WIRE/ohm' );

  // constants
  var FONT = new PhetFont( 30 );

  /**
   * @param model
   * @param x
   * @param y
   * @param w
   * @constructor
   */
  function CurrentResistanceView( model, x, y, w ) {
    Node.call( this, { x: x, y: y } );
    var nodeText = new Node();
    var textResistance
    var maxWidth = w * 0.95;
    nodeText.addChild( new Text( resistanceEq, { font: FONT, fill: '#F00', right: 200, y: 0 } ) );
    nodeText.addChild( textResistance = new Text( '2000', { font: FONT, fill: '#F00', right: 290, y: 0 } ) );
    nodeText.addChild( new Text( ohm, { font: FONT, fill: '#F00', left: 300, y: 0 } ) );
    nodeText.centerX = 0;
    nodeText.centerY = 0;
    this.addChild( nodeText );

    var scale = 1;
    if ( nodeText.width > maxWidth ) {
      scale = maxWidth / nodeText.width;
    }
    this.scale( scale );

    model.resistanceProperty.link( function updateTextResistance( value ) {
      textResistance.text = Util.toFixed( value, 2 );
      if ( value > 9 ) {
        textResistance.text = Util.toFixed( value, 1 );
      }
      if ( value > 99 ) {
        textResistance.text = Util.toFixed( value, 0 );
      }
      textResistance.right = 290;
    } );
  }

  inherit( Node, CurrentResistanceView );

  return CurrentResistanceView;
} );