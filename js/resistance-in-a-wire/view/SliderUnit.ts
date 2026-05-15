// Copyright 2017-2026, University of Colorado Boulder

/**
 * Slider unit with a vertical slider, a title above the slider and a readout display below the slider. Layout is dynamic
 * based on the center of the slider.
 * @author Martin Veillette (Berea College)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import type PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import type { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import type RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import { toFixed } from '../../../../dot/js/util/toFixed.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import optionize from '../../../../phet-core/js/optionize.js';
import type { PDOMValueType } from '../../../../scenery/js/accessibility/pdom/ParallelDOM.js';
import type SceneryEvent from '../../../../scenery/js/input/SceneryEvent.js';
import Node, { type NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VSlider, { type VSliderOptions } from '../../../../sun/js/VSlider.js';
import type Tandem from '../../../../tandem/js/Tandem.js';
import ResistanceInAWireConstants from '../ResistanceInAWireConstants.js';

type SelfOptions = {
  sliderOptions?: VSliderOptions;
  startDrag?: () => void;
  endDrag?: () => void;
  decimalPlaces?: number;
};

type SliderUnitOptions = SelfOptions & NodeOptions;

export default class SliderUnit extends Node {

  // Whether the slider is currently being dragged by alternative input. Used by the sound generator.
  public readonly keyboardDraggingProperty: BooleanProperty;

  public constructor( property: PhetioProperty<number>,
                      range: RangeWithValue,
                      symbolString: TReadOnlyProperty<string>,
                      nameStringProperty: TReadOnlyProperty<string>,
                      unitString: TReadOnlyProperty<string>,
                      accessibleName: PDOMValueType,
                      tandem: Tandem,
                      providedOptions?: SliderUnitOptions ) {

    // visiblePropertyOptions must be passed to the Node constructor so the instrumented visibleProperty is created
    // with this metadata. Passing it later through mutate() is too late.
    super( {
      tandem: tandem,
      visiblePropertyOptions: { phetioFeatured: true }
    } );

    const options = optionize<SliderUnitOptions, SelfOptions, NodeOptions>()( {
      sliderOptions: {
        trackFillEnabled: 'black',
        trackSize: new Dimension2( 4, ResistanceInAWireConstants.SLIDER_HEIGHT - 30 ),
        thumbSize: new Dimension2( 45, 22 ),
        thumbFill: '#c3c4c5',
        thumbFillHighlighted: '#dedede',

        // physical values in this sim can have up to 2 decimals
        constrainValue: ( value: number ) => toFixedNumber( value, 2 ),
        startDrag: _.noop,
        endDrag: _.noop,

        // Turn off default sound generation, since this does its own in a highly customized way.
        soundGenerator: null,

        // pdom
        keyboardStep: 1, // delta for keyboard step
        shiftKeyboardStep: 0.01, // delta when holding shift
        roundToStepSize: true, // default keyboard step rounds to pedagogically useful values
        containerTagName: 'li',
        accessibleName: accessibleName,
        mapPDOMValue: ( value: number ) => toFixedNumber( value, 2 ),

        // phet-io
        tandem: tandem.createTandem( 'slider' )
      },

      // {number}
      decimalPlaces: 0,

      startDrag: _.noop,
      endDrag: _.noop
    }, providedOptions );

    this.keyboardDraggingProperty = new BooleanProperty( false );

    // override the start and end drag functions in the slider options
    const providedStartDragFunction = options.startDrag;
    options.sliderOptions.startDrag = ( event: SceneryEvent ) => {
      if ( event.isFromPDOM() ) {
        this.keyboardDraggingProperty.value = true;
      }
      providedStartDragFunction && providedStartDragFunction();
    };
    const providedEndDragFunction = options.endDrag;
    options.sliderOptions.endDrag = () => {
      this.keyboardDraggingProperty.value = false;
      providedEndDragFunction && providedEndDragFunction();
    };

    // text for the symbol, text bounds must be accurate for correct layout
    const symbolText = new Text( symbolString, {
      font: ResistanceInAWireConstants.SYMBOL_FONT,
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH,
      boundsMethod: 'accurate'
    } );

    const nameText = new Text( nameStringProperty, {
      font: ResistanceInAWireConstants.NAME_FONT,
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH
    } );

    const slider = new VSlider( property, range, options.sliderOptions );

    const valueText = new Text( toFixed( range.max, 2 ), {
      font: ResistanceInAWireConstants.READOUT_FONT,
      fill: ResistanceInAWireConstants.BLACK_COLOR,
      maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH
    } );

    const unitText = new RichText( unitString, {
      font: ResistanceInAWireConstants.UNIT_FONT,
      fill: ResistanceInAWireConstants.BLUE_COLOR,
      maxWidth: ResistanceInAWireConstants.SLIDER_WIDTH,
      boundsMethod: 'accurate'
    } );

    // The slider is the stable anchor for the unit. Dynamic locale can change text bounds at runtime, but that should
    // not move the slider or the other slider units in the control panel.
    unitText.y = 0;
    valueText.y = unitText.y - 35;
    slider.bottom = valueText.y - 30;
    slider.centerX = 0;

    const layoutText = () => {

      unitText.centerX = slider.centerX;
      valueText.centerX = slider.centerX;
      nameText.y = slider.top - 5;
      nameText.centerX = slider.centerX;

      symbolText.bottom = nameText.y - 20;
      symbolText.centerX = nameText.centerX;
    };

    unitText.boundsProperty.link( layoutText );
    nameText.boundsProperty.link( layoutText );
    symbolText.boundsProperty.link( layoutText );

    // Add children, from top to bottom of the slider unit
    this.addChild( symbolText );
    this.addChild( nameText );
    this.addChild( slider );
    this.addChild( valueText );
    this.addChild( unitText );

    // Update value of the readout. No need to unlink, present for the lifetime of the simulation.
    property.link( ( value: number ) => {
      valueText.string = toFixed( value, 2 );
      valueText.centerX = slider.centerX;
    } );

    this.mutate( options );
  }
}
