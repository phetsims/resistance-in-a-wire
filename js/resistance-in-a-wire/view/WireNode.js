// Copyright 2017, University of Colorado Boulder

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
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var platform = require( 'PHET_CORE/platform' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var resistanceInAWire = require( 'RESISTANCE_IN_A_WIRE/resistanceInAWire' );
  var ResistanceInAWireA11yStrings = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireA11yStrings' );
  var ResistanceInAWireConstants = require( 'RESISTANCE_IN_A_WIRE/resistance-in-a-wire/ResistanceInAWireConstants' );
  var Shape = require( 'KITE/Shape' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Util = require( 'DOT/Util' );

  // a11y strings
  var wireDescriptionPatternString = ResistanceInAWireA11yStrings.wireDescriptionPatternString.value;

  // constants
  var PERSPECTIVE_FACTOR = 0.4; // Multiplier that controls the width of the ellipses on the ends of the wire.
  var DOT_RADIUS = 2;

  // Used to calculate the size of the wire in screen coordinates from the model values
  var WIRE_DIAMETER_MAX = Math.sqrt( ResistanceInAWireConstants.AREA_RANGE.max / Math.PI ) * 2;
  var WIRE_VIEW_WIDTH_RANGE = new Range( 15, 500 ); // in screen coordinates
  var WIRE_VIEW_HEIGHT_RANGE = new Range( 3, 180 ); // in screen coordinates

  var MAX_WIDTH_INCLUDING_ROUNDED_ENDS = WIRE_VIEW_WIDTH_RANGE.max + 2 * WIRE_VIEW_HEIGHT_RANGE.max * PERSPECTIVE_FACTOR;
  var AREA_PER_DOT = 200; // Adjust this to control the density of the dots.
  var NUMBER_OF_DOTS = MAX_WIDTH_INCLUDING_ROUNDED_ENDS * WIRE_VIEW_HEIGHT_RANGE.max / AREA_PER_DOT;

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
      descriptionTagName: 'p',
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

    /**
     * Transform to map the area to the height of the wire.
     * @param {number} area
     * @returns {number} - the height in screen coordinates
     */
    var areaToHeight = function( area ) {
      var radius_squared = area / Math.PI;
      var diameter = Math.sqrt( radius_squared ) * 2; // radius to diameter
      return WIRE_VIEW_HEIGHT_RANGE.max / WIRE_DIAMETER_MAX * diameter;
    };

    // Linear mapping transform
    var lengthToWidth = new LinearFunction(
      ResistanceInAWireConstants.LENGTH_RANGE.min,
      ResistanceInAWireConstants.LENGTH_RANGE.max,
      WIRE_VIEW_WIDTH_RANGE.min,
      WIRE_VIEW_WIDTH_RANGE.max,
      true );

    // Create a container node for the dots, and the tandems to go along with it.
    var dotsNodeTandem = tandem.createTandem( 'dotsNode' );
    var dotsNode = new Node( { tandem: dotsNodeTandem } );
    var dotsGroupTandem = dotsNodeTandem.createGroupTandem( 'dots' );

    // Create the dots randomly on the wire. Density is based on AREA_PER_DOT.
    for ( var i = 0; i < NUMBER_OF_DOTS; i++ ) {

      var centerX = ( phet.joist.random.nextDouble() - .5 ) * MAX_WIDTH_INCLUDING_ROUNDED_ENDS;
      var centerY = ( phet.joist.random.nextDouble() - .5 ) * WIRE_VIEW_HEIGHT_RANGE.max;
      var dot = new Circle( DOT_RADIUS, {
        fill: 'black',
        centerX: centerX,
        centerY: centerY,
        tandem: dotsGroupTandem.createNextTandem()
      } );
      dotsNode.addChild( dot );
    }
    this.addChild( dotsNode );

    // Function to map resistivity to number of dots.
    var resistivityToNumberOfDots = new LinearFunction(
      ResistanceInAWireConstants.RESISTIVITY_RANGE.min,
      ResistanceInAWireConstants.RESISTIVITY_RANGE.max,
      NUMBER_OF_DOTS * 0.05,
      NUMBER_OF_DOTS,
      true
    );

    // Update the resistor on change. No need to unlink, as it is present for the lifetime of the sim.
    var self = this;
    Property.multilink( [ model.areaProperty, model.lengthProperty, model.resistivityProperty ],
      function( area, length, resistivity ) {

        // Height of the wire in view coordinates
        var height = areaToHeight( area );

        // Width of the wire (as measured from the top of the wire, that is excluding the rounding bits in the middle).
        var width = lengthToWidth( length );

        // Set the (face) body shape of the wire.
        // Recall that (zero,zero) is defined as the center of the wire.
        wireBody.shape = new Shape().moveTo( -width / 2, height / 2 )
          .horizontalLineToRelative( width )
          .ellipticalArc( width / 2, 0, PERSPECTIVE_FACTOR * height / 2, height / 2, 0, Math.PI / 2, 3 * Math.PI / 2, true )
          .horizontalLineToRelative( -width );

        // Set the cap end of the wire
        wireEnd.shape = Shape.ellipse( -width / 2, 0, height * PERSPECTIVE_FACTOR / 2, height / 2 );

        // Set the gradient on the wire to make it look more 3D.
        wireBody.fill = new LinearGradient( 0, height / 2, 0, -height / 2 )
          .addColorStop( 0, '#8C4828' )
          .addColorStop( 0.5, '#E8B282' )
          .addColorStop( 0.65, '#FCF5EE' )
          .addColorStop( 0.8, '#F8E8D9' )
          .addColorStop( 1, '#8C4828' );

        // Clip the dots that are shown to only include those inside the wire (including the wireEnd).
        dotsNode.clipArea = wireBody.shape.ellipticalArc( -width / 2, 0, PERSPECTIVE_FACTOR * height / 2, height / 2, 0, 3 * Math.PI / 2, Math.PI / 2, true );

        // Set the number of visible dots based on the resistivity.
        var numDotsToShow = resistivityToNumberOfDots( resistivity );
        dotsNode.children.forEach( function( dot, index ) {
          dot.visible = index < numDotsToShow;
        } );

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