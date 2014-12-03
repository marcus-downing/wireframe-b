A base WordPress theme based on Bootstrap.

**WARNING: Project in early development, not even vaguely ready to use!**



## Overview

This base theme is built to find the best balance between fast web pages, modern responsive design, and a rich options and a smooth development process. It involves a build step that compiles stylesheets, compiles and minifies scripts and so on. This theme is intended for developers running Linux, Unix or Mac OS, or with access to equivalent command-line tools.

The contents of the `src` directories include:

 - Images to resize and compress
 - Javascript files to minify and combine
 - LESS stylesheets to compile to CSS
 - Fonts to bundle with the CSS
 - PHP library files to load on all pages, in admin, or on specific pages
 - Documentation in markdown to convert to HTML
 - Configuration, such as routes to create boilerplate PHP
 - The complete, unaltered source of Bootstrap

These are all built in one step. Once the theme has been built, the `src` directory and parent theme are not needed, and can be excluded from deploying to live servers.



## Getting started

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

### 3. Build the theme


#### Build once with make

```bash
$ cd themes/my-child-theme
$ make
```

This will put compiled theme files *outside* the `src` folder.

#### Build continuously with Grunt

Alternatively, you can build using Grunt.




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
 - `partials/`, containing fragments such as search results
 - `layouts/`, containing basic page layouts
 - `less/`, containing stylesheets in LESS format
 - `js/`, containing javascripts
 - `images/`, containing images
 - `docs/`, containing documentation in GitHub-flavour markdown
 - `build/`, containing the build script

A child theme's `src` directory can contain any, all or none of these (though it's expected to at least have a `theme.conf` giving it a name).

*Warning:* If you delete the `makefile` from your child theme's `src` directory, you will not be able to build the theme.


### Usage sets

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

In each of these cases, the files are automatically combined and loaded automatically. The theme's `functions.php`, `style.css` etc are built automatically to load these correctly.



## Configuration files

### theme.conf

Contains basic properties about the theme, such as its name, author, URL, copyright and license. This should be in the same syntax as the WordPress style header, but does not need to be wrapped in comments.

```
Theme Name: My child theme
Theme URI: http://www.bang-on.net/
Description: A basic wireframe-bootstrap theme for a Bang site
Author: Bang Communications
Author URI: http://www.bang-on.net/
Version: 1.0
Tags: wireframe
License: None
License URI: None
```

### build.conf

Contains settings to configure the build tool, such as which version of the bootstrap framework to use. This should be in key-pair syntax.

```ini
bootstrap = bootstrap-3.3.1
```

### routes.conf

Contains routes, in a simple syntax

```
GET /patients/:id patient.php
```

