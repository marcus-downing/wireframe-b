<?php

namespace wireframe_b;

add_action('admin_enqueue_scripts', __NAMESPACE__.'\admin_enqueue_scripts');
function admin_enqueue_scripts() {
  // if (file_exists())

  

  // glob_conditional_scripts('ie8', 'lt IE 9');
  // glob_conditional_scripts('ie7', 'lt IE 8');
  // glob_conditional_scripts('ie6', 'lt IE 7');
}

add_action('wp_enqueue_scripts', __NAMESPACE__.'\enqueue_scripts', 9);
function enqueue_scripts() {
  $url = get_template_directory_uri() . '/js/main.js';
  wp_enqueue_script('wireframe_b', $url, array('jquery'), NULL, true);
}