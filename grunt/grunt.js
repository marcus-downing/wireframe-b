module.exports = function (grunt) {
  var fs = require('fs'),
      util = require('util'),
      path = require('path'),
      _ = require('lodash-node');


  //  read and merge options
  grunt.themeConfig = {};
  _(grunt.sources).each(function (src) {
    var pkg_file = src+'/package.json';
    if (grunt.file.exists(pkg_file)) {
      var pkg = grunt.file.readJSON(pkg_file);
      _.defaults(grunt.themeConfig, pkg.config);
    }
    if (grunt.file.exists(src+'/etc') && fs.statSync(src+'/etc').isDirectory()) {
      var files = fs.readdirSync(src+'/etc');
      _(files).filter(function (etcFile) {
        return path.extname(etcFile) == '.json';
      }).map(function (etcFile) {
        return src+'/etc/'+etcFile;
      }).each(function (etcFile) {
        var cfg_json = grunt.file.readJSON(etcFile);
        _.defaults(grunt.themeConfig, cfg_json);
      });
    }
  });

  grunt.debug = grunt.themeConfig.debug;
  if (grunt.debug) console.log("Debug flag ON!\n");

  //  load utils early, we need them
  require('./util.js')(grunt, _);

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
  var themeSrc = _.first(grunt.sources);
  var tmp = themeSrc+'/tmp';
  grunt.sources.unshift(tmp);

  var bootstrapdir = grunt.wb.locateFile('node_modules/bootstrap');
  if (grunt.file.exists(bootstrapdir+'/sass')) {
    if (grunt.debug) console.log("Selecting SASS");
    grunt.stylesheets = 'sass';
  } else if (grunt.file.exists(bootstrapdir+'/less')) {
    if (grunt.debug) console.log("Selecting LESS");
    grunt.stylesheets = 'less';
  } else {
    if (grunt.debug) console.log("Selecting CSS");
    grunt.stylesheets = 'css';
  }

  grunt.dirs = {
    'themeSource': themeSrc,
    'coreSource': _.last(grunt.sources),
    'tmp': tmp,
    'base': bootstrapdir,
    'dest': grunt.dest
  };
  if (grunt.debug) console.log('Directories: '+JSON.stringify(grunt.dirs, null, 4));


  // loading tasks from local
   var modulesDir = grunt.dirs.coreSource+'/node_modules';
  _(fs.readdirSync(modulesDir)).each(function (module) {
    var tasksDir = modulesDir+'/'+module+'/tasks';
    // if (grunt.debug) console.log('Loading tasks from '+tasksDir);
    if (grunt.file.exists(tasksDir))
      grunt.loadTasks(tasksDir);
  });

  // extra configuration
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-clean');

  require('./functions.js')(grunt, _);
  require('./stylesheets.js')(grunt, _);
  require('./javascript.js')(grunt, _);
  require('./images.js')(grunt, _);
  require('./icons.js')(grunt, _);
  require('./views.js')(grunt, _);
  require('./colours.js')(grunt, _);
  require('./tests.js')(grunt, _);
  require('./api.js')(grunt, _);
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
    grunt.stylesheets, // either less or sass
    // 'image_resize',
    'responsive_images',
    'imagemin',
    // 'markdown'
  ]);

  grunt.registerTask('watch', ['default', 'watch']);

};
