//  Minify images
module.exports = function (grunt, _) {
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  var sources = _(grunt.sources).map(function (src) {
    return src+"/images";
  }).filter(function (src) {
    return grunt.file.exists(src);
  }).map(function (src) {
    return src+"/**/*.{png,jpg,gif}";
  }).value();
  // console.log("image min sources: "+JSON.stringify(sources, null, 4));

  grunt.config.merge({
    imagemin: {
      dynamic: {
        files: [{
          // expand: true,
          src: sources,
          dest: grunt.dest
        }]
      }
    }
  });
};