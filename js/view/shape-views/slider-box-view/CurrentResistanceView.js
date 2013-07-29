// Copyright 2002-2013, University of Colorado Boulder

/**
 * Copyright 2002-2013, University of Colorado
 * Block shows resistance TextBlock
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */


define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Strings = require( 'resistance-in-a-wire-strings' );
  var Text = require( 'SCENERY/nodes/Text' );

  function CurrentResistanceView( model, x, y, w ) {
    Node.call( this, {x: x, y: y} );
    var nodeText = new Node();
    var textResistance,
      maxWidth = w * 0.95;
    nodeText.addChild( new Text( Strings.resistanceEq, { 'fontFamily': "Verdana", 'fontSize': 30, fill: "#F00", right: 200, y: 0 } ) );
    nodeText.addChild( textResistance = new Text( "2000", { 'fontFamily': "Verdana", 'fontSize': 30, fill: "#F00", right: 290, y: 0 } ) );
    nodeText.addChild( new Text( Strings.ohm, { 'fontFamily': "Verdana", 'fontSize': 30, fill: "#F00", left: 300, y: 0 } ) );
    nodeText.centerX = 0;
    nodeText.centerY = 0;
    this.addChild( nodeText );

    var scale = 1;
    if ( nodeText.width > maxWidth ) {
      scale = maxWidth / nodeText.width;
    }
    this.scale( scale );

    model.resistanceProperty.link( function updateTextResistance( value ) {
      textResistance.text = value.toFixed( 2 );
      if ( value > 9 ) {
        textResistance.text = value.toFixed( 1 );
      }
      if ( value > 99 ) {
        textResistance.text = value.toFixed( 0 );
      }
      textResistance.right = 290;
    } );
  }

  inherit( Node, CurrentResistanceView );

  return CurrentResistanceView;
} );