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

  grunt.filenameMatchesWildcard = function (pattern) {
    if (_.isNull(pattern) || _.isEmpty(pattern)) {
      return function (file) {
        return true;
      };
    }

    return function (file) {
      var paths = file.split('/');
      var fn = _.last(paths);

      var re = new RegExp('^'+pattern.replace('.', '\\.').replace('*', '.*')+'$');
      return fn.match(re);
    };
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

  grunt.locateFiles = function (path, pattern) {
    var sources = _(grunt.sources).map(function (src) {
      return src+'/'+path;
    }).filter(function (src) {
      return grunt.file.exists(src) && fs.statSync(src).isDirectory();
    }).value();

    var matchesPattern = grunt.filenameMatchesWildcard(pattern);
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
      return str != "" && matchesPattern(str);
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


    // if (grunt.debug) console.log("Locating files: "+filename);
    // var fileVersions = _(grunt.sources).map(function (src) {
    //   return src+'/'+filename;
    // }).filter(function (path) {
    //   if (grunt.debug) console.log("Testing path: "+path+" -> "+grunt.file.exists(path));
    //   return grunt.file.exists(path);
    // }).value();
    // return fileVersions;
  }

  grunt.locateSets = function (path) {
    var sources = _(grunt.sources).map(function (src) {
      return src+'/'+path;
    }).filter(function (src) {
      return grunt.file.exists(src) && fs.statSync(src).isDirectory();
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
    return sources;
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

    var matchesPattern = grunt.filenameMatchesWildcard(pattern);
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
      return str != "" && matchesPattern(str);
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
    'tmp': _.first(grunt.sources)+'/tmp',
    'base': grunt.locateFile('bootstrap/'+grunt.themeConfig.base),
    'dest': grunt.dest
  };
  if (grunt.debug) console.log('Directories: '+JSON.stringify(grunt.dirs, null, 4));


  // extra configuration
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  require('./functions.js')(grunt, _);
  require('./stylesheets.js')(grunt, _);
  require('./javascript.js')(grunt, _);
  require('./images.js')(grunt, _);
  require('./icons.js')(grunt, _);
  require('./templates.js')(grunt, _);
  require('./colours.js')(grunt, _);
  require('./tests.js')(grunt, _);
  require('./docs.js')(grunt, _);
  if (grunt.debug) console.log("\n\n");

  // actual tasks
  grunt.registerTask('default', [
    // 'clean',
    // 'jshint', 
    'webfont',
    'copy',
    'concat', 
    'uglify', 
    'less',
    // 'image_resize',
    'imagemin',
    // 'markdown'
  ]);

  grunt.registerTask('watch', ['default', 'watch']);

};