// Karma configuration
// Generated on Wed Oct 15 2014 19:47:12 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine-jquery','jasmine'],


      // list of files / patterns to load in the browser
    //files: [
    //  './node_modules/jquery/dist/jquery.js',
    //  './dist/js/header.js',
    //  './dist/js/footer.js',
    //  './tests/**/*.js',
    //  './tests/fixtures/**/*.html'
    //],

    files: [
      "./tests/fixtures/**/*.html",
      "./node_modules/lodash/dist/lodash.js",
      "./node_modules/jquery/dist/jquery.js",
      "./node_modules/tooltipster/js/jquery.tooltipster.js",
      "./node_modules/tablesaw/bower_components/filament-dialog/dist/dialog.build.js",
      "./node_modules/tablesaw/dist/tablesaw.js",
      "./node_modules/html5-placeholder-polyfill/dist/placeholder_polyfill.jquery.min.combo.js",
      "./node_modules/highcharts/js/highcharts.src.js",
      "./node_modules/moment/moment.js",
      "./node_modules/svgeezy/svgeezy.js",
      "./ui/js/vendor/doubleTapToGo.min.js",
      "./ui/js/app.js",
      "./ui/js/lib/content-reveal.js",
      "./ui/js/lib/footnotes.js",
      "./ui/js/lib/nav.js",
      "./ui/js/lib/supporting-content.js",
      "./ui/js/lib/tables.js",
      "./ui/js/lib/tabs.js",
      "./ui/js/lib/data-tables.js",
      "./ui/js/lib/plugins/chart-controls.js",
      "./ui/js/lib/plugins/chart-time-series.js",
      "./ui/js/lib/controllers/charts.js",
      "./ui/js/lib/utils/chart-data-filter.js",
      "./tests/spec/**/*.js"
    ],

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['junit'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
