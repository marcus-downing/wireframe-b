# Wireframe b

A WordPress theme toolkit using Twitter Bootstrap and Grunt.

This theme builder is intended for developers of complex themes, providing a balance between fast web pages, responsive design and a smooth development process. Rather than interactive design tools, its focus is on generating high-performance code using a compile step. To run it you'll need to be using Linux, Mac OS, Unix or similar, and familiar with running tasks on the command line. It requires Wordpress 4.0, PHP 5.4 and Node.js.

**WARNING: Project in early development, not even vaguely ready to use!**

Its benefits include:

 - Fewer HTTP requests
 - Smaller HTML, Javascript, CSS and images
 - Clean separation of layout from content
 - All the features of Bootstrap, with PHP helper functions
 - Keep your private details private by not publishing the sources
 - Handles fonts correctly, and builds an icon font from SVGs
 - Fully i18n ready

It does this with a build step (automated with Grunt) that compiles stylesheets, minifies scripts and so on. It takes files in a `src` directory, including:

 - Images to resize and compress
 - Javascript files to minify and combine
 - LESS and/or SASS stylesheets to compile to CSS
 - Fonts to bundle with the CSS, or links to externally hosted fonts
 - PHP library files to load on all pages, in admin, or on specific pages
 - Templates, layout files and partials, in either PHP or a template language
 - Documentation in markdown to convert to HTML
 - Configuration

Combined with files in the `src` directory of the parent theme:

 - Default configuration
 - Plenty of helpful library functions
 - Useful LESS stylesheet mixins
 - Libraries: lodash.js
 - The complete, unaltered source of Bootstrap

Once the theme has been built, the `src` directory and parent theme are not needed, and can be excluded from deploying to live servers.



## Getting started

### Requirements

The build process uses Node.js, Grunt and a number of other tools. To ensure the requirements are met, run this on the command line:

```bash
$ cd themes/wireframe-b/src
$ npm install
```

### 1. Create a theme

Start by copying the `theme-template` folder and putting it alongside the parent theme.

 - `themes/`
   - `wireframe-bootstrap/`
     - `src/`
  - `my-child-theme/`
    - `src/`

### 2. Set the theme's identity

Edit the file `my-child-theme/src/config/theme.conf`, changing at least this one line:

```
Theme Name: My theme
```

### 3. Build the theme

To install Grunt into your theme, first call:

```bash
$ cd themes/my-child-theme/src
$ npm install
```

This puts a copy of Grunt into your theme's `src/node_modules` directory. Then simply call:

```bash
$ grunt
```

This will compile your theme and put the resulting theme files *outside* the `src` folder. To have grunt watch the folder for changes and compile continuously as you work, use:

```bash
$ grunt watch
```

### 4. Deploy

Copy or symlink the theme into your WordPress installations's `wp-content/themes` directory. You do not need to copy the `src` directory, nor do you need the parent theme.


## Making your theme

The parent theme's `src` directory should contain folders for LESS stylesheets, Javascripts, templates, libraries, configuration, images, fonts etc. A child theme's `src` directory can contain any, all or none of these.

*Warning:* Your `src` folder will also contain files called `Gruntfile.js` and `packages.json`. Do not delete these!


## Documentation

The theme's `docs` folder contains documentation describing how to make your theme.

 - [Getting started](docs/getting-started.html)
 - [Creating templates, layouts, sidebars and parts](docs/templates.html)
 - [Writing LESS/CSS, Javascript and using PHP libraries](docs/css-js-php.html)
 - [Using fonts](docs/fonts.html)
 - [Creating an icon font from SVG images](docs/icons.html)
 - [Configuring your theme](docs/config.html)
 - [Set up multi-level themes for commonality](docs/multi-level.html)