// Copyright 2016-2017, University of Colorado Boulder

/**
 * Block shows R = ρL/A formula with letters scaling
 *
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 * @author John Blanco (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var areaSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/areaSymbol' );
  var lengthSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/lengthSymbol' );
  var resistanceSymbolString = require( 'string!RESISTANCE_IN_A_WIRE/resistanceSymbol' );
  var resistivitySymbolString = require( 'string!RESISTANCE_IN_A_WIRE/resistivitySymbol' );

  // constants
  var FONT_FAMILY = 'Times New Roman';

  /**
   * @param {ResistanceInAWireModel} model
   * @param {number} x
   * @param {number} y
   * @param {Tandem} tandem
   * @constructor
   */
  function FormulaView( model, x, y, tandem ) {

    var self = this;
    Node.call( this, { x: x, y: y } );

    var texts = [ {
      label: resistanceSymbolString,
      scale: 3 / 2,
      position: new Vector2( 20, 0 ),
      property: model.resistanceProperty,
      color: '#ed1c24',
      tandem: tandem.createTandem( 'resistanceSymbol' )
    }, {
      label: resistivitySymbolString,
      position: new Vector2( 220, -90 ),
      property: model.resistivityProperty,
      color: ResistanceInAWireConstants.BLUE_COLOR,
      tandem: tandem.createTandem( 'resistivitySymbol' )
    }, {
      label: lengthSymbolString,
      position: new Vector2( 320, -90 ),
      property: model.lengthProperty,
      color: ResistanceInAWireConstants.BLUE_COLOR,
      tandem: tandem.createTandem( 'lengthSymbol' )
    }, {
      label: areaSymbolString,
      position: new Vector2( 280, 90 ),
      property: model.areaProperty,
      color: ResistanceInAWireConstants.BLUE_COLOR,
      tandem: tandem.createTandem( 'areaSymbol' )
    } ];

    // static text
    self.addChild( new Text( '=', {
      font: new PhetFont( { family: FONT_FAMILY, size: 90 } ),
      fill: '#000',
      centerX: 100,
      centerY: 0,
      tandem: tandem.createTandem( 'equalsSign' )
    } ) );

    self.addChild( new Path( Shape.lineSegment( 150, 8, 400, 8 ), {
      stroke: 'black',
      lineWidth: 6,
      tandem: tandem.createTandem( 'dividingLine' )
    } ) );

    // dynamic text
    texts.forEach( function( entry ) {

      var view = new Text( entry.label, {
        font: new PhetFont( { family: FONT_FAMILY, size: 115 } ),
        fill: entry.color,
        center: entry.position,
        tandem: entry.tandem
      } );

      var scale = entry.scale || 1 / entry.property.value;

      // The size of the formula letter will scale with the value the letter represents. This does not need an unlink
      // because it exists for the life of the sim.
      entry.property.link( function updateProperty( value ) {
        view.matrix = Matrix3.scaling( scale * value + 0.125 );
        view.center = entry.position;
      } );

      self.addChild( view );
    } );
  }

  resistanceInAWire.register( 'FormulaView', FormulaView );

  return inherit( Node, FormulaView );
} );