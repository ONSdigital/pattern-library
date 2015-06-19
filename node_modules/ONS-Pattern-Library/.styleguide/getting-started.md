# Getting Started

## Installation

### Manual Download

You can download the entire framework from Github at [https://github.com/ONSdigital/pattern-library/archive/master.zip](https://github.com/ONSdigital/pattern-library/archive/master.zip).

Within this zip file, the `dist` folder contains the latest files required to use the library:


```
<!-- Latest compiled and minified CSS to go in head -->
<link rel="stylesheet" href="/dist/css/main.css"/>

<!-- Latest minified and concatenated JS to go in head -->
<script src="/dist/js/header.min.js"></script>

<!-- Latest minified and concatenated JS to go in the footer -->
<script src="/dist/js/footer.min.js"></script>

```


### Install with NPM

If you have Node.js installed, then the framework can be installed using the following command:

This is the preferred method of installation.

```
npm install ONSdigital/pattern-library
```

Within your HTML:

```
<!-- Latest compiled and minified CSS to go in head -->
<link rel="stylesheet" href="/node_modules/ONS-Pattern-Library/dist/css/main.css"/>

<!-- Latest minified and concatenated JS to go in head -->
<script src="/node_modules/ONS-Pattern-Library/dist/js/header.min.js"></script>

<!-- Latest minified and concatenated JS to go in the footer -->
<script src="/node_modules/ONS-Pattern-Library/dist/js/footer.min.js"></script>

```

## What's included

### Compiled JS and CSS

The `dist` folder within the library contains both non-minified and minified JS and CSS.

The minified code is recommended for use in production, the non-minified versions used in development.

[jQuery 1.11](http://jquery.com/) is built in to the compiled JS.

### Source code

The repository contains all source code required to build the library and its documentation, including SCSS, HTML template files and Javascript.

It also includes all Javascript dependencies include jQuery, which are managed by NPM.

See [Building the library](/page-getting-started.html#building-the-library) below for more information.


## Usage

Below is a [basic HTML](/templates-examples-basic-starter-external.html) template.  For more examples of pages in use, look at the example templates.


```
<!--[if IE]><![endif]-->
<!DOCTYPE html>
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8 ie7"><![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9 ie8"><![endif]-->
<!--[if IE 9]><html class="no-js ie9"><![endif]-->
<!--[if gt IE 8]><!--><html class="no-js"><!--<![endif]-->
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>Starter Basic</title>
    <meta charset="utf-8" />
    <meta content="width=device-width,initial-scale=1.0" name="viewport" />
    <meta content="on" http-equiv="cleartype" />
    <meta name="format-detection" content="telephone=no">


    <!--[if IE]><![endif]-->
    <!-- build:css /dist/css/oldie.css-->
    <!--[if lte IE 8]>
      <link rel="stylesheet" href="/node_modules/ons-alpha/dist/css/main.css"/>
    <![endif]-->
    <!-- endbuild -->

    <!-- build:css /dist/css/main.css-->
    <!--[if gt IE 8]><!-->
      <link rel="stylesheet" href="/node_modules/ons-alpha/dist/css/oldie.css"/>
    <!--<![endif]-->
    <!-- endbuild -->

    <script src="/node_modules/ons-alpha/dist/js/header.min.js"></script>

  </head>
  <body>
    <div class="wrapper panel--mar">
      <h1>Hello world!</h1>
    </div>

    <script src="/node_modules/ons-alpha/dist/js/footer.min.js"></script>
  </body>
</html>
```

The above example doesn't feature a grid. Grids are (to some extent) fundamental to responsive websites.  The available grids are [documented here](/visual-language-grid.html), and an appropriate grid is used in [this example](/templates-examples-desktop-grid.html).

```

<!--[if IE]><![endif]-->
<!DOCTYPE html>
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8 ie7"><![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9 ie8"><![endif]-->
<!--[if IE 9]><html class="no-js ie9"><![endif]-->
<!--[if gt IE 8]><!--><!-->
<html class="no-js">
  <!--<![endif]-->
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>- CX partners</title>
    <meta charset="utf-8" />
    <meta content="width=device-width,initial-scale=1.0" name="viewport" />
    <meta content="on" http-equiv="cleartype" />
    <meta name="format-detection" content="telephone=no">
    <!--[if IE]><![endif]-->
    <!--[if lte IE 8]>
        <link rel="stylesheet" href="/dist/css/oldie.css"/>
    <![endif]-->
    <!--[if gt IE 8]><!-->
        <link rel="stylesheet" href="/dist/css/main.css"/>
    <![endif]-->
    <script src="/dist/js/header.js"></script>
  </head>
  <body class="">
    <a class="skiplink visuallyhidden focusable" href="#main" tabindex="0">
      <span>Skip to main content</span>
    </a>
    <div class="wrapper panel--mar">
      <h1>Desktop grid</h1>
      <div class="grid-wrap">
        <div class="grid-col desktop-grid-full-width">
          <code>Full width</code>
        </div>
      </div>
      <div class="grid-wrap">
        <div class="grid-col desktop-grid-one-half">
          <code>One Half</code>
        </div>
        <div class="grid-col desktop-grid-one-half">
          <code>One half</code>
        </div>
      </div>
      <div class="grid-wrap">
        <div class="grid-col desktop-grid-one-third">
          <code>One Third</code>
        </div>
        <div class="grid-col desktop-grid-two-thirds">
          <code>Two Thirds</code>
        </div>
      </div>
      <div class="grid-wrap">
        <div class="grid-col desktop-grid-one-quarter">
          <code>One Quarter</code>
        </div>
        <div class="grid-col desktop-grid-three-quarters">
          <code>Three Quarters</code>
        </div>
      </div>
      <div class="grid-wrap">
        <div class="grid-col desktop-grid-one-sixth">
          <code>One Sixth</code>
        </div>
        <div class="grid-col desktop-grid-five-sixths">
          <code>Five Sixths</code>
        </div>
      </div>
    </div>
    <script src="/dist/js/footer.js"></script>
  </body>
</html>
```


## Examples

The pattern library contains a [number of examples](/templates-templates.html) that have been used in user testing.  These can be used as the basis for other pages, or as a demonstration on how the library can be used.


## Building the library

All source code required to build the library is contained within this repository.

The library uses [Grunt](http://gruntjs.com/) to build the sources files (SCSS, Liquid template files, JS) into the documentation, Javascript and CSS files.

For instructions on how to install Grunt, visit it's [http://gruntjs.com/](http://gruntjs.com/).

### Grunt commands

The primary Grunt tasks are:

#### `grunt jshint`: Validate Javascript

Validates the Javascript source files in accordance with the [JSHint](http://www.jshint.com/) configuration file found in [`./.config/.jshintrc`](https://github.com/ONSdigital/pattern-library/blob/master/.config/.jshintrc).

#### `grunt scsslint`: Validate SCSS

Validates the SCSS source files in accordance with the [SCSSLint](https://github.com/causes/scss-lint) configuration file found in [`./.config/.scss-lint.yml`](https://github.com/ONSdigital/pattern-library/blob/master/.config/.scss-lint.yml).

#### `grunt`: Compile the source files

Generates the CSS from the SCSS files, concatenates and minifies the Javascript files, renders HTML from the Liquid templates files and generates the HTML documentation.

#### `grunt test`: Compile the source files

Run the limited number of Jasmine / Karma Javascript tests using Chrome.



## Browser & OS compatibility

It just isn’t feasible to achieve a consistent experience in all devices. So instead, effort has been focused on achieving the best outcome according to the user’s device capabilities.

Time spent patching dated or broken technology that will soon be obsolete affords us less time to finesse the user experience on devices that are more capable and have a growing market share.

Shown below is the list of browsers and devices that the library has been tested with, along with applicable support grade. This list provides broad coverage of the current market share of devices, browsers and operating systems.

### Browser Grades

| Browser grade | Functionality | Visual Fidelity |
|-|-|-|
| A | All functionality should work as expected. | High visual fidelity (though not necessarily identical in every browser). |
| B | Able to navigate to and view all content. All functionality should work, with minor deviations from the designed behaviour. | Some minor differences. |
| C | Able to navigate to and view core content. Some user flows may differ from the designed behaviour. | Deviations from the visual design are acceptable, although readability should not be significantly compromised. |

### Desktop Browsers

| Browser | Version | OS | Grade |
|-|-|-|-|
| IE | 11 | Win 8 | A |
| IE | 10 | Win 7 | A |
| IE | 9 | Win 7 | A |
| IE | 8 | Win 7 | B |
| Chrome | Latest Stable | Win 7 | A |
| Chrome | Latest Stable | Mac | A |
| FF | Latest Stable | Win 7 | A |
| FF | Latest Stable | Mac | A |
| Safari | 6 | Mac | A |
| Opera | Latest Stable | Win 7 | B |
| Opera | Latest Stable | Mac | B |

### Handheld Browsers

| Device | OS | Browser | Grade | Effective Resolution |
|-|-|-|-|-|
| iPad 3 | iOS 7.x | Safari | A | 1024 x 768 |
| iPad 2 | iOS 6.x | Safari | A | 1024 x 768 |
| Nexus 7 | Android 4.x | Chrome | A | 960 x 600 |
| Galaxy S3 | Android 4.x | Native | A | 360 x 640 |
| iPhone 5 | iOS 7.x | Safari | A | 320 x 568 |
| iPhone 4 | iOS 6.x | Safari | A | 320 x 480 |


### Internet Explorer

> IE7 is dead and IE8 is on life support - the Alpha will be designed for IE9 onwards as well as the latest versions of Chrome, Firefox, Safari etc. Every effort will be made to ensure it at least works in IE8 but with an expectation that some features will fail (gracefully).
["ONS Rules of Engagement"]()


To be sure you're using the latest rendering mode include the following meta tag:

`<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />`

## Accessibility

The approach to accessibility follows the GDS service manual guidelines, but in general, a 'common sense’ approach to accessibility has been taken, using the WAI guidelines to inform decisions rather than treating adherence as a box ticking exercise.

Core content will be available to all user agents, including those without JavaScript.


## Development

This framework represents a library, which along with the HTML patterns outlined in the documentation, can be used to create ONS web services and sites.

The library itself is intended to be contributed to, so that any new patterns, components etc., can be added to the library.

### Project Structure

#### SCSS & JS

The SCSS and Javascript source code is contained within the `./ui/` folder.

#### HTML

To create the HTML patterns that are used within the library, the [Liquid templating](http://docs.mixture.io/templates) language is used.  All templates can be found in the `./templates`.

There are two methods of compiling the templates:

- Using the `grunt build` process outlined in 'Building the library'.  When this is run, HTML is output to the `./converted-html` folder as static files.  This method is primarily intended to be used in a CI build process as it can be run from the commandline.
- Using the [Mixture.io](http://mixture.io/) prototyping application.

Any new patterns need to be annotated (see [Documentation](/page-getting-started.html#documentation)) in the HTML and then the style guide re-built using the `grunt build`, which runs the tasks `htmldoc`.


### Contributing

To contribute to the official ONS pattern library, the Github repository should first be [forked](https://help.github.com/articles/fork-a-repo/). When changes to the library have been completed, a [pull request](https://help.github.com/articles/using-pull-requests/) should be made.


### Code validation

All code contained within the pattern library adheres to the following standards.

#### HTML

The library contains valid HTML(5), and has been validated against the W3C specification using the [W3C's Unified Validator](http://validator.w3.org/unicorn/).

There a number of whitelisted HTML errors that are excluded from the HTML validation, for example, this proprietary meta tag allows us to activate ClearType for smoothing fonts for easy reading in Mobile Internet Explorer:.

`<meta content="on" http-equiv="cleartype" />`

These are listed in: [`./.config/.htmlvalidation.build.yaml`](https://github.com/ONSdigital/pattern-library/blob/master/.config/.htmlvalidation.build.yaml).

#### Javascript

The Javascript source files are validated using [JSHint](http://www.jshint.com/) in accordance with the configuration file found in [`./.config/.jshintrc`](https://github.com/ONSdigital/pattern-library/blob/master/.config/.jshintrc).

#### SCSS

The SCSS source files are validated using [SCSSLint](https://github.com/causes/scss-lint) in accordance with the configuration file found in [`./.config/.scss-lint.yml`](https://github.com/ONSdigital/pattern-library/blob/master/.config/.scss-lint.yml).

An explicit decision has been made to build the library using proprietary CSS where required (for example vendor prefixes) that aren’t part of the WC3 CSS specs.  This is one of the reasons CSS linting hasn't been used.


## Documentation

Within the library, documentation is generated from [annotations contained within the HTML source files](https://github.com/cxpartners/HTMLDoc) and built to the directory `./docs`.

The information contained within these annotations is combined with templates and markdown documents in `./.styleguide` to create the site that you are currently reading.

The documentation is hosted using [GitHub pages](https://pages.github.com/) and so the contents of the generated documentation directory (i.e. `./docs`) needs to be pushed to the `gh-pages`.

The easiest way of doing this is to use the Git `subtree` command.

`git subtree push --prefix docs/ origin gh-pages`


## Known Issues

Some of the components produced for this pattern library were created as part of [research spikes](http://scaledagileframework.com/spikes/). In addition, the work in general has been produced to the [GDS Alpha standard](https://www.gov.uk/service-manual/phases/alpha.html).

As such there are a number of known issues and bugs.  These have been captured during development, and any that were determined by the product owner as not needing resolution for the Alpha release, have been added to the Github project's [issue tracker](https://github.com/ONSdigital/pattern-library/issues).







