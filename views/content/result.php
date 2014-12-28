<?php

$post_type = $post->post_type;
$result_type = $post_type;
if (current_theme_supports('post-formats')) {
  $post_format = get_post_format($post->ID);
  if (!empty($post_format) && $post_format != 'default')
    $result_type = $post_format;
}

get_template_part('results/result', $result_type);
?>