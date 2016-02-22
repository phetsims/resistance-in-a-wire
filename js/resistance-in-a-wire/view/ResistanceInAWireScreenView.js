// Copyright 2013-2015, University of Colorado Boulder

/**
 * Stage for the "ResistanceInAWire" view.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var FormulaView = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/FormulaView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ResistorView = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/ResistorView' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SlidersBox = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/SlidersBox' );

  /**
   * @param {ResistanceInAWireModel} model
   * @constructor
   */
  function ResistanceInAWireScreenView( model ) {

    ScreenView.call( this, { layoutBounds: new Bounds2( 0, 0, 1024, 618 ) } );

    // TODO: These aren't options, they are required config parameters
    var options = {
      resistivity: { max: 1, min: 0.01 },
      length: { max: 20, min: 0.1 },
      area: { max: 15, min: 0.01 }
    };

    this.addChild( new FormulaView( model, 70, 180 ) );
    this.addChild( new ResistorView( model, 290, 470, options ) );
    this.addChild( new ArrowNode( 200, 600, 350, 600, {
      headHeight: 50,
      headWidth: 30,
      tailWidth: 10,
      fill: '#FFF',
      stroke: '#000',
      lineWidth: 1
    } ) );

    var sliderBoxOptions = _.extend( { x: 600, y: 40 }, options );
    var slidersBox = new SlidersBox( model, sliderBoxOptions );
    this.addChild( slidersBox );

    this.addChild( new ResetAllButton(
      {
        listener: function() { model.reset(); },
        radius: 30,
        centerX: slidersBox.centerX,
        centerY: slidersBox.bottom + 60
      } ) );
  }

  return inherit( ScreenView, ResistanceInAWireScreenView );
} );
