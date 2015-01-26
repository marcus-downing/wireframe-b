<?php

namespace bootstrap;

/*
  \bootstrap\button('Submit', array(
    'btn-type' => 'submit',
    'btn-class' => 'primary',
    'id' => 'contact-form-submit-button'
  ));

  Show a button, the Bootstrap way.

  http://getbootstrap.com/css/#buttons
*/
function button($text, $args = array()) {
  $args = wp_parse_args((array) $args, array(
    'btn-type' => 'button',
    'btn-class' => 'btn-default',
    'btn-size' => false,
    'href' => false,
    'active' => false,
    'disabled' => false,
    'echo' => true,
    'id' => false,
    'class' => false,
    'data' => false,
    ));

  $is_input = $args['btn-type'] == 'input';
  $is_anchor = $args['href'] && !empty($args['href']) && !$is_input;

  $btn_type = in_array($args['btn-type'], array('button', 'submit', 'input')) ? $args['btn-type'] : 'button';

  $btn = "button type='$btn_type'";
  if ($is_anchor)
    $btn = "a role='button' href='".esc_attr($args['href'])."'";
  else if ($is_input)
    $btn = "input type='button'";

  $btn_class = 'btn-default';
  if (in_array($args['btn-class'], array('default', 'primary', 'success', 'info', 'warning', 'danger', 'link')))
    $btn_class = 'btn-'.$args['btn-class'];
  if (in_array($args['btn-size'], array('lg', 'sm', 'xs')))
    $btn_class = $btn_class.' btn-'.$args['btn-size'];
  if ($args['active'])
    $btn_class = $btn_class.' active';

  if ($args['disabled']) {
    if ($is_anchor)
      $btn_class = $btn_class.' disabled';
    else
      $btn = $btn.' disabled="disabled"';
  }
  $id = empty($args['id']) ? '' : " id='".esc_attr($args['id'])."'";
  $class = empty($args['class']) ? '' : esc_attr($args['class']);
  $data = empty($args['data']) ? '' : " ";

  $out = "<$btn$id class='btn $btn_class $class'$data>".esc_html($text)."</button>";
  if ($args['echo'])
    echo $out;
  else
    return $out;
}