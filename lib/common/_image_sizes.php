<?php

add_action('setup_theme', function () {
  set_post_thumbnail_size(<%= default_width %>, <%= default_height %>, true);
<%= register_image_sizes() %>
  add_filter('image_size_names_choose', function ($sizes) {
    $custom = array(
<%= image_size_names() %>
    );
    return array_merge($sizes, $custom);
  });
});