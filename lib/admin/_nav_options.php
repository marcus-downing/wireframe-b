<?php

namespace wireframe_b;

// build the settings
add_action('admin_init', function () {
  register_setting('nav_options', 'nav_options', function ($options) {
    return $options;
  });

  add_settings_section('nav_hierarchy', 'Hierarchy', null, 'nav_options');
  add_settings_field('show_home', 'Show home', null, 'nav_options', 'nav_hierarchy');
});

// show the settings page
add_action('admin_menu', function () {
  $__name = __('Navigation', 'wireframe_b');
  add_theme_page($__name, $__name, 'edit_theme_options', 'navigation', function () {
    wp_enqueue_style('admin-bootstrap');
    ?><div class="wrap container-fluid">

      <?php do_action('wireframe_b:settings_page_ident', 'Navigation'); ?>
      <h2>Navigation menu</h2>
      <p>The navigation menu shows your current page location relative to other pages.</p>

      <div class='row'>
        <div class='col-md-3'>
          <h3>Preview</h3>
          <?php
            the_widget('wireframe_b\leftnav_menu');
          ?>
        </div>
        <div class='col-md-8'>

          <div class='metabox-holder'>
            <form method="post" action="options.php">
              <?php settings_fields( 'wireframe_b-nav-top-settings-group' ); ?>

              <?php do_settings_sections('nav_options'); ?>

              <?php submit_button(); ?>
            </form>
          </div>

        </div>
      </div>

    </div><?php
  });
});
