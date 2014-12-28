<?php
if (!have_posts()) {
  ?><%= include_content('no-search-results') %><?php
} else {
  ?><heading class='page-header'>
    <%= partial('breadcrumbs') %>
    <h1><?php _e('Search results'); ?></h1>
  </heading>

  <div class='search-results'><?php
    while (have_posts()) {
      the_post();
      ?><%= result() %><?php
    }
  ?></div>
<?php } ?>