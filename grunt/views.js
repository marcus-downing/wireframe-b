//  Compile the WordPress templates
module.exports = function (grunt, _) {
  var template_files = grunt.locateSetFiles("views", "templates", "*.php");
  var header_files = grunt.locateSetFiles("views", "headers", "header*.php");
  var footer_files = grunt.locateSetFiles("views", "footers", "footer*.php");
  var result_files = grunt.locateSetFiles("views", "results", "result*.php");
  var sidebar_files = grunt.locateSetFiles("views", "sidebars", "sidebar*.php");
  header_files = _.filter(header_files, grunt.isValidFile);
  footer_files = _.filter(footer_files, grunt.isValidFile);
  sidebar_files = _.filter(sidebar_files, grunt.isValidFile);

  var fixed_header = grunt.file.read(grunt.locateFile("views/headers/_header.php"));
  var fixed_footer = grunt.file.read(grunt.locateFile("views/footers/_footer.php"));
  var fixed_result = grunt.file.read(grunt.locateFile("views/results/_result.php"));

  if (grunt.debug) console.log("Found templates: "+JSON.stringify(template_files, null, 4));
  if (grunt.debug) console.log("Found results: "+JSON.stringify(result_files, null, 4));

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.config.merge({
    copy: {
      template_php: {
        options: {
          process: function(content, path) {
            if (grunt.debug) console.log("Processing template: "+path);
            return grunt.template.process(content, { data: {
              template: function (templateArgs) {
                if (!_.isObject(templateArgs)) templateArgs = {};
                _.defaults(templateArgs, {
                  layout: 'simple',
                  content: 'simple',
                  sidebar: 'none'
                });
                var subArgs = {};

                // if (grunt.debug) console.log('Looking for layout file: '+templateArgs.layout);
                // var layout_content = grunt.file.read(grunt.locateFile('views/layouts/layout-'+templateArgs.layout+'.php'));

                var template_process = function (content) {
                  return grunt.template.process(content, { data: {
                    inner_layout: function () {
                      if (grunt.debug) console.log('Looking for layout file: '+templateArgs.layout);
                      var layout_content = grunt.file.read(grunt.locateFile('views/layouts/layout-'+templateArgs.layout+'.php'));
                      return template_process(layout_content);
                    },

                    content: function (contentArgs) {
                      if (!_.isObject(contentArgs)) contentArgs = {};
                      _.defaults(contentArgs, templateArgs);
                      subArgs.content = contentArgs;

                      var outer_content_content = grunt.file.read(grunt.locateFile('views/content/_content.php'));
                      return template_process(outer_content_content);
                    },

                    inner_content: function () {
                      contentArgs = subArgs.content;
                      if (grunt.debug) console.log('Looking for content file: '+contentArgs.content);
                      var content_content = grunt.file.read(grunt.locateFile('views/content/content-'+contentArgs.content+'.php'));
                      return template_process(content_content);
                    },

                    include_content: function (contentName) {
                      if (grunt.debug) console.log('Including content file: '+contentName);
                      var content_content = grunt.file.read(grunt.locateFile('views/content/'+contentName+'.php'));
                      return template_process(content_content);
                    },

                    result: function () {
                      if (grunt.debug) console.log('Including result');
                      var result_content = grunt.file.read(grunt.locateFile('views/content/result.php'));
                      return template_process(result_content);
                    },

                    part: function (part) {
                      // if (!_.isObject(partArgs)) partArgs = {};
                      // _.defaults(partArgs, templateArgs);
                      if (grunt.debug) console.log('Looking for part: '+part);
                      var part_content = grunt.file.read(grunt.locateFile('views/'+part+'.php'));
                      return template_process(part_content);
                    },

                    partial: function (partial) {
                      // if (!_.isObject(partialArgs)) partialArgs = {};
                      // _.defaults(partialArgs, templateArgs);
                      if (grunt.debug) console.log('Looking for partial: '+partial);
                      var partial_content = grunt.file.read(grunt.locateFile('views/partials/'+partial+'.php'));
                      return template_process(partial_content);
                    }
                  }});
                };

                var outer_layout_content = grunt.file.read(grunt.locateFile('views/layouts/_layout.php'));
                return template_process(outer_layout_content);
              }
            }});
          }
        },
        files: [
          {
            expand: true, 
            flatten: true, 
            src: template_files, 
            dest: grunt.dest, 
            filter: 'isFile'
          }
        ]
      },

      header_php: {
        options: {
          process: function (content) {
            return grunt.template.process(fixed_header, { data: {
              inner_header: function () {
                return content;
              },

              include_header: function (name) {
                var include_content = grunt.file.read(grunt.locateFile('views/headers/'+name+'.php'));
                return include_content;
              }
            }});
          }
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: header_files,
            dest: grunt.dest,
            // filter: 'isFile'
          }
        ]
      },

      footer_php: {
        options: {
          process: function (content) {
            return grunt.template.process(fixed_footer, { data: {
              inner_footer: function () {
                return content;
              },

              include_footer: function (name) {
                var include_content = grunt.file.read(grunt.locateFile('views/footers/'+name+'.php'));
                return include_content;
              }
            }});
          }
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: footer_files,
            dest: grunt.dest,
            // filter: 'isFile'
          }
        ]
      },

      result_php: {
        options: {
          process: function (content) {
            return grunt.template.process(fixed_result, { data: {
              inner_result: function () {
                return content;
              },

              include_header: function (name) {
                var include_content = grunt.file.read(grunt.locateFile('views/results/'+name+'.php'));
                return include_content;
              }
            }});
          }
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: result_files,
            dest: grunt.dest+"/results"
          }
        ]
      },

      sidebar_php: {
        files: [
          {
            expand: true,
            flatten: true,
            src: sidebar_files,
            dest: grunt.dest,
            // filter: 'isFile'
          }
        ]
      }

    }
  });
}