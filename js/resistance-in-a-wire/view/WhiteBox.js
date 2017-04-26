// Copyright 2013-2017, University of Colorado Boulder

/**
 * White Block with black border container
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 * @author John Blanco (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );

  /**
   * @param {number} x - the x coordinate of the box
   * @param {number} y - the y coordinate of the box
   * @param {number} w - the width of the box
   * @param {number} h - the height of the box
   * @param {Tandem} tandem
   * @constructor
   */
  function WhiteBox( x, y, w, h, tandem ) {
    Node.call( this );
    this.addChild( new Rectangle( x, y, w, h, 12, 12, {
      fill: '#FFF',
      stroke: '#000',
      lineWidth: 3,
      tandem: tandem.createTandem( 'whiteRectangle') } ) );
  }

  resistanceInAWire.register( 'WhiteBox', WhiteBox );

  return inherit( Node, WhiteBox );
} );