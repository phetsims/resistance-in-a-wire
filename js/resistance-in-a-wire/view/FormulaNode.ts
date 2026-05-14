// Copyright 2013-2026, University of Colorado Boulder

/**
 * Block shows R = ρL/A formula with letters scaling
 * The layout is based off of the equals sign.
 *
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 * @author John Blanco (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import type { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import platform from '../../../../phet-core/js/platform.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import SceneryPhetFluent from '../../../../scenery-phet/js/SceneryPhetFluent.js';
import ParallelDOM from '../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import Node, { type NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import type Tandem from '../../../../tandem/js/Tandem.js';
import ResistanceInAWireFluent from '../../ResistanceInAWireFluent.js';
import type ResistanceInAWireModel from '../model/ResistanceInAWireModel.js';
import ResistanceInAWireConstants from '../ResistanceInAWireConstants.js';
import type ResistanceInAWireDescriber from './ResistanceInAWireDescriber.js';

const areaSymbolStringProperty = ResistanceInAWireFluent.areaSymbolStringProperty;
const lengthSymbolStringProperty = ResistanceInAWireFluent.lengthSymbolStringProperty;
const resistanceSymbolStringProperty = ResistanceInAWireFluent.resistanceSymbolStringProperty;
const symbolResistivityStringProperty = SceneryPhetFluent.symbol.resistivityStringProperty;
const formulaNodeStrings = ResistanceInAWireFluent.a11y.formulaNode;
const formulaNodeAccessibleHeadingStringProperty = formulaNodeStrings.accessibleHeadingStringProperty;
const formulaNodeAccessibleHelpTextStringProperty = formulaNodeStrings.accessibleHelpTextStringProperty;

type FormulaSymbolEntry = {
  labelStringProperty: TReadOnlyProperty<string>;
  center: Vector2;
  property: TReadOnlyProperty<number>;
  color: string;
  tandemName: string;
  cappedSize?: boolean;
};

export default class FormulaNode extends Node {

  public constructor(
    model: ResistanceInAWireModel,
    describer: ResistanceInAWireDescriber,
    tandem: Tandem,
    providedOptions?: NodeOptions
  ) {

    super( {
      tandem: tandem,
      isDisposable: false,

      // pdom
      accessibleHeading: formulaNodeAccessibleHeadingStringProperty,
      accessibleHelpText: formulaNodeAccessibleHelpTextStringProperty,
      accessibleHelpTextBehavior: ParallelDOM.HELP_TEXT_BEFORE_CONTENT
    } );

    // Equals sign, hard coded.
    const equalsSignText = new Text( '=', { // we never internationalize the '=' sign
      font: new PhetFont( { family: ResistanceInAWireConstants.FONT_FAMILY, size: 90 } ),
      fill: ResistanceInAWireConstants.BLACK_COLOR,
      center: new Vector2( 100, 0 ),
      tandem: tandem.createTandem( 'equalsSignText' )
    } );

    // Parent for all letters in the equation - given a 'p' tag for a11y because this node will hold the relative
    // size description, see getRelativeSizeDescription()
    const lettersNode = new Node( { tagName: 'p' } );

    // If we are on a safari platform render with canvas to prevent these issues, but only on safari because
    // canvas doesn't perform as well on other browsers
    // https://github.com/phetsims/resistance-in-a-wire/issues/108 and
    // https://github.com/phetsims/resistance-in-a-wire/issues/112
    if ( platform.safari ) { lettersNode.renderer = 'canvas'; }

    const addFormulaSymbol = ( entry: FormulaSymbolEntry ): TReadOnlyProperty<number> => {
      const text = new Text( entry.labelStringProperty, {
        font: new PhetFont( { family: ResistanceInAWireConstants.FONT_FAMILY, size: 15 } ),
        fill: entry.color,
        center: entry.center,
        tandem: tandem.createTandem( entry.tandemName )
      } );

      // Add an invisible rectangle with bounds slightly larger than the text so that artifacts aren't left on the
      // screen, see https://github.com/phetsims/ohms-law/issues/26.
      // This also serves as the rectangle surrounding the 'R' that 'caps' the scaling when it gets too big.
      const antiArtifactRectangle = Rectangle.bounds( text.bounds.dilated( 1 ), { fill: 'transparent' } );

      const letterNode = new Node( { children: [ antiArtifactRectangle, text ] } );
      lettersNode.addChild( letterNode );

      text.boundsProperty.link( textBounds => {
        antiArtifactRectangle.rectBounds = textBounds.dilated( 1 );
        letterNode.center = entry.center;
      } );

      // Set the scale based on the default value of the property; normalize the scale for all letters.
      const scale = 7 / entry.property.value; // empirically determined '7'
      const scaleMagnitudeProperty = new DerivedProperty( [ entry.property ], value => scale * value + 1 );

      // The size of the formula letter scales with the value the letter represents.
      scaleMagnitudeProperty.link( ( scaleMagnitude: number ) => {
        letterNode.setScaleMagnitude( scaleMagnitude );
        letterNode.center = entry.center;
      } );

      return scaleMagnitudeProperty;
    };

    const resistanceMagnitudeProperty = addFormulaSymbol( {
      labelStringProperty: resistanceSymbolStringProperty,
      center: new Vector2( equalsSignText.centerX - 100, 0 ),
      property: model.resistanceProperty,
      color: ResistanceInAWireConstants.RED_COLOR,
      cappedSize: true, // To make sure that the 'R' doesn't get too big, see https://github.com/phetsims/resistance-in-a-wire/issues/28
      tandemName: 'resistanceSymbolText'
    } );

    const resistivityMagnitudeProperty = addFormulaSymbol( {
      labelStringProperty: symbolResistivityStringProperty,
      center: new Vector2( equalsSignText.centerX + 120, -90 ),
      property: model.resistivityProperty,
      color: ResistanceInAWireConstants.BLUE_COLOR,
      tandemName: 'resistivitySymbolText'
    } );

    const lengthMagnitudeProperty = addFormulaSymbol( {
      labelStringProperty: lengthSymbolStringProperty,
      center: new Vector2( equalsSignText.centerX + 220, -90 ),
      property: model.lengthProperty,
      color: ResistanceInAWireConstants.BLUE_COLOR,
      tandemName: 'lengthSymbolText'
    } );

    const areaMagnitudeProperty = addFormulaSymbol( {
      labelStringProperty: areaSymbolStringProperty,
      center: new Vector2( equalsSignText.centerX + 170, 90 ),
      property: model.areaProperty,
      color: ResistanceInAWireConstants.BLUE_COLOR,
      tandemName: 'areaSymbolText'
    } );

    lettersNode.descriptionContent = describer.createFormulaRelativeSizeDescriptionProperty( {
      resistance: resistanceMagnitudeProperty,
      resistivity: resistivityMagnitudeProperty,
      area: areaMagnitudeProperty,
      length: lengthMagnitudeProperty
    } );

    this.addChild( lettersNode );

    // Add the dividing line and equals sign after the letters so that they are on top when resistance is too large
    this.addChild( equalsSignText );

    // dividing line, hard coded
    this.addChild( new Path( Shape.lineSegment( 150, 8, 400, 8 ), {
      stroke: 'black',
      lineWidth: 6,
      tandem: tandem.createTandem( 'dividingLine' )
    } ) );

    this.mutate( providedOptions );
  }
}
