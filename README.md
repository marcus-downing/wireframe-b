# Wireframe b

A [WordPress](https://wordpress.org/) theme-building toolkit using [Bootstrap](http://getbootstrap.com/) and [Grunt](http://gruntjs.com/).

This theme builder is intended for developers of complex themes, providing a balance between fast web pages, responsive design and a smooth development process. Rather than interactive design tools, its focus is on generating high-performance code using a compile step. To run it you'll need to be using Linux, Mac OS, Unix or similar, and familiar with running tasks on the command line.

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
 - LESS stylesheets to compile to CSS
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

 - WordPress 4.1
 - PHP 5.4
 - Node.js

The build process uses Node.js, Grunt and a number of other tools. To ensure the requirements are met, run this on the command line:

### 1. Create a theme

Start by copying the `theme-template` folder, and renaming it to your desired name. It should look something like this:

  - `example-theme/`
     - `src/`
         - `Gruntfile.js`
         - `package.json`
         - `config/`
         - `js/`
         - `less/`
         - `parts/`

There should be nothing outside the `src` directory to start with.

### 2. Set the theme's identity

Edit the file `my-child-theme/src/package.json`, changing at least these few lines:

```
{
  "name": "example-theme",
  "title": "My example theme",
  "description": "Something about your theme"
}
```

These details and others in `package.json` will be used to produce the WordPress theme metadata.
The `name` has to be a slug-friendly name, which should match the folder name.
The `title` is the name that will appear in WordPress admin.

You should not need to change anything in `Gruntfile.js` right now, but have a look at it anyway.

### 3. Build the theme

To install wireframe-b, Grunt, and other dependencies into your theme, first call:

```bash
$ cd example-theme/src
$ npm install
```

This puts a copy of Grunt into your theme's `src/node_modules` directory. Then simply call:

```bash
$ grunt
```

This will compile your theme and put the resulting theme files *outside* the `src` folder. 
To have grunt watch the folder for changes and compile continuously as you work, use:

```bash
$ grunt watch
```

### 4. Deploy

Copy or symlink the theme into your WordPress installations's `wp-content/themes` directory. 
You can leave out the entire `src` directory from your copy, and you don't need to have a copy of _Wireframe b_ present for it to work -- the compiled theme is completely self-contained.


## Making your theme

Your theme's `src` directory can contain any of the following:

 - `js` for JavaScripts and JavaScript libraries
 - `less` for Stylesheets (in LESS format)
 - `lib` for PHP libraries
 - `fonts` for webfonts
 - `icons` for SVG icons that will become a webfont
 - `images` for images
 - `parts` for PHP templates:
 - `i18n` for translations
 - `docs` for documentation (in Markdown format)

*Warning:* Your `src` folder will contain files called `Gruntfile.js` and `packages.json`. Do not delete these!

### Sets

Several of these folders (including `js`, `less` and `lib`) are divided into sets that are automatically included in the appropriate place.

### Building templates

Your theme's `src/parts` directory should contain:

 - `templates` for full page templates
 - `layouts` for page layout templates
 - `main` for main content area templates
 - `headers` for header templates
 - `footers` for footer templates
 - `sidebars` for sidebar templates
 - `articles` for items to appear in search results
 - `fragments` for other re-usable parts

These parts are combined to produce the templates used by WordPress.
The files in `templates` correspond to the files in [the WordPress template hierarchy](http://codex.wordpress.org/Template_Hierarchy).
Grunt compiles the parts of a template - its layout, main, fragments etc - into a single PHP file for the template. This doesn't include the header, footer and 

Layouts determine the shape of the page: columns, sidebars, etc. These should use the Bootstrap responsive grid.





## Documentation

The theme's `docs` folder contains documentation describing how to make your theme.

 - [Getting started](docs/getting-started.html)
 - [Creating templates, layouts, sidebars and parts](docs/templates.html)
 - [Writing LESS/CSS, Javascript and using PHP libraries](docs/css-js-php.html)
 - [Using fonts](docs/fonts.html)
 - [Creating an icon font from SVG images](docs/icons.html)
 - [Configuring your theme](docs/config.html)
 - [Set up multi-level themes for commonality](docs/multi-level.html)