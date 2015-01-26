<?php

namespace wireframe_b;

global $wireframe_b_global;
if (!is_array($wireframe_b_global))
  $wireframe_b_global = array();

/*
  $value = memoise('keyname', function () { });
  The memoise function can be used to store the values of a lengthy calculation to avoid having to do it more than once per request.

  If the $store parameter is set, the calculation will use WordPress' transients API to store the value for a longer term
*/

function memoise($key, callable $fn, $store = false) {
  $value = &the_global('memo', $key);
  if (!is_null($memo))
    return $memo;

  $value = $fn();
  return $value;
  

  // if (has_global('memo', $key))
  //   return get_global('memo', $key);

  // $value = $fn();
  // set_global('memo', $key, $value);
  // return $value;
}

/*
  Namespaced globals.

  set_global('group', 'key', $value);
  $value = get_global('group', 'key');
*/
function &the_global($group, $key = null, $subkey = null) {
  global $wireframe_b_global;
  if (!is_array($wireframe_b_global[$group]))
    $wireframe_b_global[$group] = array();
  if (is_null($key))
    return $wireframe_b_global[$group];
  if (is_null($subkey))
    return $wireframe_b_global[$group][$key];
  return $wireframe_b_global[$group][$key][$subkey];
}

function has_global($group, $key = null, $subkey = null) {
  global $wireframe_b_global;

  if (is_null($key)) {
    // echo "Checking one-part global: $group = ".$wireframe_b_global[$group]."\n";
    return isset($wireframe_b_global[$group]);
  }
  if (is_null($subkey)) {
    // echo "Checking two-part global: $group / $key = ".$wireframe_b_global[$group][$key]."\n";
    return isset($wireframe_b_global[$group][$key]);
  }
  // echo "Checking three-part global: $group / $key / $subkey = ".$wireframe_b_global[$group][$subkey]."\n";
  return isset($wireframe_b_global[$group][$key][$subkey]);
}

function get_global($group, $key = null, $subkey = null) {
  global $wireframe_b_global;

  if (is_null($key)) {
    // echo "Getting one-part global: $group = ".$wireframe_b_global[$group]."\n";
    if (!isset($wireframe_b_global[$group]))
      return null;
    return $wireframe_b_global[$group];
  }

  if (is_null($subkey)) {
    // echo "Getting two-part global: $group / $key = ".$wireframe_b_global[$group][$key]."\n";
    if (!isset($wireframe_b_global[$group][$key]))
      return null;
    return $wireframe_b_global[$group][$key];
  }

  // echo "Getting three-part global: $group / $key / $subkey = ".$wireframe_b_global[$group][$key][$subkey]."\n";
  if (!isset($wireframe_b_global[$group][$key][$subkey]))
    return null;
  return $wireframe_b_global[$group][$key][$subkey];
}

function set_global($group, $a, $b = null, $c = null) {
  global $wireframe_b_global;

  if (is_null($b)) {
    $value = $a;
    // echo "Setting one-part global: $group = $value\n";
    $wireframe_b_global[$group] = (array) $value;
    return;
  }

  if (is_null($c)) {
    $key = $a;
    $value = $b;
    // echo "Setting two-part global: $group / $key = $value\n";

    if (!is_array($wireframe_b_global[$group]))
      $wireframe_b_global[$group] = array();
    $wireframe_b_global[$group][$key] = $value;
    return;
  }

  $key = $a;
  $subkey = $b;
  $value = $c;
  // echo "Setting three-part global: $group / $key / $subkey = $value\n";

  if (!is_array($wireframe_b_global[$group]))
    $wireframe_b_global[$group] = array();
  if (!is_array($wireframe_b_global[$group][$key]))
    $wireframe_b_global[$group][$key] = array();
  $wireframe_b_global[$group][$key][$subkey] = $value;
}

function clear_global($group, $key = null, $subkey = null) {
  global $wireframe_b_global;

  if (is_null($key)) {
    unset($wireframe_b_global[$group]);
  } else if (is_null($subkey)) {
    unset($wireframe_b_global[$group][$key]);
  } else {
    unset($wireframe_b_global[$group][$key][$subkey]);
  }
}