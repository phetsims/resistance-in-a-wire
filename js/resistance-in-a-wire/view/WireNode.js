// Copyright 2017-2019, University of Colorado Boulder

/**
 * View of the wire, includes dots that depict the level of resistivity
 *
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 * @author John Blanco (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var DotsCanvasNode = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/DotsCanvasNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var platform = require( 'PHET_CORE/platform' );
  var Property = require( 'AXON/Property' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireA11yStrings = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireA11yStrings' );
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  var Shape = require( 'KITE/Shape' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Util = require( 'DOT/Util' );
  var WireShapeConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/view/WireShapeConstants' );

  // a11y strings
  var wireDescriptionPatternString = ResistanceInAWireA11yStrings.wireDescriptionPatternString.value;

  /**
   * The position is set using center values since this can grow or shrink in width and height as the area and length of
   * the wire changes.
   *
   * @param {ResistanceInAWireModel} model
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function WireNode( model, tandem, options ) {

    // @private {ResistanceInAWireModel}
    this.model = model;

    Node.call( this, {
      tandem: tandem,

      // a11y
      tagName: 'div',
      labelTagName: 'h3',
      labelContent: 'The Wire'
    } );

    // See https://github.com/phetsims/resistance-in-a-wire/issues/158
    var wireBodyRenderer = platform.android ? 'canvas' : null;

    // Body of the wire
    var wireBody = new Path( null, {
      stroke: 'black',
      tandem: tandem.createTandem( 'wireBody' ),
      renderer: wireBodyRenderer
    } );

    // Cap/end of the wire
    var wireEnd = new Path( null, {
      stroke: 'black',
      fill: '#E8B282',
      tandem: tandem.createTandem( 'wireEnd' ),
      renderer: wireBodyRenderer
    } );

    this.addChild( wireBody );
    this.addChild( wireEnd );

    // all dots representing resistivity
    var dotsNode = new DotsCanvasNode( model );
    this.addChild( dotsNode );

    // Update the resistor on change. No need to unlink, as it is present for the lifetime of the sim.
    var self = this;
    Property.multilink( [ model.areaProperty, model.lengthProperty, model.resistivityProperty ],
      function( area, length, resistivity ) {

        // Height of the wire in view coordinates
        var height = WireShapeConstants.areaToHeight( area );

        // Width of the wire (as measured from the top of the wire, that is excluding the rounding bits in the middle).
        var width = WireShapeConstants.lengthToWidth( length );

        // Set the (face) body shape of the wire.
        // Recall that (zero,zero) is defined as the center of the wire.
        wireBody.shape = new Shape().moveTo( -width / 2, height / 2 )
          .horizontalLineToRelative( width )
          .ellipticalArc( width / 2, 0, WireShapeConstants.PERSPECTIVE_FACTOR * height / 2, height / 2, 0, Math.PI / 2, 3 * Math.PI / 2, true )
          .horizontalLineToRelative( -width );

        // Set the cap end of the wire
        wireEnd.shape = Shape.ellipse( -width / 2, 0, height * WireShapeConstants.PERSPECTIVE_FACTOR / 2, height / 2 );

        // Set the gradient on the wire to make it look more 3D.
        wireBody.fill = new LinearGradient( 0, height / 2, 0, -height / 2 )
          .addColorStop( 0, '#8C4828' )
          .addColorStop( 0.5, '#E8B282' )
          .addColorStop( 0.65, '#FCF5EE' )
          .addColorStop( 0.8, '#F8E8D9' )
          .addColorStop( 1, '#8C4828' );

        // redraw the dots representing resistivity
        dotsNode.invalidatePaint();

        self.descriptionContent = self.getWireDescription();
      }
    );

    this.mutate( options );
  }

  resistanceInAWire.register( 'WireNode', WireNode );

  return inherit( Node, WireNode, {

    getWireDescription: function() {
      var lengthValue = this.model.lengthProperty.get();
      var areaValue = this.model.areaProperty.get();
      var resistivityValue = this.model.resistivityProperty.get();

      var lengthDescription = ResistanceInAWireConstants.getValueDescriptionFromMap( lengthValue, ResistanceInAWireConstants.LENGTH_TO_DESCRIPTION_MAP );
      var areaDescription = ResistanceInAWireConstants.getValueDescriptionFromMap( areaValue, ResistanceInAWireConstants.AREA_TO_DESCRIPTION_MAP );
      var resistivityDescription = ResistanceInAWireConstants.getValueDescriptionFromMap( resistivityValue, ResistanceInAWireConstants.RESISTIVITY_TO_DESCRIPTION_MAP );

      return StringUtils.fillIn( wireDescriptionPatternString, {
        length: lengthDescription,
        thickness: areaDescription,
        impurities: resistivityDescription,
        resistance: Util.toFixed( this.model.resistanceProperty.get(), ResistanceInAWireConstants.getResistanceDecimals( this.model.resistanceProperty.get() ) )
      } );
    }
  } );
} );