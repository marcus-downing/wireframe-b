<?php

namespace wireframe_b\admin;

add_action('admin_init', function () {
  remove_submenu_page( 'themes.php', 'theme-editor.php' );
  remove_submenu_page('plugins.php', 'plugin-editor.php' );
  wp_enqueue_style('wb-admin', get_template_directory_uri().'/admin.css');
  wp_enqueue_script('wb-admin', get_template_directory_uri().'/js/admin.js', array('jquery'));
});

add_action('wireframe_b:settings_page_ident', function ($title) {
  ?>
  <div id='bang-leftbar' class='bang-il3'>
    <a href="http://www.bang-on.net">
      <img src="<?php bloginfo('template_directory');?>/images/bang-black-v.png" /></a>
    <div><h1><?php echo __($title); ?></h1></div>
  </div>
  <?php
}, 10, 1);