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
  //  read script config
  var bootstrap = "bootstrap/bootstrap-3.3.1";


  var concat_php_options = {
    banner: '<?php\n',
    process: processPHPfile
  };

  var concat_js_options = {
    separator: ';\n\n',
    sourceMap: true
  };

  //  configure the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {

      //  build functions.php, autoloading the appropriate bits of everything
      functions_php: {
        options: concat_php_options,
        src: [
          'lib/common/_functions.php',
          'lib/all/*.php',
          'lib/common/_after_functions.php'
        ],
        dest: '../functions.php'
      },

      main_php: {
        options: concat_php_options,
        src: [
          'lib/main/*.php'
        ],
        dest: '../main.php',
      },

      admin_php: {
        options: concat_php_options,
        src: [
          'lib/admin/*.php'
        ],
        dest: '../admin.php',
      },

      main_scripts: {
        options: concat_js_options,
        src: [
          bootstrap+'/dist/js/bootstrap.min.js',
          'js/all/*.js',
          'js/main/*.js'
        ],
        dest: '../main.js'
      }

    },

    uglify: {
      options: {
        sourceMap: true
      },
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
    },

    markdown: {
      all: {
        files: [
          {
            expand: true,
            src: 'docs/*.md',
            dest: '../',
            ext: '.html'
          }
        ]
      }
    }
  });

  // use these plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-markdown');

  // actual tasks
  grunt.registerTask('default', ['concat', 'uglify', 'markdown']);


};