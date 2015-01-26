<?php

/**
 *  Write the skip link
 *
 *  <code>
 *  \bootstrap\skiplink();
 *  </code>
 */
function skiplink() {
  echo "<a class='sr-only sr-only-focusable' href='#content'>".__('Skip to main content', 'bootstrap').'</a>';
}
