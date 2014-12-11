//  Compile the WordPress templates
module.exports = function (grunt, _) {
  var template_files = grunt.locateSetFiles("parts", "templates", "*.php");
  console.log("Found templates: "+template_files);

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.config.merge({
    copy: {
      options: {
        process: function(content, path) {
          return grunt.template.process(content);
        }
      },
      template_php: {
        files: [
          {
            expand: true, 
            flatten: true, 
            src: template_files, 
            dest: grunt.dest, 
            filter: 'isFile'
          }
        ]
      }
    }
  });
}