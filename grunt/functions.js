//  Compile the theme's functions.php
module.exports = function (grunt, _) {
  grunt.loadNpmTasks('grunt-contrib-concat');

  var processPHPfile = function(src, filepath) {
    src = src.replace(/^\<\?php/, '');
    src = src.replace(/\/\*[^]*?\*\//g, '');

    //  squish newlines a bit (but not too much)
    src = src.replace(/\n[\n\s]*\n/g, '\n\n');
    src = src.replace(/^[\n\s]*/, '');
    src = src.replace(/[\n\s]*$/, '\n');
    return src;
  };

  var functions_files = grunt.locateSetFiles("lib", "all", "*.php");
  functions_files.unshift(grunt.locateFile("lib/common/_before_functions.php"));
  functions_files.push(grunt.locateFile("lib/common/_after_functions.php"));
  var main_files = grunt.locateSetFiles("lib", "main", "*.php");
  var admin_files = grunt.locateSetFiles("lib", "admin", "*.php");

  var concat_php_options = {
    banner: '<?php\n',
    process: processPHPfile
  };

  var concat_js_options = {
    separator: ';\n\n',
    sourceMap: true
  };

  grunt.config.merge({
    concat: {
      functions_php: {
        options: concat_php_options,
        src: functions_files,
        dest: grunt.dest+'/functions.php'
      },

      main_php: {
        options: concat_php_options,
        src: main_files,
        dest: grunt.dest+'/lib/main.php',
      },

      admin_php: {
        options: concat_php_options,
        src: admin_files,
        dest: grunt.dest+'/lib/admin.php',
      }
    },
  });
}