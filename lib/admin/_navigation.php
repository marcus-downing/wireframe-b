<?php

namespace wireframe_b;

// build the settings
add_action('admin_init', function () {
  add_settings_section('nav_options', 'Navigation', null, 'nav_options');

  register_setting('nav_options', 'navigation', function ($value) {
    // $widget = new \wireframe_b\navigation();
    // $options = wp_parse_args((array) $_REQUEST['nav'], (array) $widget->options());
    $options = (array) $_REQUEST['nav'];
    foreach (array('show_current', 'show_children', 'show_grandchildren', 'show_descendents', 'show_siblings', 'show_nephews', 'show_family') as $opt) {
      $options[$opt] = (boolean) $options[$opt];
    }
    $levels = array(
      'home' => 0,
      'first' => 1,
      'second' => 2,
      'third' => 3,
      'fourth' => 4,
      'fifth' => 5
      );
    $options['show'] = $levels[$options['show']];
    do_action('log', 'Saving nav_options', $options);
    return $options;
  });
});

// show the settings page
add_action('admin_menu', function () {
  $__name = __('Navigation', 'wireframe_b');
  add_theme_page($__name, $__name, 'edit_theme_options', 'navigation', function () {
    $widget = new \wireframe_b\navigation();
    $nav = $widget->options();

    do_action('log', 'Wb: Loaded nav options', $nav);
    wp_enqueue_style('admin-bootstrap');
    ?><div class="wrap container-fluid">

      <?php do_action('wireframe_b:settings_page_ident', 'Navigation'); ?>
      <h2>Navigation menu</h2>
      <p>The navigation menu widget shows your current page location relative to other pages.</p>

      <div class='row'>
        <div class='col-md-6 col-lg-7'>
          <form method="post" action="options.php" id="navigation_form">
            <?php settings_fields('nav_options'); ?>
            <div class='metabox-holder'>
              <div class='postbox'>
                <h3><i class='dashicons dashicons-networking'></i>&nbsp; Start navigation from:</h3>
                <div class=''>

                  <table class='navigation_tree' id='absolute_tree'>
                    <tr><td style='padding-left: 1.5em;'><input type='radio' name='nav[show]' value='home' id='show_home' <?php checked($nav->show, 0) ?> /> <label for='show_home'><i class='dashicons dashicons-admin-home'></i>&nbsp; Home page</label></td>
                      <td></td></tr>
                    <tr><td style='padding-left: 2.3em;'><i class='dashicons dashicons-arrow-right'></i> <input type='radio' name='nav[show]' value='first' id='show_first' <?php checked($nav->show, 1) ?> /> <label for='show_first'>Main section</label></td>
                      <td><select name='nav[show_first_when]' id='show_first_when'>
                        <option value='none' <?php selected($nav->show_first_when, 'none') ?> >Don't include</option>
                        <option value='current' <?php selected($nav->show_first_when, 'current') ?> >Current section page only</option>
                        <option value='all' <?php selected($nav->show_first_when, 'all') ?> >All section pages</option>
                      </select></td></tr>
                    <tr><td style='padding-left: 4.8em;'><i class='dashicons dashicons-arrow-right'></i> <input type='radio' name='nav[show]' value='second' id='show_second' <?php checked($nav->show, 2) ?> /> <label for='show_second'>Second level</label></td>
                      <td><select name='nav[show_second_when]' id='show_second_when'>
                        <option value='none' <?php selected($nav->show_second_when, 'none') ?> >Don't include</option>
                        <option value='current' <?php selected($nav->show_second_when, 'current') ?> >Current page or ancestor only</option>
                        <option value='section' <?php selected($nav->show_second_when, 'section') ?> >All second level pages in current section</option>
                        <option value='all' <?php selected($nav->show_second_when, 'all') ?> >All second level pages</option>
                      </select></td></tr>
                    <tr><td style='padding-left: 7.3em;'><i class='dashicons dashicons-arrow-right'></i> <input type='radio' name='nav[show]' value='third' id='show_third' <?php checked($nav->show, 3) ?> /> <label for='show_third'>Third level</label></td>
                      <td><select name='nav[show_third_when]' id='show_third_when'>
                        <option value='none' <?php selected($nav->show_third_when, 'none') ?> >Don't include</option>
                        <option value='current' <?php selected($nav->show_third_when, 'current') ?> >Current page or ancestor only</option>
                        <option value='section' <?php selected($nav->show_third_when, 'section') ?> >All third level pages in current section</option>
                        <option value='all' <?php selected($nav->show_third_when, 'all') ?> >All third level pages</option>
                      </select></td></tr>
                    <tr><td style='padding-left: 9.8em;'><i class='dashicons dashicons-arrow-right'></i> <input type='radio' name='nav[show]' value='fourth' id='show_fourth' <?php checked($nav->show, 4) ?> /> <label for='show_fourth'>Fourth level</label></td>
                      <td><select name='nav[show_fourth_when]' id='show_fourth_when' disabled>
                        <option value='none' <?php selected($nav->show_fourth_when, 'none') ?> >Don't include</option>
                        <option value='current' <?php selected($nav->show_fourth_when, 'current') ?> >Current page or ancestor only</option>
                        <option value='section' <?php selected($nav->show_fourth_when, 'section') ?> >All fourth level pages in current section</option>
                        <option value='all' <?php selected($nav->show_fourth_when, 'all') ?> >All fourth level pages</option>
                      </select></td></tr>
                    <tr><td style='padding-left: 12.3em;'><i class='dashicons dashicons-arrow-right'></i> <input type='radio' disabled /> <label for='show_fifth'>Fifth level</label></td>
                      <td><select name='nav[show_fifth_when]' id='show_fifth_when' disabled>
                        <option value='none' <?php selected($nav->show_fifth_when, 'none') ?> >Don't include</option>
                        <option value='current' <?php selected($nav->show_fifth_when, 'current') ?> >Current page or ancestor only</option>
                        <option value='section' <?php selected($nav->show_fifth_when, 'section') ?> >All fifth level pages in current section</option>
                        <option value='all' <?php selected($nav->show_fifth_when, 'all') ?> >All fifth level pages</option>
                      </select></td></tr>
                  </table>

                </div>
              </div>

              <div class='postbox'>
                <h3><input type='checkbox' name='nav[show_current]' id='show_current' <?php checked($nav->show_current) ?> />&nbsp; <label for='show_current'>Relative to your current page:</label></h3>
                <div class=''>

                  <table class='navigation_tree' id='relative_tree'>
                    <tr><td style='padding-left: 1em;'><i class='dashicons dashicons-arrow-left'></i> <input type='checkbox' name='nav[show_ancestors]' id='show_ancestors' checked disabled /> <label for='show_ancestors'>Ancestors</label></td>
                      <td><select name='nav[show_ancestors_when]' id='show_ancestors_when'>
                        <option value='direct' <?php selected($nav->show_ancestors_when, 'direct') ?> >Direct ancestors only</option>
                        <option value='all' <?php selected($nav->show_ancestors_when, 'all') ?> >Ancestors and their siblings</option>
                      </select></td></tr>
                    <tr class='current_page_row'><td style='padding-left: 3.5em;'><i class='dashicons dashicons-arrow-right'></i> <label for='show_current'><i class='dashicons dashicons-admin-page'></i>&nbsp; <b>Current page</b></label></td>
                      <td></td></tr>
                    <tr><td style='padding-left: 6em;'><i class='dashicons dashicons-arrow-right'></i> <input type='checkbox' name='nav[show_children]' id='show_children' <?php checked($nav->show_children) ?> /> <label for='show_children'>All children</label></td>
                      <td></td></tr>
                    <tr><td style='padding-left: 8.5em;'><i class='dashicons dashicons-arrow-right'></i> <input type='checkbox' name='nav[show_grandchildren]' id='show_grandchildren' <?php checked($nav->show_grandchildren) ?> /> <label for='show_grandchildren'>All grandchildren</label></td>
                      <td></td></tr>
                    <tr><td style='padding-left: 11em;'><i class='dashicons dashicons-arrow-right'></i> <input type='checkbox' name='nav[show_descendents]' id='show_descendents' <?php checked($nav->show_descendents) ?> /> <label for='show_descendents' class='disabled'>All other descendents...</label></td>
                      <td></td></tr>
                    <tr><td style='padding-left: 3.5em;'><i class='dashicons dashicons-arrow-right'></i> <input type='checkbox' name='nav[show_siblings]' id='show_siblings' <?php checked($nav->show_siblings) ?> /> <label for='show_siblings'>All siblings</label></td>
                      <td><select name='nav[show_siblings_when]' id='show_siblings_when'>
                        <option value='always' <?php selected($nav->show_siblings_when, 'always') ?> >Always</option>
                        <option value='nochildren' <?php selected($nav->show_siblings_when, 'nochildren') ?> >Only if current page has no children</option>
                      </select></td></tr>
                    <tr><td style='padding-left: 6em;'><i class='dashicons dashicons-arrow-right'></i> <input type='checkbox' name='nav[show_nephews]' id='show_nephews' <?php checked($nav->show_nephews) ?> /> <label for='show_nephews'>All direct children of siblings</label></td>
                      <td></td></tr>
                    <tr><td style='padding-left: 8.5em;'><i class='dashicons dashicons-arrow-right'></i> <input type='checkbox' name='nav[show_family]' id='show_family' <?php checked($nav->show_family) ?> /> <label for='show_family' class='disabled'>All descendents of siblings...</label></td>
                      <td></td></tr>
                  </table>
                </div>
              </div>
            </div>

            <?php submit_button(); ?>
          </form>
        </div>
        <div class='col-md-5 col-lg-4'>
          <div class='well'>

            <?php
              the_widget('wireframe_b\navigation');
            ?>
          </div>
        </div>
      </div>

    </div><?php
  });
});
