<?php

if (is_singular() && have_posts())
  the_post();

?><%= inner_layout() %>