<?php


if (is_admin()) {
  include "admin.php";
} else {
  include "main.php";
}