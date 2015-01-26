<?php

namespace wireframe_b;

/**
 *  Output responsive images correctly.
 * 
 *  <code>
 *  the_picture('logo.png');
 *  </code>
 *
 *  Look for an image in the theme's `images` folder, and write an `<img>` tag with appropriate srcset tags.
 */

function the_picture($file, $args = array()) {
  $args = wp_parse_args($args, array(
    'alt' => null,
    'title' => null,
    'echo' => true
    ));

  $url = get_stylesheet_directory_uri().'/images/'.$file;
  $file = get_template_directory().'/images/'.$file;

  $pathinfo = pathinfo($url);
  $file_pathinfo = pathinfo($file);

  $srcset = array();
  foreach (array("2x", "4x") as $x) {
    $bigurl = $pathinfo['dirname'].'/'.$pathinfo['filename'].'@'.$x.'.'.$pathinfo['extension'];
    $bigfilename = $file_pathinfo['dirname'].'/'.$pathinfo['filename'].'@'.$x.'.'.$pathinfo['extension'];

    if (file_exists($bigfilename))
      $srcset[] = "$bigurl $x";
  }
  $srcset = empty($srcset) ? '' : " srcset='".esc_attr(implode(', ', $srcset))."'";

  $alt = is_null($args['alt']) ? '' : " alt='".esc_attr($args['alt'])."'";
  $title = is_null($args['title']) ? '' : " title='".esc_attr($args['title'])."'";
  $img = "<img src='".esc_attr($url)."'$srcset$alt$title/>";

  if ($args['echo']) echo $img;
  else return $img;
}