<?php

namespace wireframe_b;

/*
Add the .active class to menu items, to hook into bootstrap styles
*/

add_action('nav_menu_css_class', __NAMESPACE__.'\nav_menu_css_class');
function nav_menu_css_class($cls) {
  if (in_array('current-menu-item', $cls) || in_array('current-menu-parent', $cls) || in_array('current-page-parent', $cls))
    $cls[] = 'active';
  return $cls;
}