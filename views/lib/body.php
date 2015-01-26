<?php

/**
 *  Write the body's ID attribute, if it has one.
 *
 *  <code>
 *  body_id()
 *  </code>
 */
function body_id() {
  $the_id = &wireframe_b\the_global('body', 'id');
  if (empty($the_id)) return;
  echo ' id = "'.esc_attr($the_id).'"';
}

/**
 *  Write the body's data attributes, if it has any.
 *
 *  <code>
 *  body_data()
 *  </code>
 */
function body_data() {
  $the_data = &wireframe_b\the_global('body', 'data');
  if (!is_array($the_data)) return;
  $data = array_filter($the_data);
  if (empty($data)) return;

  foreach ($data as $key => $value) {
    $key = slugify($key);
    echo " data-$key='".esc_attr($value)."'";
  }
}

function set_body_id($id) {
  $the_id = &wireframe_b\the_global('body', 'id');
  $the_id = $id;
}

function set_body_data($key, $value) {
  $the_data = &wireframe_b\the_global('body', 'data');
  if (!is_array($data)) $the_data = array();
  $the_data[$key] = $value;
}

function body_preload($url) {
  $the_preload = &wireframe_b\the_global('body', 'preload');
  if (!is_array($the_preload)) $the_preload = array();

  if (is_array($url)) {
    foreach ($url as $u) $the_preload[] = $u;
  } else {
    $the_preload[] = $url;
  }
}

add_action('wp_footer', function () {
  $the_preload = &wireframe_b\the_global('body', 'preload');
  
  if (!is_array($the_preload)) return;
  $urls = array_unique(array_filter($the_preload));
  if (empty($urls)) return;

  echo "<script>preload(".json_encode($urls).");</script>";
}, 99);