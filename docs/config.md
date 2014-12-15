## Configuration files

The files in the `src/config` directory are used to configure the way the theme is built and rendered

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

