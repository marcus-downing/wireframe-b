# Getting started

To build a theme using _Wireframe b_, you need a project folder containing both the `wireframe-b` base and your theme, like so:

 - `themes/`
   - `wireframe-b/`
     - `src/`
   - `my-theme/`
     - `src/`
       - `...`

The `wireframe-b` folder should *only* contain the `src` folder. Your code goes into the `my-theme/src` folder. The compiled theme files goes into `my-theme` folder. Once the theme has been built, your theme is self contained: you do not need to ship around the `wireframe-b` parent theme, or your `src` folder.

## Your theme files

At the start, your theme should contain these files:

 - `src/`
   - `package.json`
   - `Gruntfile.js`

Do not delete any of these files.

### Basic config

Your `package.json` should look something like this:



## What's in the parent theme source

The parent theme's `src` directory should contain these folders:

 - `config/`, containing configuration files
   - `theme.conf`, describing the theme
   - `build.conf`, with instructions to the build tool
   - `routes.conf`, directing URLs to templates or instructions
 - `bootstrap/`, containing one or more versions of the Bootstrap sources (LESS version)
   - `bootstrap-3.3.1`, or another more recent version of Bootstrap
 - `lib/`, containing PHP code to include in `functions.php`
 - `templates/`, containing templates corresponding to posts and pages
 - `partials/`, containing fragments such as search results
 - `layouts/`, containing basic page layouts
 - `less/`, containing stylesheets in LESS format
 - `js/`, containing javascripts
 - `images/`, containing images
 - `fonts/`, containing fonts
 - `i18n/`, containing translation files
 - `docs/`, containing documentation in GitHub-flavour markdown
 - `grunt/`, containing the build script

A child theme's `src` directory can contain any, all or none of these (though it's expected to at least have a `theme.conf` giving it a name).

*Warning:* Your `src` folder will also contain files called `Gruntfile.js` and `packages.json`. Do not delete these.
