<?php

namespace wireframe_b;

/*
  The memoise function can be used to store the values of a lengthy calculation to avoid having to do it more than once per request.

  If the $store parameter is set, the calculation will use WordPress' transients API to store the value for a longer term
*/

function memoise($key, callable $fn, $store = false) {
  if (isset($GLOBALS['wireframe_b'][$key]))
    return $GLOBALS['wireframe_b'][$key];

  $value = $fn();
  $GLOBALS['wireframe_b'][$key] = $value;
  return $value;
}