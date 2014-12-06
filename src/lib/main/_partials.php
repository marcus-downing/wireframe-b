<?php

namespace wireframe_b\parts;

/*
  PARTS

  Compose a page template by combining a layout with various parts: the main block, sidebars, nav, etc.
  The final call should be to the `layout` which will actually write the page.


  use wireframe_b\parts;

  params(array(
    'title' => $post->post_title.' by '.$author->display_name
  ));
  main('article');
  sidebar('left', 'nav');
  sidebar('right', 'no-ads');
  layout('three');
*/

/*
  Include a partial file.

  part('result', array(
    'title' => 'Featured result',
    'class' => 'featured-result'
  ));

  part(array('result', $post->post_type, $post_format), null);
*/
function part($part, $params = null) {
  global $wireframe_b_part_params;
  $params = wp_parse_args($params, $wireframe_b_part_params);
  // $file = 
}


/*
  Set parameters that will be picked up by subsequent parts

  params(array(
    ''
  ));
*/
function params($params) {
  global $wireframe_b_part_params;
  $params = $wireframe_b_part_params = wp_parse_args($params, $wireframe_b_part_params);
}


/*
  Draw a page using a named layout and the parts that have been set.

  The parameters array is given to each part.

  main('article');
  sidebar('nav', 'main-nav');
  sidebar('sidebar', 'no-ads');
  layout('three', array(
    'title' => $post->post_title.' by '.$author->display_name,
  ));
*/
function layout($layout, $params = null) {
  global $wireframe_b_part_params;
  $wireframe_b_part_params = wp_parse_args($params, $wireframe_b_part_params);
}


/*
  Set what the "main" part of the layout is going to be, but don't write anything yet.
  The part can be a single code, 

  main('article', array('article-type' => 'featured'));

  main(function () {
    the_title();
    echo "<p>by ".esc_html($author->display_name)."</p>";
    the_content();
  });
*/
function main($main_part, $params = null) {

}


/*
  Set what sidebar (file or function) to use when writing a sidebar, but don't write anything yet.

  sidebar('left', 'main-nav', array('section' => 'jobs'));

  sidebar('right', function () {
    dynamic_sidebar('mywidgets');
  });
*/
function sidebar($code, $sidebar_part, $params = null) {

}