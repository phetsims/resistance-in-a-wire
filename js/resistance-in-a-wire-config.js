/**
 * Copyright 2002-2013, University of Colorado
 * RequireJS configuration file for Resistance in a Wire simulation.
 * Author: Vasily Shakhov (Mlearner)
 */


require.config( {
                  deps: ["resistance-in-a-wire-main"],

                  paths: {
                    // libs
                    easel: "../lib/easel-0.5.0",
                    i18n: "../lib/i18n/i18n",
                    imagesloaded: '../lib/jquery.imagesloaded',
                    tpl: "../lib/tpl-0.2",
                    fastclick: "../lib/fastclick",

                    // common directories, uppercase names to identify them in require imports
                    PHETCOMMON: "../lib/phet/phetcommon/js",
//                    AXON: '../../axon/js',
                    ASSERT: '../../assert/js'
                  },

                  shim: {
                    easel: {
                      exports: "createjs"
                    }
                  },

                  urlArgs: new Date().getTime()  // cache buster to make browser refresh load all included scripts

                } );
