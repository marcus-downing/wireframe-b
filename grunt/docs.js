module.exports = function (grunt, _) {
  grunt.loadNpmTasks('grunt-markdown');

  var md_files = grunt.locateFiles("docs", "*.md");
  if (grunt.debug) console.log("Docs: "+JSON.stringify(md_files, null, 4));

  var template_file = grunt.locateFile("etc/docs-template.html");
  if (grunt.debug) console.log("Docs template: "+template_file);

  grunt.config.merge({
    markdown: {
      docs: {
        expand: false,
        src: md_files,
        dest: grunt.dest+'docs',
        ext: '.html',
        options: {
          template: template_file
        }
      }
    }
  });
};