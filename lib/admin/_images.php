<?php

namespace wireframe_b\admin;

function the_picture($file, $echo = true) {
  $url = get_bloginfo('template_url').'/images/'.$file;
  $file = get_bloginfo('template_directory').'/images/'.$file;

  $pathinfo = pathinfo($url);
  $file_pathinfo = pathinfo($file);

  $srcset = array();
  foreach (array("2x", "4x") as $x) {
    $bigurl = $pathinfo['dirname'].'/'.$pathinfo['basename'].'@'.$x.$pathinfo['extension'];
    $bigfilename = $file_pathinfo['dirname'].'/'.$pathinfo['basename'].'@'.$x.$pathinfo['extension'];

    do_action('log', 'Texting file', $bigfilename);
    if (file_exists($bigfilename))
      $srcset[] = "$bigurl $x";
  }
  $img = "<img src='".esc_attr($url)."' srcset='".esc_attr(implode(', ', $srcset))."' />";

  if ($echo) echo $img;
  else return $img;
}