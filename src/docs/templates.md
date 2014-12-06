## How to write templates

Templates are the first file used to render.

Templates are files in the `src/templates` folder.
They follow the [WordPress template hierarchy](http://codex.wordpress.org/Template_Hierarchy) for deciding which template to apply for a given post.

While a template file can contain any code you want, to get the full benefit of _Wireframe B_ you should follow its convention for building templates out of parts.


### Template parts

A template consists of a number of parts combined:

 - *layout* defines the overall structure of the page
 - *main* is the main body area that should contain article content
 - *sidebars* are typically widget areas or nav areas
 - other parts may be less conventional

A template is rendered by defining all the parts first, then calling into the layout.

```php
main('article');
sidebar('navbar', 'main-nav');
part('tail', 'disqus');
layout('two');
```

Each line of the template names a part to use to render a given area.
The final line calls `layout()`, which actually draws the given layout, putting all the parts together.


### Parameters

