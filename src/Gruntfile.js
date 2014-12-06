var processPHPfile = function(src, filepath) {
  src = src.replace(/^\<\?php/, '');
  src = src.replace(/\/\*[^]*?\*\//g, '');

  //  squish newlines a bit (but not too much)
  src = src.replace(/\n[\n\s]*\n/g, '\n\n');
  src = src.replace(/^[\n\s]*/, '');
  src = src.replace(/[\n\s]*$/, '\n');
  return src;
};

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {

      main_functions: {
        options: {
          banner: '<?php\n',
          process: processPHPfile,
        },
        src: [
          'lib/common/_functions.php',
          'lib/all/*.php',
          'lib/common/_before_admin.php',
          'lib/admin/*.php',
          'lib/common/_after_admin.php',
          'lib/main/*.php',
          'lib/common/_after_main.php'
        ],
        dest: '../functions.php'
      },

      main_scripts: {
        options: {
          'separator': ';\n\n',
          'sourceMap': true
        },
        src: [
          'js/all/*.js',
          'js/main/*.js'
        ],
        dest: '../main.js'
      }

    },

    uglify: {
      main: {
        src: '../main.js',
        dest: '../main.min.js'
      }
    },

    watch: {
      js: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        },
      },

      lib: {
        files: ['lib/*.php'],
        tasks: ['concat'],
        options: {
          spawn: false,
        },
      }
    }
  });

  // use these plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // actual tasks
  grunt.registerTask('default', ['concat', 'uglify']);


};