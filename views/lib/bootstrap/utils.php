<?php

namespace bootstrap;

/*
  \bootstrap\skiplink();
*/
function skiplink() {
  echo "<a class='sr-only sr-only-focusable' href='#content'>".__('Skip to main content', 'bootstrap').'</a>';
}

