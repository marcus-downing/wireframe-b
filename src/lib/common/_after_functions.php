<?php


if (is_admin()) {
  include "lib/admin.php";
} else {
  include "lib/main.php";
}