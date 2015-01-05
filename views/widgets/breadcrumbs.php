<?php

namespace wireframe_b;

class breadcrumbs extends \WP_Widget {
  function breadcrumbs() {
    $this->WP_Widget('breadcrumbs', 'Breadcrumbs', array(
      'classname' => 'breadcrumbs',
      'description' => 'A listing of your current location'
      ));
  }

  function form ($instance) {
    ?><span class='bang-indicator'></span><?php
  }

  function update ($new_instance, $old_instance) {

  }

  function widget ($args, $instance) {
    global $post;
    $breadcrumbs = $this->locate_breadcrumbs($post);
    if (!empty($breadcrumbs))
      $breadcrumbs[count($breadcrumbs) - 1]->active = true;

    $breadcrumbs = apply_filters('wireframe_b-breadcrumb_location', $breadcrumbs);
    $breadcrumbs = array_values(array_filter($breadcrumbs));
    do_action('log', 'Wb: $breadcrumbs', '!post_title,permalink', $breadcrumbs);

    if (empty($breadcrumbs))
      return;
    $home = (get_option('show_on_front') == 'page') ? 
      get_post(get_option('page_on_front')) : 
      $this->breadcrumb_placeholder(get_bloginfo('name'), get_site_url('/'), empty($breadcrumbs));
    $home->post_title = get_bloginfo('name');
    array_unshift($breadcrumbs, $home);

    echo $args['before_widget'];
    echo "<ol class='breadcrumb'>";
    foreach ($breadcrumbs as $crumb) {
      $title = $crumb->post_title;
      $permalink = isset($crumb->permalink) ? $crumb->permalink : get_post_permalink($crumb);
      $active = $crumb->active;

      echo "<li";
      if ($active) echo " class='active'";
      echo ">";
      if (!$active) echo "<a href='".esc_attr($permalink)."'>";
      echo esc_html($title);
      if (!$active) echo "</a>";
      echo "</li>";
    }
    echo "</ol>";
    echo $args['after_widget'];
  }

  function breadcrumb_placeholder($name, $url) {
    return (object) array(
      'ID' => 0,
      'post_type' => 'page',
      'post_status' => 'publish',
      'guid' => $url,
      'post_name' => sanitize_title($name),
      'post_title' => $name,
      'permalink' => $url
      );
  }

  function locate_breadcrumbs($post) {
    $current_url = '';
    if (is_front_page() || is_404())
      return array();

    // for search results, show a summary of search terms
    if (is_search()) {
      return array($this->breadcrumb_placeholder(__('Search results'), $current_url));
    }


    // for single posts, either show page hierarchy up to that point, or a placeholder header
    if (is_single()) {

    }

    // for pages, show actual ancestors
    if (is_page()) {
      $pages = get_post_ancestors($post);
      $pages = array_map('get_post', $pages);
      $pages = array_values(array_filter($pages));
      do_action('log', 'Wb: Breadcrumbs: Ancestors', $pages);
      $pages = array_reverse($pages);
      $pages[] = $post;
      return $pages;
    }

    // ...

    return array();
  }

}
