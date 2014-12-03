#!/bin/sh

# Use the contents of this 'make' directory to build the theme.


##  1. Arguments

CHILD_THEME="$1"


##  2. Check dependencies

if command -v nodejs > /dev/null 2>&1; then
  echo -n "Using nodejs: "
  nodejs -v
else
  echo "Error: Cannot find nodejs!"
  exit
fi

if command -v lessc > /dev/null 2>&1; then
  echo -n "Using lessc: "
  lessc -v
else
  echo "Error: Cannot find lessc!"
  exit
fi

if command -v uglifyjs > /dev/null 2>&1; then
  echo "Using uglifyjs"
else
  echo "Cannot find uglifyjs"
fi


##  3. Check config

# . conf/make.conf

if [ -z "$BOOTSTRAP" ]; then
  BOOTSTRAP="$(ls bootstrap | tail -n 1)"
fi
BOOTSTRAP_DIR="$(readlink -f bootstrap/$BOOTSTRAP)"
if [ ! -d "$BOOTSTRAP_DIR" ]; then
  echo "Error: Bootstrap folder not found: $BOOTSTRAP_DIR"
  exit
fi
echo "Using bootstrap: $BOOTSTRAP"


##  4. Are we building a child theme?

if [ -z "$CHILD_THEME" ]; then
  echo "Building base theme"
else
  echo "Building child theme: $CHILD_THEME"
fi