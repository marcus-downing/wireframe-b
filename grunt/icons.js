module.exports = function (grunt, _) {
  // grunt.loadNpmTasks('grunt-webfont');

  var icon_files = grunt.locateFiles("icons", "*.svg");
  if (grunt.debug) console.log("Icons: "+JSON.stringify(icon_files, null, 4));

  grunt.config.merge({
    webfont: {
      icons: {
        src: icon_files,
        dest: grunt.dest+'/fonts',
        options: {
          syntax: 'bootstrap',
          autoHint: false,
        }
      }
    },
  });
};