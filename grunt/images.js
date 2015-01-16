/*
Resize and compress images

There are two sorts of images: 
 - flexible ones that are resized to on the configured image types in `etc/images.json`.
 - exact images that should be resized to precisely 25%, 50% and 100%.
 
A photo, background etc is well suited to the first type. A logo or furniture element is well suited to the second.

Put images into folders called 'images/@1x', 'images/@2x' and 'images/@4x' to 

*/

module.exports = function (grunt, _) {
  var path = require('path');
  // grunt.loadNpmTasks('grunt-contrib-imagemin');
  // grunt.loadNpmTasks('grunt-image-resize');

  var tmpDir = grunt.dirs.tmp+'/images';
  var destDir = grunt.dest+'/images';

  var sources = _(grunt.wb.locateFilesDeep("images", "*.{png,jpg,gif,svg}")).filter(function (sourcefile) {
    return !sourcefile.includes(tmpDir);
  }).value();

  var sourceFolders = grunt.wb.locateFolders("images");
  if (grunt.debug) console.log("Images: "+JSON.stringify(sources, null, 4));


  // Flexible images: scale to the configured image sizes and @2x, @4x versions of them
  var flex_image_sizes = _(grunt.themeConfig.image_sizes).map(function (image_size) {
    var image_size_2x = {};
    _.defaults(image_size_2x, image_size);
    image_size_2x.name = image_size.name+'@2x';
    image_size_2x.width = image_size.width * 2;
    image_size_2x.height = image_size.height * 2;

    var image_size_4x = {};
    _.defaults(image_size_4x, image_size);
    image_size_4x.name = image_size.name+'@4x';
    image_size_4x.width = image_size.width * 4;
    image_size_4x.height = image_size.height * 4;

    return [ image_size, image_size_2x, image_size_4x ];
  }).flatten().value();

  var flex_image_files = _(sources).filter(function (sourcefile) {
    return !sourcefile.includes("/images/@1x/") && !sourcefile.includes("/images/@2x/") && !sourcefile.includes("/images/@4x/");
  }).map(function (sourcefile) {
    var local = grunt.wb.localFilename(sourcefile, sourceFolders);
    return { src: sourcefile, dest: tmpDir+'/'+local };
  }).value();

  // if (grunt.debug) {
  //   console.log("Image sizes: "+JSON.stringify(flex_image_sizes, null, 4));
  //   console.log("Image sources: "+JSON.stringify(flex_image_files, null, 4));
  // }


  // Exact images: size matters, so scale these at 
  var exact_image_files_1x = _(sources).filter(function (sourcefile) {
    return sourcefile.includes("/images/@1x/");
  }).map(function (sourcefile) {
    var local = grunt.wb.localFilename(sourcefile, sourceFolders).removeStart("@1x/");
    return { src: sourcefile, dest: tmpDir+'/'+local };
  }).value();
  var exact_image_files_2x = _(sources).filter(function (sourcefile) {
    return sourcefile.includes("/images/@2x/");
  }).map(function (sourcefile) {
    var local = grunt.wb.localFilename(sourcefile, sourceFolders).removeStart("@2x/");
    return { src: sourcefile, dest: tmpDir+'/'+local };
  }).value();
  var exact_image_files_4x = _(sources).filter(function (sourcefile) {
    return sourcefile.includes("/images/@4x/");
  }).map(function (sourcefile) {
    var local = grunt.wb.localFilename(sourcefile, sourceFolders).removeStart("@4x/");
    return { src: sourcefile, dest: tmpDir+'/'+local };
  }).value();



  grunt.config.merge({
    responsive_images: {
      exact_images_1x: {
        options: {
          sizes: [
            { "name": "1x1x", "width": "100%", "height": "100%", "rename": false }
          ],
          newFilesOnly: true
        },
        files: exact_image_files_1x
      },

      exact_images_2x: {
        options: {
          sizes: [
            { "name": "2x1x", "width": "50%", "height": "50%", "rename": false },
            { "name": "2x2x","width": "100%", "height": "100%", "suffix": "@2x", "rename": false }
          ],
          newFilesOnly: true
        },
        files: exact_image_files_2x
      },

      exact_images_4x: {
        options: {
          sizes: [
            { "name": "4x1x", "width": "25%", "height": "25%", "rename": false },
            { "name": "4x2x", "width": "50%", "height": "50%", "suffix": "@2x", "rename": false },
            { "name": "4x4x", "width": "100%", "height": "100%", "suffix": "@4x", "rename": false }
          ],
          newFilesOnly: true
        },
        files: exact_image_files_4x
      },

      flex_images: {
        options: {
          sizes: flex_image_sizes,
          newFilesOnly: true
        },
        files: flex_image_files
      }
    },

    imagemin: {
      options: {
        cache: false
      },

      // exact_images: {
      //   cwd
      // },

      flex_images: {
        cwd: tmpDir+'/',
        expand: true,
        src: '{,*/}*.{png,jpg,gif,svg}',
        dest: destDir
      }
    }
  });


  // var screenshot = grunt.wb.locateFile("images/screenshot.png");
  // if (grunt.debug) console.log("Screenshot: "+screenshot);

  // if (!_.isNull(screenshot)) {
  //   grunt.config.merge({
  //     imagemin: {
  //       screenshot: {
  //         chdir: grunt.dirs.themeSource,
  //         src: screenshot,
  //         dest: grunt.dest
  //       }
  //     }
  //   })
  // }
};