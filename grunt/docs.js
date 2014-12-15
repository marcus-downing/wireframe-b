module.exports = function (grunt, _) {
  grunt.loadNpmTasks('grunt-markdown');

  var source_dirs = grunt.locateFiles("docs");
  sources = _(source_dirs).map(function (src) {
    return src+'/*.md';
  }).value();
  if (grunt.debug) console.log("Docs folders: "+JSON.stringify(sources, null, 4));

  var template_file = grunt.locateFile("etc/template.html");
  if (grunt.debug) console.log("Docs template: "+template_file);

  grunt.config.merge({
    markdown: {
      docs: {
        expand: false,
        src: sources,
        dest: grunt.dest+'docs',
        ext: '.html',
        options: {
          template: template_file
        }
      }
    }
  });
};