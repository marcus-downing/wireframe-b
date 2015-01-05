<?php

register_sidebar(array(
  'name' => 'Left Navigation',
  'id' => 'left',
  'before_widget' => '<aside class="widget %2$s">',
  'after_widget' => '</aside>',
  'before_title' => '<h3>',
  'after_title' => '</h3>'
));

register_sidebar(array(
  'name' => 'Sidebar',
  'id' => 'sidebar',
  'before_widget' => '<aside class="widget %2$s">',
  'after_widget' => '</aside>',
  'before_title' => '<h3>',
  'after_title' => '</h3>'
));