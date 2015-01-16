<?php

namespace wireframe_b\admin;

function the_picture($file, $echo = true) {
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
  $img = "<img src='".esc_attr($url)."' $srcset/>";

  if ($echo) echo $img;
  else return $img;
}