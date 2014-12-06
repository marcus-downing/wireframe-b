A base WordPress theme building on Twitter Bootstrap.

Rather than interactive design tools, this theme is intended for developers of high-performance themes, running Linux, Unix, Mac OS or similar. It requires Wordpress 4.0, PHP 5.4 and Node.js.

**WARNING: Project in early development, not even vaguely ready to use!**


## Overview

This base theme is built to find the best balance between fast web pages, responsive design, and a smooth development process. Its benefits include:

 - Fewer HTTP requests
 - Smaller HTML, minified Javascript and CSS
 - Easier separation of layout from content
 - All the features of Bootstrap, with PHP helper functions
 - Keep your private details private by not publishing the sources

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

### 1. Create a child theme

Start by copying the `child-template` folder and putting it alongside the parent theme.

 - `themes/`
   - `wireframe-bootstrap/`
     - `src/`
  - `my-child-theme/`
    - `src/`

### 2. Set the theme's identity

Edit the file `my-child-theme/src/config/theme.conf`, changing at least this one line:

```
Theme Name: My child theme
```

### 3. Build the child theme

#### Build once

```bash
$ cd themes/my-child-theme/src
$ grunt
```

This will put compiled theme files *outside* the `src` folder.

#### Build continuously

```bash
$ cd themes/my-child-theme/src
$ make c
```

This will use Grunt to watch the filesystem for changes and rebuild the theme.

### 4. Deploy

Copy or symlink the theme into your WordPress installations's `wp-content/themes` directory. You do not need to copy the `src` directory, nor do you need the parent theme.


## Making your theme

### Source folders

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
 - `build/`, containing the build script

A child theme's `src` directory can contain any, all or none of these (though it's expected to at least have a `theme.conf` giving it a name).

*Warning:* Your `src` folder will also contain files called `makefile`, `Gruntfile.js` and `packages.json`. Do not delete these.


### Visibility sets

Several of the source folders (including `lib`, `less`, `js`) follow a similar pattern of subfolders:

 - `lib/`, containing PHP code to include in `functions.php`
   - `main/`, containing PHP code to run on theme pages
   - `admin/`, containing PHP code to run on admin pages
   - `all/`, containing PHP code to run on all pages, whether admin or not
   - ...
 - `less/`, containing stylesheets in LESS format
   - `main/`, containing stylesheets to include on theme pages
   - `admin/`, containing stylesheets to include on admin pages
   - `print/`, containing stylesheets to include only when printing
   - `ie8/`, containing stylesheets to include only on Internet Explorer 8
   - `editor/`, containing stylesheets to include in the visual editor
   - ...
 - `js/`, containing javascripts
   - `main/`, containing javascripts to run on theme pages
   - `admin/`, containing javascripts to run on admin pages
   - `all/`, containing javascripts to run on all pages, whether admin or not
   - ...

In each of these cases, the files are automatically combined and loaded in the correct places. The files `functions.php`, `style.css`, `theme.js` etc are built to load correctly, so the server doesn't need to look up any files dynamically.

#### all

These files are always loaded, whatever page you're looking at.

#### main

These files are loaded for any page *not* in the WordPress admin area.

#### admin

These files are loaded for any page in the WordPress admin area.

#### editor

These files are loaded into the WordPress visual editor in order to provide a better preview. This set only includes stylesheets, not javascripts.

#### ie8 / ie9 / etc

These files are loaded only on the relevant browsers. Note that server-side detection of browsers via user agent is imperfect and should be avoided.

#### 


## Learn more

The theme's `docs` folder contains documentation...