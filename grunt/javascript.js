module.exports = function (grunt, _) {
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-uglify');


  var base_js = [grunt.dirs.base+"/dist/js/bootstrap.min.js"];
  var all_js = grunt.wb.locateSetFiles("js", "all", "*.js", "all.js");
  var main_js = grunt.wb.locateSetFiles("js", "main", "*.js", "main.js");
  var admin_js = grunt.wb.locateSetFiles("js", "admin", "*.js", "admin.js");

  main_js = _.union(base_js, all_js, main_js);
  admin_js = _.union(base_js, all_js, admin_js);

  var jsSets = _(grunt.wb.locateSets('js')).without('main').value();
  if (grunt.debug) console.log("Javascript sets: "+JSON.stringify(jsSets, null, 4));

  grunt.config.merge({
    jshint: {
      all: grunt.wb.locateFiles('js')
    },

    concat: {
      options: {
        separator: ';\n\n',
        sourceMap: true
      },
      main: {
        src: main_js,
        dest: grunt.dest+'/js/main.js'
      }
    },

    uglify: {
      options: {
        sourceMap: true
      },
      main: {
        src: main_js,
        dest: grunt.dest+'/js/main.min.js'
      }
    },

    watch: {
      javascripts: {
        files: grunt.wb.locateFiles('js'),
        tasks: ['jshint', 'concat', 'uglify']
      }
    }
  });  

  // build many sets

    _(jsSets).each(function (set) {
    var setFiles = grunt.wb.locateSetFiles('js', set, '*.js');

    if (!_(setFiles).isEmpty()) {
      var setConfig = { concat: { }, uglify: { } };
      setConfig.concat[set+'_js'] = {
        options: {
          sourceMap: true
        },
        src: setFiles,
        dest: grunt.dest+'/js/'+set+'.js'
      };
      setConfig.uglify[set+'_js'] = {
        options: {
          sourceMap: true
        },
        src: setFiles,
        dest: grunt.dest+'/js/'+set+'.min.js'
      };

      grunt.config.merge(setConfig);
    }
  });
};