<?php

namespace wireframe_b;

class nav_menu extends \WP_Widget {
  function nav_menu () {
    $this->WP_Widget('nav_menu', 'Navigation Menu', array(
      'classname' => 'nav_menu',
      'description' => 'A menu of your current page location'
      ));
  }

  function form ($instance) {
    ?><span class='bang-indicator'></span><?php
  }

  function update ($new_instance, $old_instance) {

  }

  function widget ($args, $instance) {
  }
}