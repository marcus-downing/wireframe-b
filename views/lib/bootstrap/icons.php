<?php

/**
 * Show an icon from any of the valid sets.
 *
 * <code>
 * the_icon('dashicons-search', 'Search this website');
 * </code>
 *
 * This will attempt to pick the right icon set based on the name starting with `fa-`, `dashicons-`, `glyphicon-` or `icon-`.
 *
 * Be aware that the each icon set has its own rules for font size, line height etc.
 *
 * @param string $icon  The icon code.
 * @param string $alt  Optional title.
 */
function the_icon($icon, $alt = null) {
  if (preg_match('/^fa-/', $icon))
    fa_icon($icon, $alt);
  else if (preg_match('/^dashicons?-/', $icon))
    dashicon($icon, $alt);
  else if (preg_match('/^glyphicons?-/', $icon))
    glyphicon($icon, $alt);
  else
    font_icon($icon, $alt);
}

/**
 * Show an icon from the theme's own icon set.
 *
 * <code>
 * font_icon('search');
 * </code>
 */
function font_icon($icon, $alt = null) {
  wp_enqueue_style('icons');

  $icon = preg_replace('/^icons?-/', '', $icon);  
  echo "<i class='icon-".esc_attr($icon)."'";
  if (is_null($alt)) echo " aria-hidden='true'";
  else echo " role='img' aria-label='".esc_attr($alt)."'";
  echo "></i>";
}

/**
 * Show an icon from the WordPress Dashicons set.
 *
 * <code>
 * dashicon('search');
 * </code>
 *
 * @link https://developer.wordpress.org/resource/dashicons/
 */
function dashicon($icon, $alt = null) {
  wp_enqueue_style('dashicons');

  $icon = preg_replace('/^dashicons?-/', '', $icon);
  echo "<span class='dashicons dashicons-".esc_attr($icon)."'";
  if (is_null($alt)) echo " aria-hidden='true'";
  else echo " role='img' aria-label='".esc_attr($alt)."'";
  echo "></span>";
}

/**
 * Show an icon from the Glyphicons Halflings set.
 *
 * <code>
 * glyphicon('search');
 * </code>
 *
 * @link http://getbootstrap.com/components/#glyphicons
 */
function glyphicon($icon, $alt = null) {
  wp_enqueue_style('glyphicons');

  $icon = preg_replace('/^glyphicons?-/', '', $icon);
  echo "<span class='glyphicon glyphicon-".esc_attr($icon)."'";
  if (is_null($alt)) echo " aria-hidden='true'";
  else echo " role='img' aria-label='".esc_attr($alt)."'";
  echo "></span>";
}

/**
 * Show an icon from the Font Awesome set.
 *
 * <code>
 * fa_icon('o-twitter');
 * </code>
 *
 * @link http://fontawesome.io/icons/
 */
function fa_icon($icon, $alt = null) {
  wp_enqueue_style('fontawesome');

  $icon = preg_replace('/^fa-/', '', $icon);
  echo "<i class='fa fa-".esc_attr($icon)."'";
  if (is_null($alt)) echo " aria-hidden='true'";
  else echo " role='img' aria-label='".esc_attr($alt)."'";
  echo "></i>";
}
