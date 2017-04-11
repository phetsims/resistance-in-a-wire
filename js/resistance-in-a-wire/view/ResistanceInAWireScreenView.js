// Copyright 2013-2017, University of Colorado Boulder

/**
 * Stage for the "ResistanceInAWire" view.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 * @author John Blanco (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var FormulaView = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/FormulaView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SlidersBox = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/SlidersBox' );
  var WireView = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/WireView' );

  /**
   * @param {ResistanceInAWireModel} model
   * @constructor
   */
  function ResistanceInAWireScreenView( model ) {

    ScreenView.call( this, { layoutBounds: new Bounds2( 0, 0, 1024, 618 ) } );

    this.addChild( new FormulaView( model, 110, 180 ) );
    this.addChild( new WireView( model, 320, 450 ) );
    this.addChild( new ArrowNode( 240, 570, 380, 570, {
      headHeight: 45,
      headWidth: 30,
      tailWidth: 10,
      fill: '#FFF',
      stroke: '#000',
      lineWidth: 1
    } ) );

    var sliderBoxOptions = { x: 630, y: 40 };
    var slidersBox = new SlidersBox( model, sliderBoxOptions );
    this.addChild( slidersBox );

    this.addChild( new ResetAllButton( {
      listener: function() { model.reset(); },
      radius: 30,
      right: slidersBox.right,
      centerY: slidersBox.bottom + 60
    } ) );
  }

  resistanceInAWire.register( 'ResistanceInAWireScreenView', ResistanceInAWireScreenView );

  return inherit( ScreenView, ResistanceInAWireScreenView );
} );
