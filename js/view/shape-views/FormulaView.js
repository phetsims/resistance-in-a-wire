/**
 * Copyright 2002-2013, University of Colorado
 * Block shows R = ρL/A formula with letters scaling
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */


define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  function FormulaView( model, x, y ) {
    var thisNode = this;
    Node.call( this, {x: x, y: y} );
    var texts = [
      {
        label: "R",
        scale: 3 / 2,
        x: 20,
        y: 0,
        targetProperty: "resistanceProperty",
        color: "#ed1c24"
      },
      {
        label: "ρ",
        x: 220,
        y: -110,
        targetProperty: "resistivityProperty",
        color: "#0f0ffb"
      },
      {
        label: "L",
        x: 320,
        y: -90,
        targetProperty: "lengthProperty",
        color: "#0f0ffb"
      },
      {
        label: "A",
        x: 280,
        y: 90,
        targetProperty: "areaProperty",
        color: "#0f0ffb"
      }
    ];
    //static text
    thisNode.addChild( new Text( "=", { font: new PhetFont( { family: 'Times New Roman', size: 100 } ), fill: "#000", centerX: 100, centerY: 0} ) );
    thisNode.addChild( new Path( Shape.lineSegment( 150, 8, 400, 8 ), { stroke: 'black', lineWidth: 6 } ) );
    //dynamic text
    texts.forEach( function( entry ) {
      entry.view = new Text( entry.label, {font: new PhetFont( { family: 'Times New Roman', size: 130 } ), fill: entry.color, centerX: entry.x, centerY: entry.y} );
      thisNode.addChild( entry.view );
      entry.scale = entry.scale || 1 / model[entry.targetProperty].get();
      model[entry.targetProperty].link( function updateProperty( val ) {
        entry.view.matrix = new Matrix3();
        entry.view.scale( entry.scale * val + 0.125 );
        entry.view.centerX = entry.x;
        entry.view.centerY = entry.y;
      } );
    } );
  }

  inherit( Node, FormulaView );

  return FormulaView;
} );