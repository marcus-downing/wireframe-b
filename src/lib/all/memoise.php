<?php

namespace wireframe_b;


function memoise($key, callable $fn) {
  if (isset($GLOBALS['wireframe_b'][$key]))
    return $GLOBALS['wireframe_b'][$key];

  $value = $fn();
  $GLOBALS['wireframe_b'][$key] = $value;
  return $value;
}