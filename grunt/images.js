//  Minify images
module.exports = function (grunt, _) {
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  // grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-image-resize');

/*
  var sources = _(grunt.sources).map(function (src) {
    return src+"/images";
  }).filter(function (src) {
    return grunt.file.exists(src);
  }).map(function (src) {
    return src+"/ ** / *.{png,jpg,gif}";
  }).value();
*/
  // if (grunt.debug) console.log("image min sources: "+JSON.stringify(sources, null, 4));

  var tmpImages = grunt.dirs.tmp+'/images';

  var sources = grunt.locateFiles("images", "*.{png,jpg,gif}");
  if (grunt.debug) console.log("Images: "+JSON.stringify(sources, null, 4));
  var x2_sources = grunt.locateSetFiles("images", "2x", "*.{png,jpg,gif}");
  var x4_sources = grunt.locateSetFiles("images", "4x", "*.{png,jpg,gif}");

  var screenshot = grunt.locateFile("images/screenshot.png");
  if (grunt.debug) console.log("Screenshot: "+screenshot);

  grunt.config.merge({
    image_resize: {
      x4_x2: {
        
      }
    },

    // responsive_images: {
    //   x4: {
    //     options: {
    //       sizes: [
    //         { name: "1x", width: "25%" },
    //         { name: "2x", width: "50%", suffix: "@2x" },
    //         { name: "4x", width: "100%", suffix: "@4x" }
    //       ]
    //     },
    //     src: x4_sources,
    //     dest: tmpImages
    //   },
    //   x2: {
    //     options: {
    //       sizes: [
    //         { name: "1x", width: "50%" },
    //         { name: "2x", width: "100%", suffix: "@2x" }
    //       ]
    //     },
    //     src: x2_sources,
    //     dest: tmpImages
    //   }
    // },

    imagemin: {
      actual: {
        chdir: grunt.dirs.themeSource,
        // expand: true,
        src: sources,
        dest: grunt.dest
      }
    }
  });

  if (screenshot) {
    grunt.config.merge({
      imagemin: {
        screenshot: {
          chdir: grunt.dirs.themeSource,
          src: screenshot,
          dest: grunt.dest
        }
      }
    })
  }
};