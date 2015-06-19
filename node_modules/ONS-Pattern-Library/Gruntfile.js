/**
 * ONS Alpha Pattern Library build file
 *
 * This Gruntfile builds the various components of the ONS Alpha pattern library
 * ready for distribution.
 */

var fs = require('fs.extra');
var url = require('url');

module.exports = function (grunt) {

  'use strict';

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-liquid-cx');
  grunt.loadNpmTasks('grunt-pixrem');
  grunt.loadNpmTasks('grunt-prettify');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-relative-root');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-libsass');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-htmldoc');

  grunt.initConfig({

    /*
     * Read options from external JSON files
     */
    pkg: grunt.file.readJSON('package.json'),
    mixture: grunt.file.readJSON('mixture.json'),

    /*
     * Define which SCSS files to lint
     */
    lintScssFiles: [
      'ui/scss/**/*.scss',
      '!ui/scss/project/components/_data-tables.scss',
      '!ui/scss/project/components/_charts.scss',
      '!ui/scss/core/**',
      '!ui/scss/lib/**'
    ],

    /*
     * Define which Javascript files to lint
     */
    lintJsFiles: [
      'ui/js/lib/**/*.js',
      'ui/js/lib/app.js',
      '!ui/js/lib/charts/multi-series.js',
      '!ui/js/lib/controllers/charts.js',
      '!ui/js/lib/plugins/chart-controls.js',
      '!ui/js/lib/plugins/chart-time-series.js',
      '!ui/js/lib/charts/multi-series.js',
      '!ui/js/lib/utils/chart-data-filter.js'
    ],

    /****************************************************
     * Validation tasks
     */

    jshint: {
      options: {
        jshintrc: '.config/.jshintrc',
        reporter: require('jshint-stylish')
      },
      src: ['<%= lintJsFiles %>'],
      build: {
        options: {
          reporter: 'jslint',
          reporterOutput: '../logs/build-jshint.xml',
          force: true
        },
        src: ['<%= lintJsFiles %>']
      }
    },

    scsslint: {
      allFiles: ['<%= lintScssFiles %>'],
      options: {
        bundleExec: false,
        config: '.config/.scss-lint.yml',
        colorizeOutput: true,
        compact: true
      },
      build: {
        options: {
          colorizeOutput: false,
          compact: false
        },
        src: ['<%= lintScssFiles %>']
      }
    },


    /****************************************************
     * Build tasks
     */

    /*
     * Clean the workspace
     */
    clean: {
      build: ['dist', 'converted-html']
    },

    /*
     * Compile the liquid templates to HTML
     */
    liquid_cx: {
      options: {
        global: grunt.file.readJSON('./models/_global.json'),
        defaultLayout: '<%= mixture.templateDefaultLayout %>'
      },
      pages: {
        files: [
          {
            expand: true,
            flatten: false,
            cwd: 'templates',
            src: [
              '**/*.liquid',
              '!layouts/**'
            ],
            dest: 'converted-html',
            ext: '.html'
          }
        ]
      }
    },

    /*
     * The usemin process doesn't respect the IE comments, effectively
     * breaking them.  This fixes the generated output.
     */
    'string-replace': {
      mincss: {
        files: {
          './': 'converted-html/**/*.html'
        },
        options: {
          replacements: [{
            pattern: /\/.html/ig,
            replacement: '.html'
          }, {
            pattern: /main.css"([ ]*)\/>(\n)([ ]+)<!\[endif\]-->/ig,
            replacement: function (match, p1, offset, string) {
              return 'main.css" />\n    <!--<![endif]-->';
            }
          }, {
            pattern: /<!--\[if gt IE 8\]>/ig,
            replacement: '<!--[if gt IE 8]><!-->'
          }]
        }
      },
      dist: {
        files: {
          './': 'converted-html/**/*.html'
        },
        options: {
          replacements: [{
            pattern: /<a\s+(?:[^>]*?\s+)?href=["|']([^"]*)["|']/ig,
            replacement: function (match, p1, offset, string) {

              var retString = '';
              var urlParts = url.parse(p1);

              if (urlParts.protocol) {
                retString = match;
              }
              else if (!urlParts.path) {
                retString = match;
              }
              else {
                // append .html to internal links
                retString = match.replace(p1, p1 + '.html');
              }

              return retString;
            }
          }]
        }
      }
    },

    /*
     * Ensure all html files in `./converted-html` are relative
     * so that they will work correctly when viewed directly.
     */
    relativeRoot: {
      generate: {
        options: {
          root: './converted-html'
        },
        files: [{
          expand: true,
          cwd: './',
          src: [
            './converted-html/**/*.html'
          ],
          dest: './'
        }]
      },
      htmldoc: {
        options: {
          root: './docs'
        },
        files: [{
          expand: true,
          cwd: './',
          src: [
            './docs/**/*.html'
          ],
          dest: './'
        }]
      }
    },

    /*
     * Format the HTML so that indentation etc. is correct.
     *
     * We're using liquid templates which means that when they are
     * generated into HTML it is highly unlikely that the
     * formatting will be ok, so automate it.
     */
    prettify: {
      options: {
        indent: 2,
        indent_char: ' ',
        wrap_line_length: 78,
        brace_style: 'expand',
        unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u', 'strong']
      },
      files: {
        expand: true,
        flatten: false,
        cwd: 'converted-html',
        src: [
          '**/*.html'
        ],
        dest: 'converted-html',
        ext: '.html'
      }
    },

    /*
     * Look for JS files to concatenate as part of the useMin process.
     * Details of this is beyond the scope of these comments, so
     * @see https://github.com/yeoman/grunt-usemin
     */
    useminPrepare: {
      options: {
        dest: './',
        root: './',
        flow: {
          html: {
            steps: {
              js: ['concat'],
              css: ['concat']
            },
            post: {}
          }
        }
      },
      html: 'templates/includes/**/*.liquid'
    },

    /*
     * Perform the rewrites based on the useminPrepare configuration
     * @see https://github.com/yeoman/grunt-usemin
     */
    usemin: {
      html: ['converted-html/**/*.html'],
      options: {
        assetsDirs: ['./']
      }
    },

    /*
     * Copy any generated files to the appropriate places.
     */
    copy: {

      /*
       * Copy images and fonts into the `dist` folder as these
       * are part of the distributions
       */
      dist: {
        files: [
          {expand: true, cwd: 'ui/', src: ['img/**'], dest: 'dist/'},
          {expand: true, cwd: 'ui/', src: ['fonts/**'], dest: 'dist/'},
        ]
      },

      /*
       * Move files into the generated HTML folder
       */
      convertedUi: {
        src: 'ui/img/**/*',
        dest: 'converted-html/'
      },
      convertedDist: {
        src: 'dist/**/*',
        dest: 'converted-html/'
      }
    },


    /*
     * Compile SCSS files to CSS using libsass
     */
    libsass: {
      dist: {
        options: {
          "style": "nested"
        },
        files: {
          'ui/css/main.css': 'ui/scss/main.scss',
          'ui/css/oldie.css': 'ui/scss/oldie.scss'
        }
      }
    },

    /*
     * Add vendor-prefixes to CSS files after they have
     * been generated.  This is preferred over using Compass
     * for file size / performance gain.
     */
    autoprefixer: {
      options: {
        options: {
          browsers: ['<%= mixture.autoPrefixer.browsers %>']
        }
      },
      all: {
        src: 'ui/css/*.css'
      }
    },

    /*
     * Task: Convert `rem` to `px` units after the CSS has
     * been generated.   This is preferred over using Compass
     * for file size / performance gain.
     */
    pixrem: {
      normal: {
        options: {
          rootvalue: '10px',
          replace: false
        },
        src: 'ui/css/main.css',
        dest: 'ui/css/main.css'
      },
      oldie: {
        options: {
          rootvalue: '10px',
          replace: true
        },
        src: 'ui/css/oldie.css',
        dest: 'ui/css/oldie.css'
      }
    },

    /****************************************************
     * Optimisation tasks
     */

    /*
     * Minify the CSS files for performance boost
     */
    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },

    /*
     * Minify Javascript files for performance boost
     */
    uglify: {
      options: {
        preserveComments: 'some'
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/js',
          src: '**/*.js',
          dest: 'dist/js',
          ext: '.min.js'
        }]
      }
    },


    /****************************************************
     * Developer tasks
     */

    /*
     * Run automated JS tests.
     */
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      continuous: {
        singleRun: true,
        browsers: ['PhantomJS']
      },
      dev: {
        reporters: 'dots'
      }
    },

    /****************************************************
     * Utility tasks
     */

    /*
     * Run an express server to preview the built HTML files in
     * `./converted-html`
     */
    express: {
      options: {
        background: false,
        script: './.config/server.js'
      },
      defaults: {}
    },


    htmldoc: {
      options: {
        configFile: "./.styleguide/config.yaml"
      },
      custom_options: {
        publish: "docs"
      }
    }

  });



  /****************************************************
   * Custom tasks
   */

  grunt.registerTask('default', ['build']);

  grunt.registerTask('remtopx', ['pixrem:normal', 'pixrem:oldie']);

  grunt.registerTask('test', ['karma:dev']);

  /* The first stage build for integration - no optimisations applied */
  grunt.registerTask('build', [
    'clean',
    'libsass',
    'autoprefixer',
    'remtopx',
    'liquid_cx',
    'relativeRoot:generate',
    'string-replace:dist',
    'useminPrepare',
    'concat',
    'usemin',
    'cssmin',
    'uglify',
    'prettify',
    'copy',
    'string-replace:mincss',
    'htmldoc',
    'relativeRoot:htmldoc',
  ]);

};
