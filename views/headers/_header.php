<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-type" content="text/html; charset=UTF-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <?php
    do_action('wireframe-b\header\meta');
    $viewport = apply_filters('wireframe-b\header\meta-viewport', 'width=device-width, initial-scale=1');
    if (!empty($viewport)) {
      echo "\n<meta name='viewport' content='$viewport'>";
    }
  ?>

  <?php do_action('wireframe-b\header\before-css'); ?>
  <link rel="stylesheet" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>" />
  <?php 

  //  Internet Explorer stylesheets
  if (file_exists(STYLESHEETPATH."/ie9.css"))
    echo "<!--[if IE 9]> <link rel='stylesheet' type='text/css' href='".get_stylesheet_directory_uri()."/ie9.css' /> <![endif]-->\n";
  if (file_exists(STYLESHEETPATH."/ie8.css"))
    echo "<!--[if IE 8]> <link rel='stylesheet' type='text/css' href='".get_stylesheet_directory_uri()."/ie8.css' /> <![endif]-->\n";
  if (file_exists(STYLESHEETPATH."/ie7.css"))
    echo "<!--[if IE 7]> <link rel='stylesheet' type='text/css' href='".get_stylesheet_directory_uri()."/ie7.css' /> <![endif]-->\n";
  if (file_exists(STYLESHEETPATH."/ie6.css"))
    echo "<!--[if lt IE 7]> <link rel='stylesheet' type='text/css' href='".get_stylesheet_directory_uri()."/ie6.css' /> <![endif]-->\n";

  // wireframe_b\write_favicon();

  ?><link rel="alternate" type="application/rss+xml" href="<?php bloginfo('rss2_url'); ?>" title="<?php printf( __( '%s latest posts', 'your-theme' ), esc_html( get_bloginfo('name'), 1 ) ); ?>" /><?php
  do_action('wireframe-b\header\after-css');

  do_action('wireframe-b\header');
  wp_head();

  ?>
</head>
<body <?php body_id(); body_class(); body_data(); ?>>
<div id='body-wrapper'>
<header id='header'>
<div id='header-inner'>
<%= inner_header() %>
</div>
</header>
<section id='body'>
<div id='body-inner'>