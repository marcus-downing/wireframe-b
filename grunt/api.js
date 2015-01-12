//  Compile the WordPress templates
module.exports = function (grunt, _) {
  var api_files = grunt.locateSetFiles("views", "api", "*.php");
  // var embed_files = grunt.locateSetFiles("views", "embed", "*.php");

  if (grunt.debug) {
    console.log("API templates: "+JSON.stringify(api_files, null, 4));
  }

  if (!_(api_files).isEmpty()) {
    grunt.config.merge({
      copy: {
        api_php: {
          options: {

          },
          files: [
            {
              expand: true,
              flatten: true,
              src: api_files,
              dest: grunt.dest+'/api',
              filter: 'isFile'
            }
          ]
        }
      }
    });
  }
}