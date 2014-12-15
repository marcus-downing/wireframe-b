module.exports = function (grunt, _) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  var bootstrap_js = [grunt.dirs.bootstrap+"/dist/js/bootstrap.min.js"];
  var all_js = grunt.locateSetFiles("js", "all", "*.js", "all.js");
  var main_js = grunt.locateSetFiles("js", "main", "*.js", "main.js");

  main_js = _.union(bootstrap_js, all_js, main_js);

  grunt.config.merge({
    jshint: {
      all: ['js/**/*.js']
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
        files: _.union(all_files, main_files, admin_files),
        tasks: ['jshint', 'uglify']
      }
    }
  });
};