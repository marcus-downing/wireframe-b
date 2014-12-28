//  Compile LESS stylesheets
module.exports = function (grunt, _) {
  var path = require('path');

  var scheme = grunt.themeConfig.stylesheets;
  var extension = (scheme == 'less') ? '.less' : '.scss';
  var wildcard = '*'+extension;

  if (scheme == 'less')
    grunt.loadNpmTasks('grunt-contrib-less');
  else if (scheme == 'sass')
    grunt.loadNpmTasks('grunt-contrib-sass');


  //  build the theme's banner from the package contents

  var pkg = {};
  _(grunt.sources).each(function (src) {
    var pkg_file = src+'/package.json';
    if (grunt.file.exists(pkg_file)) {
      var src_pkg = grunt.file.readJSON(pkg_file);
      _.defaults(pkg, src_pkg);
    }
  }).merge().value()[0];

  var themebanner = grunt.template.process("/*!\n"+
    "Theme Name: <%= pkg.title %>\n"+
    "Theme URI: <%= pkg.homepage %>\n"+
    "Description: <%= pkg.description %>\n"+
    "Author: <%= pkg.author.name %>\n"+
    "Author URI: <%= pkg.author.url %>\n"+
    "Version: <%= pkg.version %>\n"+
    "Tags: wireframe-b <%= false %>\n"+
    "License: <%= pkg.license %>\n"+
    "License URI: <%= false %>\n"+
    "*/\n", {
      pkg: pkg
    });


  function createImportScript(sources, rel) {
    if (!_.isNull(rel)) {
      sources =  _.map(sources, function (source) {
        if (grunt.file.isPathAbsolute(source)) {
          return path.relative(rel, source);
        }
        return source;
      });
    }
    return _.map(sources, function (source) {
      return "@import \""+source+"\";";
    }).join("\n");
  }

  function writeImportFile(sources, dest) {
    var script = createImportScript(sources, path.dirname(dest));
    grunt.file.write(dest, script);
  }


  //  locate files
  var base_files = [grunt.dirs.base+'/'+scheme+'/bootstrap'+extension];
  var all_files = grunt.locateSetFiles(scheme, "all", wildcard, "all"+extension);
  var main_core_files = grunt.locateSetFiles(scheme, "main", '_'+wildcard);
  var main_files = grunt.locateSetFiles(scheme, "main", wildcard, "main"+extension);
  var admin_files = grunt.locateSetFiles(scheme, "admin", wildcard, "admin"+extension);
  var editor_files = grunt.locateSetFiles(scheme, "editor", wildcard, "editor"+extension);

  var responsive_file = grunt.locateFile(scheme+'/common/_responsive'+extension);
  var tmp_responsive_file = grunt.dirs.tmp+'/less/_responsive.less';
  var tmp_main_file = grunt.dirs.tmp+'/less/_main.less';

  var responsive_code = grunt.file.read(responsive_file);
  responsive_code = grunt.template.process(responsive_code, { data: {
    import_stylesheet_set: function (set) {
      var set_files = grunt.locateSetFiles(scheme, set, wildcard, set+extension);
      return createImportScript(set_files, path.dirname(tmp_responsive_file));
    },
    import_base_variables: function () {
      return '';
      // var variables = grunt.dirs.base+'/'+scheme+'/variables'+extension;
      // var var_files = _.merge([ variables ], all_files);
      // return createImportScript(all_files, path.dirname(tmp_responsive_file));
    }
  }});
  grunt.file.write(tmp_responsive_file, responsive_code);

  main_files =  _.union(base_files, all_files, main_core_files, main_files, [ tmp_responsive_file ]);
  admin_files = _.union(all_files, admin_files);
  if (grunt.debug) console.log("Main LESS: "+JSON.stringify(main_files, null, 4));
  if (grunt.debug) console.log("Admin LESS: "+JSON.stringify(admin_files, null, 4));
  writeImportFile(main_files, tmp_main_file);


  //  options including includable paths
  var include_paths = [scheme+"/all", scheme+"/common"]
  var less_main_options = {
    paths: include_paths,
    banner: themebanner,
    sourceMap: true,
    sourceMapFilename: grunt.dest+'/style.css.map'
  };
  var less_options = {
    paths: include_paths,
  };
  if (grunt.themeConfig.min) {
    less_options.compress = true;
    less_main_options.compress = true;
  }

  //  the config
  if (scheme == 'less') {
    grunt.config.merge({
      less: {
        main: {
          options: less_main_options,
          src: tmp_main_file,
          dest: grunt.dest+'/style.css'
        },
        admin: {
          options: less_options,
          src: admin_files,
          dest: grunt.dest+'/admin.css'
        },
      },

      watch: {
        stylesheets: {
          files: _.union(all_files, main_files),
          tasks: ['less']
        }
      }
    });

    var sets = grunt.locateSets();
  } else if (scheme == 'sass') {
    // .. todo SASS
  } else {
    // .. todo ???
  }

/*
  editor_files = grunt.locateSetFiles("less", "editor", );
  if (grunt.file.exists(grunt.dirs.theme_source+"/less/editor/*.less")) {
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
};