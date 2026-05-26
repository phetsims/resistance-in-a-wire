// Copyright 2026, University of Colorado Boulder

/**
 * Text with an outline drawn behind the filled glyphs, so the outline appears outside the text.
 *
 * The outline enhances color contrast when the formula letters overlap, see
 * https://github.com/phetsims/resistance-in-a-wire/issues/234
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import type { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import type Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import type Font from '../../../../scenery/js/util/Font.js';
import type TPaint from '../../../../scenery/js/util/TPaint.js';
import ResistanceInAWireConstants from '../ResistanceInAWireConstants.js';

type SelfOptions = {
  font: Font | string;
  fill: TPaint;
  center: Vector2;
  outlineStroke?: TPaint;
  outlineLineWidth?: number;
};

// A small outline width for formula letters enhances color contrast when the red "A" is large enough to cover
// the right hand side characters. See https://github.com/phetsims/resistance-in-a-wire/issues/234
const FORMULA_TEXT_OUTLINE_WIDTH = 0.2;

export type OutlinedTextNodeOptions = SelfOptions;

export default class OutlinedTextNode extends Node {

  public constructor( string: string | number | TReadOnlyProperty<string>, providedOptions: OutlinedTextNodeOptions ) {

    const options = optionize<OutlinedTextNodeOptions, SelfOptions>()( {
      outlineStroke: ResistanceInAWireConstants.BACKGROUND_COLOR,
      outlineLineWidth: FORMULA_TEXT_OUTLINE_WIDTH
    }, providedOptions );

    const outlineText = new Text( string, {
      font: options.font,
      fill: null,
      stroke: options.outlineStroke,
      lineWidth: options.outlineLineWidth,
      center: options.center
    } );

    const fillText = new Text( string, {
      font: options.font,
      fill: options.fill,
      stroke: null,
      center: options.center
    } );

    super( {
      children: [ outlineText, fillText ]
    } );
  }
}
