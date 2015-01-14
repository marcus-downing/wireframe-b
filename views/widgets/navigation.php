<?php

namespace wireframe_b;

class navigation extends \WP_Widget {
  var $posts_by_id;
  var $has_all_pages;

  function __construct () {
    parent::__construct ('navigation', __('Navigation menu', 'wireframe_b'), array(
      'classname' => 'navigation',
      'description' => __('A menu of your current page location in context', 'wireframe_b')
      ));
    $this->posts_by_id = array();
  }

  function form ($instance) {
    ?><span class='bang-indicator'></span><?php

    $url = admin_url('themes.php?page=navigation');
    echo "<p>Control this widget from the <a href='$url'>Navigation settings</a> page.</p>";
  }

  function update ($new_instance, $old_instance) {
  }

  function options() {
    $options = (array) get_option('navigation');
    $options = wp_parse_args($options, array(
      'show' => 'first',
      'show_first_when' => 'current',
      'show_second_when' => 'section',
      'show_third_when' => 'current',
      'show_fourth_when' => 'none',
      'show_fifth_when' => 'none',

      'show_current' => true,

      'show_ancestors_when' => 'all',
      'show_children' => true,
      'show_grandchildren' => false,
      'show_descendents' => false,

      'show_siblings' => true,
      'show_siblings_when' => 'always',
      'show_nephews' => false,
      'show_family' => false,
      ));
    $options = apply_filters('wireframe_b:navigation:options', $options);
    return (object) $options;
  }

  //  to save database queries, keep hold of posts/pages
  function get_post ($id) {
    if (empty($id))
      return null;

    if (is_object($id)) {
      $post = $id;
      $this->remember_post($post);
      return $post;
    }

    $id = intval($id);
    if (isset($this->posts_by_id[$id]))
      return $this->posts_by_id[$id];

    $post = get_post($id);
    $this->posts_by_id[$id] = $post;
    return $post;
  }

  function get_posts($ids) {
    $unknown_ids = array_diff($ids, array_keys($this->posts_by_id));
    $posts = get_posts(array(
      'post__in' => $unknown_ids
      ));
    $this->remember_posts($posts);
    return array_map(array($this, 'get_post'), $ids);
  }

  function remember_post ($post) {
    // do_action('log', 'Wb: navigation: remembering post', '!ID,post_title', $post);
    if (empty($post) || !is_object($post) || !is_numeric($post->ID))
      return;

    $id = intval($post->ID);
    // do_action('log', 'Wb: navigation: remembering post by id %s', $id, '!ID,post_title', $post);
    if (!isset($this->posts_by_id[$id]))
      $this->posts_by_id[$id] = $post;
  }

  function remember_posts ($posts) {
    // do_action('log', 'Wb: navigation: remembering posts', '!ID,post_title', $posts);
    foreach ($posts as $post) {
      $this->remember_post($post);
    }
  }

  function get_children_of ($ids, $post_type = 'page', $depth = 1) {
    if ($this->has_all_pages && $post_type == 'page') {
      $ids = is_array($ids) ? array_map('intval', $ids) : array( intval($ids) );

      $child_ids = array();
      foreach ($this->posts_by_id as $id => $post) {
        if (in_array($post->post_parent, $ids))
          $child_ids[] = $id;
      }
    } else {
      if (is_array($ids)) {
        $children = get_posts(array(
          'post_type' => $post_type,
          'post_parent__in' => array_map('intval', $ids),
          'post_status' => 'publish'
          ));
      } else if (is_numeric($ids)) {
        $children = get_posts(array(
          'post_type' => $post_type,
          'post_parent' => intval($ids),
          'post_status' => 'publish'
          ));
      }
      $this->remember_posts($children);
      $child_ids = array_map(function ($p) { return $p->ID; }, $children);
    }

    if ($depth > 1) {
      $grandchild_ids = $this->get_children_of($child_ids, $post_type, $depth - 1);
      $child_ids = array_merge($child_ids, $grandchild_ids);
    }
    return $child_ids;
  }

  function widget ($args, $instance) {
    do_action('log', 'Wb: leftnav_menu');
    $nav = $this->options();
    $show_home = $nav->show == 0;
    do_action('log', 'Wb: navigation: options', $nav);


    //  select pages to include
    $inc = array();
    $current_post = get_queried_object();
    $this->remember_post($current_post);
    do_action('log', 'Wb: navigation: current page', '!ID,post_title', $current_post);

    $ancestors = empty($current_post) ? array() : array_reverse(get_ancestors($current_post->ID, $current_post->post_type));
    array_unshift($ancestors, 0);
    do_action('log', 'Wb: navigation: ancestors', $ancestors);


    //  absolute
    $show_when = array(
      null,
      $nav->show_first_when,
      $nav->show_second_when,
      $nav->show_third_when,
      $nav->show_fourth_when,
      $nav->show_fifth_when
      );

    $minlevel = $nav->show;

    //  save database effor by preloading all pages
    $pages = get_pages(array());
    do_action('log', 'Wb: navigation: loaded all pages', '!ID,post_title', $pages);
    $this->remember_posts($pages);
    $this->has_all_pages = true;
    do_action('log', 'Wb: navigation: memory of all pages', '!ID,post_title', $this->posts_by_id);


    foreach ($show_when as $level => $when) {
      if (is_null($when) || $when == 'none' || $level < $nav->show) continue;

      $node = isset($ancestors[$level]) ? $ancestors[$level] : null;
      if (!is_null($node))
        $inc[] = $node;

      if ($when == 'section') {
        $parent = isset($ancestors[$level - 1]) ? $ancestors[$level] : null;
        $children = $this->get_children_of($parent);
      } else if ($when == 'all') {
        if ($level == 1) {

        }
      }
    }


    //  relative to current page
    if ($nav->show_current && !empty($current_post)) {
      $inc[] = $current_post->ID;

      $shorted_ancestors = array_slice($ancestors, $nav->show);
      do_action('log', 'Wb: navigation: shorted ancestors', $shorted_ancestors);
      $inc = array_merge($inc, $shorted_ancestors);

      if ($nav->show_children) {
        $depth = 1;
        if ($nav->show_grandchildren) $depth = 2;
        if ($nav->show_descendents) $depth = 10;

        $children = $this->get_children_of($current_post->ID, $current_post->post_type, $depth);
        do_action('log', 'Wb: navigation: children and descendents', $children);
        $inc = array_merge($inc, $children);
      }

      if ($nav->show_siblings && ($nav->show_siblings_when == 'always' || empty($children))) {
        $depth = 1;
        if ($nav->show_nephews) $depth = 2;
        if ($nav->show_family) $depth = 10;

        $siblings = $this->get_children_of($current_post->post_parent, $current_post->post_type, $depth);
        do_action('log', 'Wb: navigation: siblings, nephews and extended family', $siblings);
        $inc = array_merge($inc, $siblings);
      }

      if ($nav->show_ancestors_when == 'all') {
        $parent_ancestors = $ancestors;
        if ($nav->show > 1)
          $parent_ancestors = array_slice($ancestors, $nav->show - 1);
        $ancestor_siblings = $this->get_children_of($parent_ancestors, $current_post->post_type);
        $inc = array_merge($inc, $ancestor_siblings);
      }
    }


    //  tidy up the values
    $inc = array_values(array_unique(array_map('intval', array_filter($inc, 'is_int'))));
    $inc = apply_filters('wireframe_b:navigation:posts', $inc);
    $inc = array_values(array_unique($inc));
    do_action('log', 'Wb: navigation: include', $inc);

    //  build hierarchy of pages
    $posts = $this->get_posts($inc);
    do_action('log', 'Wb: navigation: pages', '!ID,post_title', $posts);
    $inc = get_page_hierarchy($posts);
    $inc = array_keys($inc);
    $inc = apply_filters('wireframe_b:navigation:hierarchy', $inc);
    do_action('log', 'Wb: navigation: hierarchy', $inc);

    //  array of posts by id

    $indents = array();
    $base_indent = $show_home ? 1 : 0;


    //  draw the list
    if (!empty($posts) || $show_home) {
      echo "<div class='list-group'>";
      if ($show_home) {
        $url = esc_attr(site_url('/'));
        echo "<a href='$url' class='list-group-item' id='nav-item-0' data-nav-id='0'>Home</a>";
      }
      foreach ($inc as $id) {
        $post = $this->get_post($id);
        if (is_null($post))
          continue;
      
        $parentid = $post->post_parent;
        $url = esc_attr(get_permalink($id));
        $name = esc_html($post->post_title);

        $indent = $base_indent;
        if (isset($indents[$parentid]))
          $indent = $indents[$parentid] + 1;
        $indents[$id] = $indent;

        $cls = ($id == $current_post->ID) ? ' active' : '';
        echo "<a href='$url' class='list-group-item indent-$indent$cls' id='nav-item-$id' data-nav-id='$id' data-nav-parent='$parentid'>$name</a>";
      }
      echo "</div>";
    }
  }

}