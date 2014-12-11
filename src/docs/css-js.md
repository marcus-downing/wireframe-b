# Writing LESS/CSS, Javascript and using PHP libraries

The grunt compilation step takes the various LESS stylesheets, Javascript files and libraries, and PHP code files in the `src` folders. It combines them to 

## Asset sets

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

If a set folder contains a file with the same name, such as `js/main/main.js` or `less/ie8/ie8.less`, only that file will be loaded and it must contain links to the other files to include. Otherwise all files in the folder will be loaded.

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

### custom 

You can create custom sets of scripts, stylesheets and PHP code to load on certain pages. Just create a corresponding folder. For example, if setting up a "Contact us" page with an interactive map:

 - `lib/`
   - `contact-us/`
     - `contact-form.php`
     - `maps.php`
 - `less/`
   - `contact-us/`
     - `contact-form.less`
     - `maps.less`
 - `js/`
   - `contact-us/`
     - `contact-form-validation.js`
     - `maps.js`
     - `mapdata.js`

These files are all collectively loaded by placing this code at the top of the 