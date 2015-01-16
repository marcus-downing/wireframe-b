<?php

namespace wireframe_b;

add_action('admin_init', function () {
  wp_register_style('admin-bootstrap', get_template_directory_uri().'/admin-bootstrap.css');
});