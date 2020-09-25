// Copyright 2016-2020, University of Colorado Boulder

/**
 * The main screen class for the 'Resistance in a Wire' simulation.  This is where the main model and view instances are
 * created and inserted into the framework.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import resistanceInAWire from '../resistanceInAWire.js';
import ResistanceInAWireModel from './model/ResistanceInAWireModel.js';
import ResistanceInAWireScreenView from './view/ResistanceInAWireScreenView.js';

class ResistanceInAWireScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {
    super(
      function() { return new ResistanceInAWireModel( tandem.createTandem( 'model' ) ); },
      function( model ) { return new ResistanceInAWireScreenView( model, tandem.createTandem( 'view' ) ); }, {
        backgroundColorProperty: new Property( '#ffffdf' ),
        tandem: tandem
      }
    );
  }
}

resistanceInAWire.register( 'ResistanceInAWireScreen', ResistanceInAWireScreen );
export default ResistanceInAWireScreen;