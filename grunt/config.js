// var processPHPfile = function(src, filepath) {
//   src = src.replace(/^\<\?php/, '');
//   src = src.replace(/\/\*[^]*?\*\//g, '');

//   //  squish newlines a bit (but not too much)
//   src = src.replace(/\n[\n\s]*\n/g, '\n\n');
//   src = src.replace(/^[\n\s]*/, '');
//   src = src.replace(/[\n\s]*$/, '\n');
//   return src;
// };

module.exports = function (grunt) {
  var fs = require('fs')
    , util = require('util')
    , ini = require('ini')
    , path = require('path')
    , _ = require('lodash-node');


  //  read and merge options
  grunt.themeConfig = {};
  _(grunt.sources).each(function (src) {
    var pkg = grunt.file.readJSON(src+'/package.json');
    _.defaults(grunt.themeConfig, pkg.config);
  });
  grunt.debug = grunt.themeConfig.debug;
  if (grunt.debug) console.log("Debug flag ON!\n");



  //  functions to find files across multiple source folders

  grunt.isValidFile = function (file) {
    var paths = file.split('/');
    var fn = _.last(paths);
    return fn[0] != '_' && fn[0] != '.';
  };


  grunt.locateFile = function (filename) {
    var fileVersions = _(grunt.sources).map(function (src) {
      return src+'/'+filename;
    }).filter(function (path) {
      return grunt.file.exists(path);
    });

    if (fileVersions.isEmpty()) {
      return null;
    } else {
      return fileVersions.first();
    }
  };

  grunt.locateFiles = function (filename) {
    // if (grunt.debug) console.log("Locating files: "+filename);
    var fileVersions = _(grunt.sources).map(function (src) {
      return src+'/'+filename;
    }).filter(function (path) {
      // if (grunt.debug) console.log("Testing path: "+path+" -> "+grunt.file.exists(path));
      return grunt.file.exists(path);
    }).value();
    return fileVersions;
  }

  grunt.locateSets = function (path) {
    var sources = _(grunt.sources).map(function (src) {
      return src+'/'+path;
    }).filter(function (src) {
      return fs.statSync(src).isDirectory();
    }).value();

    if (grunt.debug) {
    var sets = {};
    _(sources).each(function (src) {
      var dirsets = fs.readdirSync(src);
      _(dirsets).each(function (dirset) {
        console.log("Found source set: "+dirset);
      });
    });
    }

    // ...
  };

  grunt.locateSetFiles = function (path, set, pattern, key) {
    // if (grunt.debug) console.log("\nLocate set files: "+path+", "+set+", "+pattern+", "+key);
    var sources = _(grunt.sources).map(function (src) {
      return src+'/'+path+'/'+set;
    }).filter(function (src) {
      return grunt.file.exists(src) && fs.statSync(src).isDirectory();
    });
    // if (grunt.debug) console.log(" in sources: "+sources);

    if (!!key) {
      var keyedSources = sources.map(function (src) {
        return src+'/'+key;
      }).filter(function (keyfile) {
        // if (grunt.debug) console.log("Checking keyed source: "+keyfile);
        return grunt.file.exists(keyfile);
      });

      if (!keyedSources.isEmpty()) {
        // if (grunt.debug) console.log("Found keyed sources: "+keyedSources);
        return [ keyedSources.first() ];
      }
    }

    var names = _(sources).map(function (src) {
      var files = fs.readdirSync(src);
      files = _(files).filter(function (name) {
        var filename = src+'/'+name;
        return fs.statSync(filename).isFile();
      }).value();
      // if (grunt.debug) console.log("Found files named: "+files);
      return files;
    }).flatten().filter(function (str) {
      // if (grunt.debug) console.log("Checking name: "+str);
      return str != "";
    }).uniq();
    if (names.isEmpty())
      return [];
    // if (grunt.debug) console.log("Found files named: "+names);

    var files = names.map(function (name) {
      // if (grunt.debug) console.log("Looking for files named: "+name);
      return _(sources).map(function (src) {
        return src+'/'+name;
      }).filter(function (filename) {
        // if (grunt.debug) console.log("Checking file: "+filename);
        return grunt.file.exists(filename);
      }).first();
    }).value();
    // if (grunt.debug) console.log("Found files: "+files);
    return files;
  };

  //  start with basic information used by all the tasks
  var pkg = grunt.file.readJSON('package.json');
  grunt.initConfig({
    pkg: pkg,
    env: process.env,
    watch: {
      options: { spawn: false, livereload: true }
    }
  });

  var themeName = pkg.name; // path.basename(grunt.dest);
  if (grunt.debug) console.log("Compiling theme '"+themeName+"' with config: "+JSON.stringify(grunt.themeConfig, null, 4)+"\n");

  // set up some data
  grunt.dirs = {
    'themeSource': _.first(grunt.sources),
    'coreSource': _.last(grunt.sources),
    'base': grunt.locateFile('bootstrap/'+grunt.themeConfig.base),
    'dest': grunt.dest
  };
  if (grunt.debug) console.log('Directories: '+JSON.stringify(grunt.dirs, null, 4));


  //  common config bits
  // var concat_php_options = {
  //   banner: '<?php\n',
  //   process: processPHPfile
  // };

  // var concat_js_options = {
  //   separator: ';\n\n',
  //   sourceMap: true
  // };


  // extra configuration
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // console.log("loaded common tasks");

  require('./functions.js')(grunt, _);
  require('./stylesheets.js')(grunt, _);
  require('./javascript.js')(grunt, _);
  require('./images.js')(grunt, _);
  require('./templates.js')(grunt, _);
  require('./colours.js')(grunt, _);
  require('./tests.js')(grunt, _);
  require('./docs.js')(grunt, _);
  if (grunt.debug) console.log("\n\n");

  // console.log("loaded config tasks");
  // console.log(JSON.stringify(grunt.config.imagemin));

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
    'copy',
    'concat', 
    'uglify', 
    'less',
    'imagemin',
    // 'webfont',
    // 'markdown'
  ]);


};