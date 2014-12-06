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
  var themename = "Wireframe b"


  //  the theme's main metadata
  var stylebanner = grunt.file.read("config/theme.conf");
  stylebanner = "/*!\n"+stylebanner+"\n*/\n\n";


  //  common config bits
  var concat_php_options = {
    banner: '<?php\n',
    process: processPHPfile
  };

  var concat_js_options = {
    separator: ';\n\n',
    sourceMap: true
  };

  var less_options = {
    paths: ["less/all", "less/common"],
    compress: true,
    cleancss: true
  };

  //  configure the tasks
  var grunt_config = {
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      options: {
        force: true,
      },
      templates: ["../*.php", "!."]
    },

    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ['templates/*.php'], dest: '../', filter: 'isFile'}
        ]
      }
    },

    concat: {
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
        dest: '../lib/main.php',
      },

      admin_php: {
        options: concat_php_options,
        src: [
          'lib/admin/*.php'
        ],
        dest: '../lib/admin.php',
      }
    },
    
    jshint: {
      all: ['js/**/*.js']
    },

    uglify: {
      options: {
        sourceMap: true
      },
      main: {
        src: [
          bootstrap+'/dist/js/bootstrap.min.js',
          'js/all/*.js',
          'js/main/*.js'
        ],
        dest: '../js/main.min.js'
      }
    },

    less: {
      main: {
        options: {
          paths: ["less/all", "less/common"],
          banner: stylebanner,
          cleancss: true,
          // compress: true,
        },
        files: {
          "../style.css": [bootstrap+"/less/bootstrap.less", "less/all/*.less", "less/main/main.less"]
        }
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

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: '../images'
        }]
      }
    },

    webfont: {
      icons: {
        src: 'icons/*.svg',
        dest: '../fonts',
        options: {
          syntax: 'bootstrap',
          autoHint: false,
        }
      }
    },

    markdown: {
      all: {
        files: [
          {
            expand: true,
            src: '../README.md',
            dest: './',
            ext: '.html'
          },
          {
            expand: true,
            src: 'docs/*.md',
            dest: '../',
            ext: '.html'
          }
        ],
        options: {
          template: 'etc/template.html'
        }
      }
    }
  };

  if (grunt.file.exists("less/editor/*.less")) {
    grunt_config.less.ie11 = {
      options: less_options,
      files: {
        "../editor.css": ["less/editor/*.less"]
      }
    }
  }
  if (grunt.file.exists("less/all/*.less", "less/admin/*.less")) {
    grunt_config.less.ie11 = {
      options: less_options,
      files: {
        "../admin.css": ["less/all/*.less", "less/admin/*.less"]
      }
    }
  }

  // modify the config with optional and variant bits
  if (grunt.file.exists("less/ie7/*.less")) {
    grunt_config.less.ie11 = {
      options: less_options,
      files: {
        "../ie7.css": ["less/ie7/*.less"]
      }
    }
  }

  if (grunt.file.exists("less/ie8/*.less")) {
    grunt_config.less.ie11 = {
      options: less_options,
      files: {
        "../ie8.css": ["less/ie8/*.less"]
      }
    }
  }

  if (grunt.file.exists("less/ie9/*.less")) {
    grunt_config.less.ie11 = {
      options: less_options,
      files: {
        "../ie9.css": ["less/ie9/*.less"]
      }
    }
  }

  if (grunt.file.exists("less/ie10/*.less")) {
    grunt_config.less.ie11 = {
      options: less_options,
      files: {
        "../ie10.css": ["less/ie10/*.less"]
      }
    }
  }

  if (grunt.file.exists("less/ie11/*.less")) {
    grunt_config.less.ie11 = {
      options: less_options,
      files: {
        "../ie11.css": ["less/ie11/*.less"]
      }
    }
  }

  // actually do the config
  grunt.initConfig(grunt_config);

  // use these plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-markdown');

  // actual tasks
  grunt.registerTask('default', [
    'clean',
    // 'jshint', 
    'copy',
    'concat', 
    'uglify', 
    'less',
    'imagemin',
    'webfont',
    'markdown'
  ]);


};