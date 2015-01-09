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

    echo $args->before_widget;
    echo "<ul class='list-group'>";
    echo "<li class='list-group-item'><a href='/'>Home</a></li>";
    echo "</ul>";
    echo $args->after_widget;
  }

}