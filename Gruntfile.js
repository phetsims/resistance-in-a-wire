/*
 * Configuration file for Grunt.
 * Used to configure or define tasks, and load Grunt plugins.
 */
module.exports = function ( grunt ) {

  // Project configuration.
  grunt.initConfig(
      {
        pkg: '<json:package.json>',

        jshint: {
          files: [ 'js/**/*.js' ],
          options: {
            curly: true,
            eqeqeq: true,
            immed: false,
            latedef: false,
            newcap: true,
            noarg: true,
            sub: true,
            undef: true,
            boss: true,
            eqnull: true,
            browser: true,
            node: true,
            jquery: true,
            expr: true,
            globals: {
              Modernizr: true,
              define: true,
              $: true
            }
          }
        },

        requirejs: {
          compile: {
            options: {
              mainConfigFile: "js/resistance-in-a-wire-config.js",
              out: "deploy/debug/resistance-in-a-wire-debug.js",
              name: "resistance-in-a-wire-config",
              wrap: true,
              uglify: {
                // turn off name mangling to make debugging easier
                no_mangle: true
              }
            }
          }
        },

        // Concatenate files.
        concat: {
          "deploy/debug/resistance-in-a-wire-debug.js": [
            "contrib/almond-0.2.5.js",
            "deploy/debug/resistance-in-a-wire-debug.js"
          ]
        },

        // Minify files with UglifyJS.
        uglify: {
          "deploy/release/resistance-in-a-wire.min.js": [
            "deploy/debug/resistance-in-a-wire-debug.js"
          ]
        }
      } );

  // Register tasks
  grunt.registerTask( 'default', [ 'jshint', 'requirejs', 'concat', 'uglify'] );

  // Load tasks
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-requirejs' );
  grunt.loadNpmTasks( 'grunt-contrib-concat' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
};