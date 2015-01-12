<?php

namespace wireframe_b;

class leftnav_menu extends \WP_Widget {
  function __construct () {
    parent::__construct ('leftnav_menu', __('Navigation menu', 'wireframe_b'), array(
      'classname' => 'leftnav_menu',
      'description' => __('A menu of your current page location', 'wireframe_b')
      ));
  }

  function form ($instance) {
    ?><span class='bang-indicator'></span><?php
    echo "<p>"; wp_widget_description(); echo "</p>";
  }

  function update ($new_instance, $old_instance) {

  }

  function options ($instance) {
    $options = get_option('wireframe_b:nav_menu');

    //  use a filter while enforcing defaults
    $defaults = array(
      'show_home' => false
      );
    $options = (object) wp_parse_args((array) $options, $defaults);
    $options = apply_filters('wireframe_b:nav_menu:options', $options);
    $options = (object) wp_parse_args((array) $options, $defaults);

    //  tidy up the options

    return $options;
  }

  function widget ($args, $instance) {
    do_action('log', 'Wb: leftnav_menu');
    $options = $this->options($instance);

    //  build the options
    $leftnav_args = array(
      'title_li' => '',
      // 'include' => implode(',', $inc),
      'post_status' => 'publish',
      'sort_column' => 'menu_order',
      'sort_order' => 'ASC',
    );
    $leftnav_args = apply_filters('the_leftnav__wp_list_pages_args', $leftnav_args);

    // echo the list
    echo "<div class='list-group'><ul>";
    if ($options->show_home)
      echo "<li><a class='list-group-item' href='/'>Home</a></li>";
    wp_list_pages($leftnav_args);
    echo "</ul></div>";
  }

}