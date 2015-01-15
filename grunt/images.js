//  Minify images
module.exports = function (grunt, _) {
  // grunt.loadNpmTasks('grunt-contrib-imagemin');
  // grunt.loadNpmTasks('grunt-image-resize');


  //  get merged config
  var cfg = {};
  _(grunt.sources).each(function (src) {
    var images_json_file = src+'/etc/images.json';
    if (grunt.file.exists(images_json_file)) {
      var cfg_json = grunt.file.readJSON(images_json_file);
      _.defaults(cfg, cfg_json);
    }
  });
  console.log("Image config: "+JSON.stringify(cfg, null, 4));

  var tmpImages = grunt.dirs.tmp+'/images';

  var sources = grunt.locateFiles("images", "*.{png,jpg,gif}");
  if (grunt.debug) console.log("Images: "+JSON.stringify(sources, null, 4));

  var screenshot = grunt.locateFile("images/screenshot.png");
  if (grunt.debug) console.log("Screenshot: "+screenshot);

  var imageDest = grunt.dest+'/images';

  var image_resize_conf = {

  };

  grunt.config.merge({
    image_resize: image_resize_conf,

    imagemin: {
      actual: {
        chdir: grunt.dirs.themeSource,
        // expand: true,
        src: sources,
        dest: imageDest
      }
    }
  });

  if (screenshot) {
    grunt.config.merge({
      imagemin: {
        screenshot: {
          chdir: grunt.dirs.themeSource,
          src: screenshot,
          dest: imageDest
        }
      }
    })
  }
};