<?php

namespace wireframe_b\admin;

add_action('admin_init', __NAMESPACE__.'\admin_init');
// add_action('admin_print_styles', __NAMESPACE__.'\admin_print_styles');
// add_action('admin_head', __NAMESPACE__.'\admin_head');

function admin_init () {
  remove_submenu_page( 'themes.php', 'theme-editor.php' );
  remove_submenu_page('plugins.php', 'plugin-editor.php' );
}