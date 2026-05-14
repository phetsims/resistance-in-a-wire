// Copyright 2017-2026, University of Colorado Boulder

/**
 * View of the wire, includes dots that depict the level of resistivity
 *
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 * @author John Blanco (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Shape from '../../../../kite/js/Shape.js';
import platform from '../../../../phet-core/js/platform.js';
import Node, { type NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import LinearGradient from '../../../../scenery/js/util/LinearGradient.js';
import type Tandem from '../../../../tandem/js/Tandem.js';
import ResistanceInAWireFluent from '../../ResistanceInAWireFluent.js';
import type ResistanceInAWireModel from '../model/ResistanceInAWireModel.js';
import DotsCanvasNode from './DotsCanvasNode.js';
import WireShapeConstants from './WireShapeConstants.js';

export default class WireNode extends Node {

  /**
   * The position is set using center values since this can grow or shrink in width and height as the area and length of
   * the wire changes.
   */
  public constructor(
    model: ResistanceInAWireModel,
    tandem: Tandem,
    providedOptions?: NodeOptions
  ) {

    super( {
      tandem: tandem,

      // pdom
      accessibleHeading: ResistanceInAWireFluent.a11y.wireNode.accessibleHeadingStringProperty,
      isDisposable: false
    } );

    // See https://github.com/phetsims/resistance-in-a-wire/issues/158
    const wireBodyRenderer = platform.android ? 'canvas' : null;

    // Body of the wire
    const wireBody = new Path( null, {
      stroke: 'black',
      tandem: tandem.createTandem( 'wireBody' ),
      renderer: wireBodyRenderer
    } );

    // Cap/end of the wire
    const wireEnd = new Path( null, {
      stroke: 'black',
      fill: '#E8B282',
      tandem: tandem.createTandem( 'wireEnd' ),
      renderer: wireBodyRenderer
    } );

    this.addChild( wireBody );
    this.addChild( wireEnd );

    // all dots representing resistivity
    const dotsNode = new DotsCanvasNode( model );
    this.addChild( dotsNode );

    // Update the resistor on change. No need to unlink, as it is present for the lifetime of the sim.
    Multilink.multilink( [ model.areaProperty, model.lengthProperty, model.resistivityProperty ],
      ( area, length, _resistivity ) => {

        // Height of the wire in view coordinates
        const height = WireShapeConstants.areaToHeight( area );

        // Width of the wire (as measured from the top of the wire, that is excluding the rounding bits in the middle).
        const width = WireShapeConstants.lengthToWidth.evaluate( length );

        // Set the (face) body shape of the wire.
        // Recall that (zero,zero) is defined as the center of the wire.
        wireBody.shape = new Shape().moveTo( -width / 2, height / 2 )
          .horizontalLineToRelative( width )
          .ellipticalArc( width / 2, 0, WireShapeConstants.PERSPECTIVE_FACTOR * height / 2, height / 2, 0, Math.PI / 2, 3 * Math.PI / 2, true )
          .horizontalLineToRelative( -width );

        // Set the cap end of the wire
        wireEnd.shape = Shape.ellipse( -width / 2, 0, height * WireShapeConstants.PERSPECTIVE_FACTOR / 2, height / 2, 0 );

        // Set the gradient on the wire to make it look more 3D.
        wireBody.fill = new LinearGradient( 0, height / 2, 0, -height / 2 )
          .addColorStop( 0, '#8C4828' )
          .addColorStop( 0.5, '#E8B282' )
          .addColorStop( 0.65, '#FCF5EE' )
          .addColorStop( 0.8, '#F8E8D9' )
          .addColorStop( 1, '#8C4828' );

        // Redraw the dots representing resistivity.
        dotsNode.invalidatePaint();
      }
    );

    this.mutate( providedOptions );
  }

}
