<form role="search" method="get" id="searchform" class="searchform navbar-form navbar-right" action="<?php echo esc_url( home_url( '/' ) ) ?>">
  <div class='form-group'>
    <label class="sr-only" for="s"><?php echo _x('Search for:', 'label'); ?></label>
    <input type="text" class="form-control" value="<?php echo get_search_query() ?>" name="s" id="s" placeholder="<?php echo _x('Search', 'placeholder'); ?>" />
  </div>
  <button type="submit" class="btn btn-default"><?php echo _x( 'Search', 'submit button' ) ?></button>
</form>