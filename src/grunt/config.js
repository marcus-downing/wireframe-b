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
  var fs = require('fs')
    , ini = require('ini')
    , path = require('path');

  var _ = require('lodash-node');

  var themeSource = grunt.sources[0];
  var coreSource = grunt.sources[grunt.sources.length - 1];

  console.log("Wb: Compiling theme: "+grunt.dest);
  // console.log("Wb: Compiling theme: "+themeSource);
  // console.log("Wb: Core source: "+coreSource);
  console.log("");

  var bootstrap = "bootstrap-3.3.1";



  grunt.locateFile = function (filename) {
    var fileVersions = _(grunt.sources).map(function (src) {
      return src+'/'+filename;
    }).filter(function (path) {
      return fs.existsSync(path);
    });

    if (fileVersions.isEmpty()) {
      return null;
    } else {
      return fileVersions.first();
    }
  };

  grunt.locateSets = function (path) {
    var sources = _(grunt.sources).map(function (src) {
      return src+'/'+path;
    }).filter(function (src) {
      var stats = fs.statSync(src);
      return stats.isDirectory();
    }).value();

    var sets = {};
    _(sources).each(function (src) {
      var dirsets = fs.readdirSync(src);
      _(dirsets).each(function (dirset) {
        console.log("Found source set: "+dirset);
      });
    });

    // ...
  };

  grunt.locateSetFiles = function (path, set, key) {

    // ...
  };

  //  basic information used by all the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  });

  grunt.dirs = {
    'theme_source': themeSource,
    'core_source': coreSource,
    'bootstrap': grunt.locateFile('bootstrap/'+bootstrap)
  };

  //  read script config
  // var themename = "Wireframe b"



  //  the theme's main metadata
  // var themeconf = grunt.file.read("config/theme.conf");
  // var stylebanner = "/*!\n"+themeconf+"\n*/\n\n";


  // Process the colours
  /*var colours = ini.parse(grunt.file.read("config/colours.ini"));
  var colours_less = "";
  for (name in colours) {
    var value = colours[name];
    colours_less = colours_less+"@colour_"+name+": #"+value+";\n";
  }
  grunt.file.write("tmp/less/colours.less", colours_less);*/



  //  common config bits
  var concat_php_options = {
    banner: '<?php\n',
    process: processPHPfile
  };

  var concat_js_options = {
    separator: ';\n\n',
    sourceMap: true
  };


  // extra configuration
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');


  require('./stylesheets.js')(grunt, _);
  require('./javascript.js')(grunt, _);


  // grunt.config.merge({
  //   clean: {
  //     options: {
  //       force: true,
  //     },
  //     templates: ["../*.php", "!."]
  //   }
  // });

/*
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.config({
    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ['templates/*.php'], dest: '../', filter: 'isFile'}
        ]
      }
    }
  });
*/


  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.config({
  //   concat: {
  //     functions_php: {
  //       options: concat_php_options,
  //       src: [
  //         'lib/common/_functions.php',
  //         'lib/all/*.php',
  //         'lib/common/_after_functions.php'
  //       ],
  //       dest: '../functions.php'
  //     },

  //     main_php: {
  //       options: concat_php_options,
  //       src: [
  //         'lib/main/*.php'
  //       ],
  //       dest: '../lib/main.php',
  //     },

  //     admin_php: {
  //       options: concat_php_options,
  //       src: [
  //         'lib/admin/*.php'
  //       ],
  //       dest: '../lib/admin.php',
  //     }
  //   },
  // });
    
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.config({
  //   jshint: {
  //     all: ['js/**/*.js']
  //   },

  //   uglify: {
  //     options: {
  //       sourceMap: true
  //     },
  //     main: {
  //       src: [
  //         bootstrap+'/dist/js/bootstrap.min.js',
  //         'js/all/*.js',
  //         'js/main/*.js'
  //       ],
  //       dest: '../js/main.min.js'
  //     }
  //   },
  // });


  // grunt.loadNpmTasks('grunt-contrib-less');
  // grunt.config({
  //   less: {
  //     main: {
  //       options: {
  //         paths: ["less/all", "less/common"],
  //         banner: stylebanner,
  //         cleancss: true,
  //         // compress: true,
  //       },
  //       files: {
  //         "../style.css": [bootstrap+"/less/bootstrap.less", "tmp/less/*.less", "less/all/*.less", "less/main/main.less"]
  //       }
  //     }
  //   },
  // });

  // grunt.config({
  //   watch: {
  //     js: {
  //       files: ['js/*.js'],
  //       tasks: ['concat', 'uglify'],
  //       options: {
  //         spawn: false,
  //       },
  //     },

  //     lib: {
  //       files: ['lib/*.php'],
  //       tasks: ['concat'],
  //       options: {
  //         spawn: false,
  //       },
  //     }
  //   },
  // });

  //  imagemin
  // grunt.loadNpmTasks('grunt-contrib-imagemin');
  // grunt.config({
  //   imagemin: {
  //     dynamic: {
  //       files: [{
  //         expand: true,
  //         cwd: 'images/',
  //         src: ['**/*.{png,jpg,gif}'],
  //         dest: '../images'
  //       }]
  //     }
  //   },
  // });

/*
  //  webfont
  grunt.loadNpmTasks('grunt-webfont');
  grunt.config({
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
  });

  grunt.loadNpmTasks('grunt-markdown');
  grunt.config({
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
  });


  if (grunt.file.exists("less/editor/*.less")) {
    grunt.config(['less', 'editor'], {
      options: less_options,
      files: {
        "../editor.css": ["less/editor/*.less"]
      }
    });
  }
  if (grunt.file.exists("less/all/*.less", "less/admin/*.less")) {
    grunt.config(['less', 'admin'], {
      options: less_options,
      files: {
        "../admin.css": ["less/all/*.less", "less/admin/*.less"]
      }
    });
  }

  // modify the config with optional and variant bits
  if (grunt.file.exists("less/ie7/*.less")) {
    grunt.config(['less', 'ie7'], {
      options: less_options,
      files: {
        "../ie7.css": ["less/ie7/*.less"]
      }
    });
  }

  if (grunt.file.exists("less/ie8/*.less")) {
    grunt.config(['less', 'ie8'], {
      options: less_options,
      files: {
        "../ie8.css": ["less/ie8/*.less"]
      }
    });
  }

  if (grunt.file.exists("less/ie9/*.less")) {
    grunt.config(['less', 'ie9'], {
      options: less_options,
      files: {
        "../ie9.css": ["less/ie9/*.less"]
      }
    });
  }

  if (grunt.file.exists("less/ie10/*.less")) {
    grunt.config(['less', 'ie10'], {
      options: less_options,
      files: {
        "../ie10.css": ["less/ie10/*.less"]
      }
    });
  }

  if (grunt.file.exists("less/ie11/*.less")) {
    grunt.config(['less', 'ie11'], {
      options: less_options,
      files: {
        "../ie11.css": ["less/ie11/*.less"]
      }
    });
  }
  */

  // use these plugins

  // actual tasks
  grunt.registerTask('default', [
    // 'clean',
    // 'jshint', 
    // 'copy',
    // 'concat', 
    'uglify', 
    'less',
    // 'imagemin',
    // 'webfont',
    // 'markdown'
  ]);


};