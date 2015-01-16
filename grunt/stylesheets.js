//  Compile LESS stylesheets
module.exports = function (grunt, _) {
  var path = require('path');

  var scheme = grunt.stylesheets;
  var extension = (scheme == 'less') ? '.less' : '.scss';
  var wildcard = '*'+extension;

  // if (scheme == 'less')
  //   grunt.loadNpmTasks('grunt-contrib-less');
  // else if (scheme == 'sass')
  //   grunt.loadNpmTasks('grunt-contrib-sass');


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
      return "@import (less) \""+source+"\";";
    }).join("\n");
  }

  function writeImportFile(sources, dest) {
    var script = createImportScript(sources, path.dirname(dest));
    grunt.file.write(dest, script);
  }


  //  locate files
  var base_files = [grunt.dirs.base+'/'+scheme+'/bootstrap'+extension];
  var all_files = grunt.wb.locateSetFiles(scheme, "all", wildcard, "all"+extension);
  var main_core_files = grunt.wb.locateSetFiles(scheme, "main", '_'+wildcard);
  var main_files = grunt.wb.locateSetFiles(scheme, "main", wildcard, "main"+extension);
  var admin_files = grunt.wb.locateSetFiles(scheme, "admin", wildcard, "admin"+extension);
  var editor_files = grunt.wb.locateSetFiles(scheme, "editor", wildcard, "editor"+extension);

  var responsive_file = grunt.wb.locateFile(scheme+'/common/_responsive'+extension);
  var tmp_responsive_file = grunt.dirs.tmp+'/less/_responsive.less';
  var tmp_main_file = grunt.dirs.tmp+'/less/_main.less';

  var responsive_code = grunt.file.read(responsive_file);
  responsive_code = grunt.template.process(responsive_code, { data: {
    import_stylesheet_set: function (set) {
      var set_files = grunt.wb.locateSetFiles(scheme, set, wildcard, set+extension);
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

  // fonts
  var font_stylesheets = _(grunt.wb.locateSets("fonts")).map(function (fontname) {
    return grunt.wb.locateSetFiles("fonts", fontname, "stylesheet.css");
  }).flatten().value();
  var tmp_font_file = grunt.dirs.tmp+'/less/_fonts.less';
  writeImportFile(font_stylesheets, tmp_font_file);

  var font_files = _(grunt.wb.locateSets("fonts")).map(function (fontname) {
    return grunt.wb.locateFiles("fonts/"+fontname, "*.{eot,woff,ttf}");
  }).flatten().value();
  if (grunt.debug) console.log("Font files: "+JSON.stringify(font_files, null, 4));

  // var tmp_font_files = [ tmp_font_file ];


  // var tmp_font_file = grunt.dirs.tmp+'/less/_fonts.less';
  // var fonts_code = _(font_files).map(function (fontfile) {
  //   fontfile = path.relative(grunt.dirs.coreSource+'/less/main', fontfile);
  //   return "@import \""+fontfile+"\";";
  // }).value().join("\n");
  // console.log("Fonts: "+fonts_code);
  // grunt.file.write(tmp_font_file, fonts_code);


  main_files =  _.union(base_files, [ tmp_font_file ], all_files, main_core_files, main_files, [ tmp_responsive_file ]);
  admin_files = _.union(all_files, admin_files);
  if (grunt.debug) console.log("Main stylesheets: "+JSON.stringify(main_files, null, 4));
  if (grunt.debug) console.log("Admin stylesheets: "+JSON.stringify(admin_files, null, 4));
  writeImportFile(main_files, tmp_main_file);

  var stylesheetSets = _(grunt.wb.locateSets(scheme)).without('main', 'admin', 'all', 'common', 'xs-only', 'sm-only', 'sm', 'md-only', 'md', 'lg').value();
  if (grunt.debug) console.log("Stylesheet sets: "+JSON.stringify(stylesheetSets, null, 4));


  //  options including includable paths
  var include_paths = [scheme+"/all", scheme+"/common", "fonts"];
  var less_main_options = {
    paths: include_paths,
    banner: themebanner,
    sourceMap: true,
    sourceMapFilename: grunt.dest+'/style.css.map'
  };
  var bootstrap_less = path.relative(grunt.dirs.coreSource+'/less/admin', grunt.dirs.base+'/'+scheme);
  if (grunt.debug)
    console.log("Bootstrap LESS relative path: "+bootstrap_less);
  var less_options = {
    paths: include_paths,
    modifyVars: {
      bootstrap_less: '"'+bootstrap_less+'"'
    }
    // process: function (less_code) {
    //   return grunt.template.process(less_code, { data: {
    //     bootstrap_less: function () {
    //       return grunt.dirs.base+'/'+scheme;
    //     }
    //   }});
    // }
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

      copy: {
        fonts: {
          files: [
            {
              expand: true,
              flatten: true,
              src: font_files,
              dest: grunt.dest+'/fonts'
            }
          ]
        }
      },  

      watch: {
        stylesheets: {
          files: _.union(all_files, main_files),
          tasks: ['less']
        }
      }
    });

    _(stylesheetSets).each(function (set) {
      var setFiles = grunt.wb.locateSetFiles(scheme, set, wildcard, set+extension);

      if (!_(setFiles).isEmpty()) {
        var setConfig = { less: { } };
        setConfig.less[set] = {
          options: less_options,
          src: setFiles,
          dest: grunt.dest+'/'+set+'.css'
        };

        grunt.config.merge(setConfig);
      }
    });

  } else if (scheme == 'sass') {
    // .. todo SASS
  } else {
    // .. todo ???
  }
};