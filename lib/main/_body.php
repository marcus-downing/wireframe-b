<?php

function set_body_id($id) {

}

function body_id() {
  $id = &wireframe_b\get_global('body', 'id');
  if (empty($id)) 
    return;

  echo ' id = "'.esc_attr($id).'"';
}

function set_body_data($key, $value) {
  wireframe_b\set_global('body', 'data', $key, $value);
}

function body_data() {
  $data = wireframe_b\get_global('body', 'data');
  if (!is_array($data)) 
    return;
  $data = array_filter($data);
  if (empty($data)) 
    return;

  foreach ($data as $key => $value) {
    $key = slugify($key);
    echo " data-$key='".esc_attr($value)."'";
  }
}

function body_preload($url) {
  $preload = wireframe_b\get_global('body', 'preload');
  if (!is_array($preload))
    $preload = array();
  if (is_array($url)) {
    foreach ($url as $u) {
      $preload[] = $u;
    }
  } else {
    $preload[] = $url;
  }
  wireframe_b\set_global('body', 'preload', $preload);
}

add_action('wp_enqueue_scripts', 'wireframe_b_write_preload', 99);
function wireframe_b_write_preload () {
  $preload = wireframe_b\get_global('body', 'preload');
  
  if (!is_array($preload))
    return;
  $preload = array_unique(array_filter($preload));
  if (empty($preload))
    return;

  echo "<script>preload(".json_encode($preload).");</script>";
}