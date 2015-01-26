<?php

namespace bootstrap;

/*
  \bootstrap\icon('squiggle');

  Show an icon from your custom set
*/
function icon($icon, $alt = null) {
  echo "<i class='icon-".esc_attr($icon)."'";
  if (is_null($alt)) echo " aria-hidden='true'";
  else echo " role='img' aria-label='".esc_attr($alt)."'";
  echo "></i>";
}

/*
  \bootstrap\glyphicon('search');

  Show an icon from the Glyphicons Halflings set

  http://getbootstrap.com/components/#glyphicons
*/
function glyphicon($icon, $alt = null) {
  echo "<span class='glyphicon glyphicon-".esc_attr($icon)."'";
  if (is_null($alt)) echo " aria-hidden='true'";
  else echo " role='img' aria-label='".esc_attr($alt)."'";
  echo "></span>";
}

/*
  \bootstrap\fa('o-twitter');

  Show an icon from the Font Awesome set

  http://fontawesome.io/icons/
*/
function faicon($icon, $alt = null) {
  echo "<i class='fa fa-".esc_attr($icon)."'";
  if (is_null($alt)) echo " aria-hidden='true'";
  else echo " role='img' aria-label='".esc_attr($alt)."'";
  echo "></i>";
}