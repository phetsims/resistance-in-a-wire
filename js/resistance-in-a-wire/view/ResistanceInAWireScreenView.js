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
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var WireView = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/WireView' );
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

    this.addChild( new FormulaView( model, 110, 180 ) );
    this.addChild( new WireView( model, 320, 450, options ) );
    this.addChild( new ArrowNode( 240, 570, 380, 570, {
      headHeight: 45,
      headWidth: 30,
      tailWidth: 10,
      fill: '#FFF',
      stroke: '#000',
      lineWidth: 1
    } ) );

    var sliderBoxOptions = _.extend( { x: 630, y: 40 }, options );
    var slidersBox = new SlidersBox( model, sliderBoxOptions );
    this.addChild( slidersBox );

    this.addChild( new ResetAllButton( {
      listener: function() { model.reset(); },
      radius: 30,
      right: slidersBox.right,
      centerY: slidersBox.bottom + 60
    } ) );
  }

  return inherit( ScreenView, ResistanceInAWireScreenView );
} );
