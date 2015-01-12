<?php

register_sidebar(array(
  'name' => 'Left Navigation',
  'id' => 'left',
  'before_widget' => '<aside class="widget panel panel-default %2$s">',
  'after_widget' => '</aside>',
  'before_title' => '<div class="panel-heading"><h3 class="panel-title">',
  'after_title' => '</h3></div>'
));

register_sidebar(array(
  'name' => 'Sidebar',
  'id' => 'sidebar',
  'before_widget' => '<aside class="widget panel panel-default %2$s">',
  'after_widget' => '</aside>',
  'before_title' => '<div class="panel-heading"><h3 class="panel-title">',
  'after_title' => '</h3></div>'
));