<?php

namespace wireframe_b;

add_action('admin_enqueue_scripts', function () {
  if (file_exists(get_template_directory().'/js/admin.js'))
    wp_enqueue_script('wireframe_b_admin', get_template_directory_uri().'/js/admin.js', array('jquery'), NULL, true);

  $conditions = array('ie8' => 'lt IE 9', 'ie9' => 'lt IE 10', 'ie10' => 'lt IE 11', 'ie11' => 'lt IE 12');
  $conditions = apply_filters('wireframe_b:js:browser_conditional_scripts', $conditions);
  foreach ($conditions as $browser => $condition) {
    if (file_exists(get_template_directory().'/js/admin-'.$browser.'.js')) {
      $url = get_template_directory_uri() . '/js/main.js';
      echo "<!--[if $condition]><script type='text/javascript' src='$url'></script><![endif]-->\n";
    }
  }
});

add_action('wp_enqueue_scripts', function () {
  $url = get_template_directory_uri() . '/js/main.js';
  wp_enqueue_script('wireframe_b', $url, array('jquery'), NULL, true);
}, 9);
