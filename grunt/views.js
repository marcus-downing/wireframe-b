//  Compile the WordPress templates
module.exports = function (grunt, _) {
  var template_files = grunt.locateSetFiles("views", "templates", "*.php");
  var header_files = grunt.locateSetFiles("views", "headers", "header*.php");
  var footer_files = grunt.locateSetFiles("views", "footers", "footer*.php");
  var sidebar_files = grunt.locateSetFiles("views", "sidebars", "sidebar*.php");
  header_files = _.filter(header_files, grunt.isValidFile);
  footer_files = _.filter(footer_files, grunt.isValidFile);
  sidebar_files = _.filter(sidebar_files, grunt.isValidFile);

  var fixed_header = grunt.file.read(grunt.locateFile("views/headers/_header.php"));
  var fixed_footer = grunt.file.read(grunt.locateFile("views/footers/_footer.php"));

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.config.merge({
    copy: {
      options: {
        process: function(content, path) {
          return grunt.template.process(content, { data: {
            fixed_header: fixed_header,
            fixed_footer: fixed_footer,

            template: function (templateArgs) {
              if (!_.isObject(templateArgs)) mainArgs = {};
              _.defaults(templateArgs, {
                layout: 'simple',
                main: 'simple',
              });

              if (grunt.debug) console.log('Looking for layout file: '+templateArgs.layout);
              var layout_content = grunt.file.read(grunt.locateFile('views/layouts/layout-'+templateArgs.layout+'.php'));

              var template_process = function (content) {
                return grunt.template.process(content, { data: {
                  main: function (mainArgs) {
                    if (!_.isObject(mainArgs)) mainArgs = {};
                    _.defaults(mainArgs, templateArgs);

                    if (grunt.debug) console.log('Looking for main file: '+mainArgs.main);
                    var main_content = grunt.file.read(grunt.locateFile('views/main/main-'+mainArgs.main+'.php'));
                    return template_process(main_content);
                  },

                  part: function (part, partArgs) {
                    if (!_.isObject(partArgs)) partArgs = {};
                    _.defaults(partArgs, templateArgs);
                    if (grunt.debug) console.log('Looking for part: '+part);
                    var part_content = grunt.file.read(grunt.locateFile('views/'+part+'.php'));
                    return template_process(part_content);
                  }
                }});
              };

              return template_process(layout_content);
            }
          }});
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
      },

      header_php: {
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