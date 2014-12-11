# How to write templates

Templates are the first file used to render pages, posts, archives, search results, error messages and others.

## Template hierarchy.

Templates are files in the `src/parts/templates` folder.
They follow the [WordPress template hierarchy](http://codex.wordpress.org/Template_Hierarchy) for deciding which template to apply for a given post.

A template file can contain any code you want, but to get the full benefit of _Wireframe b_ you should follow its convention for building templates out of parts.


## The parts of a template

A template combines a number of parts to make a page:

 - a *layout* defining the overall structure of the page
 - a *main* is the main body area that should contain article content
 - *sidebars* are typically widget areas or nav areas
 - other parts you make up and include, such as search result templates of responsive images

A template is rendered by defining all the parts first, then calling into the layout.

```php
main('article');
sidebar('navbar', 'main-nav');
part('tail', 'disqus');
layout('two');
```

Each line of the template names a part to use to render a given area.
The final line calls `layout()`, which actually draws the given layout, putting all the parts together.


## Parameters



## Bootstrap parts

The Bootstrap theme comes with a number of built-in parts that can be used.

