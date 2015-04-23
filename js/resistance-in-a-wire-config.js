// Copyright 2002-2013, University of Colorado Boulder

/**
 * RequireJS configuration file for Resistance in a Wire simulation.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner
 */
require.config( {
  deps: [ "resistance-in-a-wire-main" ],

  paths: {

    // third party libraries
    text: '../../sherpa/text-2.0.12',

    // plugins
    audio: '../../chipper/js/requirejs-plugins/audio',
    image: '../../chipper/js/requirejs-plugins/image',
    string: '../../chipper/js/requirejs-plugins/string',

    // PhET libs, uppercase names to identify them in require.js imports
    AXON: '../../axon/js',
    BRAND: '../../brand/js',
    DOT: '../../dot/js',
    JOIST: '../../joist/js',
    KITE: '../../kite/js',
    PHET_CORE: '../../phet-core/js',
    PHETCOMMON: '../../phetcommon/js',
    SCENERY: '../../scenery/js',
    SCENERY_PHET: '../../scenery-phet/js',
    SUN: '../../sun/js',

    // this sim
    RESISTANCE_IN_A_WIRE: '.'
  },

  // optional cache buster to make browser refresh load all included scripts, can be disabled with ?cacheBuster=false
  urlArgs: phet.chipper.getCacheBusterArgs()
} );
