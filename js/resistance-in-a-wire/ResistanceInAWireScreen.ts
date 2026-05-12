// Copyright 2016-2026, University of Colorado Boulder

/**
 * The main screen class for the 'Resistance in a Wire' simulation. This is where the main model and view instances are
 * created and inserted into the framework.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import SliderControlsAndBasicActionsKeyboardHelpContent from '../../../scenery-phet/js/keyboard/help/SliderControlsAndBasicActionsKeyboardHelpContent.js';
import Tandem from '../../../tandem/js/Tandem.js';
import ResistanceInAWireModel from './model/ResistanceInAWireModel.js';
import ResistanceInAWireScreenView from './view/ResistanceInAWireScreenView.js';

export default class ResistanceInAWireScreen extends Screen<ResistanceInAWireModel, ResistanceInAWireScreenView> {

  public constructor( tandem: Tandem ) {

    const options = {
      backgroundColorProperty: new Property( '#ffffdf' ),
      tandem: tandem,
      createKeyboardHelpNode: () => new SliderControlsAndBasicActionsKeyboardHelpContent()
    };

    super(
      () => new ResistanceInAWireModel( tandem.createTandem( 'model' ) ),
      model => new ResistanceInAWireScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}
