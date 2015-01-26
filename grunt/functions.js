//  Compile the theme's functions.php
module.exports = function (grunt, _) {
  // grunt.loadNpmTasks('grunt-contrib-concat');
  var path = require('path');

  var processPHPfile = function(src, filepath) {
    src = src.replace(/^\<\?php/, '');
    src = src.replace(/\/\*[^]*?\*\//g, '');

    //  squish newlines a bit (but not too much)
    src = src.replace(/\n[\n\s]*\n/g, '\n\n');
    src = src.replace(/^[\n\s]*/, '');
    src = src.replace(/[\n\s]*$/, '');

    if (src == "")
      return "";

    var filepath = filepath.substr(grunt.dirs.themeSource.length+1);
    src = '//  '+filepath+'\n'+src;
    return src;
  };

  // register widgets
  var temp_widgets_file = grunt.dirs.tmp+'/lib/_widgets.php';
  var widgets_files = grunt.wb.locateSetFiles("views", "widgets", "*.php");
  if (grunt.debug) console.log("Widgets: "+JSON.stringify(widgets_files, null, 4));
  var widget_namespaces = {};
  var namespace_regex = /namespace (.*);/;
  var widgets_content = _(widgets_files).map(function (file) {
    var widget_content = grunt.file.read(file);
    _(widget_content.split('\n')).each(function (line) {
      var match = namespace_regex.exec(line);
      if (match) {
        var namespace = match[1];
        console.log("Matched namespace "+namespace+" on line: "+line);
        widget_namespaces[file] = namespace;
      }
    });
    return processPHPfile(widget_content, file);
  }).value().join("\n");
  var widgets_register = _(widgets_files).map(function (file) {
    var widget_content = grunt.file.read(file);
    var namespace = _.has(widget_namespaces, file) ? widget_namespaces[file] : 'wireframe_b';
    var classname = path.basename(file).replace(/\..*?$/, '');
    return "register_widget('"+namespace+'\\'+classname+"');\n";
  }).value().join("\n");

  grunt.file.write(temp_widgets_file, widgets_content+'\n\n'+widgets_register);


  // process image sizes
  var temp_images_file = grunt.dirs.tmp+'/lib/_images.php';
  var image_sizes = grunt.themeConfig.image_sizes;
  var default_image_size = _(grunt.themeConfig.image_sizes).where({ 'name': 'default' }).first();

  var images_template = grunt.file.read(grunt.wb.locateFile("lib/common/_image_sizes.php"));
  var images_code = grunt.template.process(images_template, { data: {
    default_width: default_image_size.width,
    default_height: default_image_size.height,
    register_image_sizes: function () {
      return _(image_sizes).map(function (image_size) {
        return "  add_image_size('"+image_size.name+"', "+image_size.width+", "+image_size.height+");\n";
      }).value().join("");
    },
    image_size_names: function () {
      return _(image_sizes).map(function (image_size) {
        return "      '"+image_size.name+"' => '"+image_size.title+"',\n";
      }).value().join("");
    }
  }});
  grunt.file.write(temp_images_file, images_code);

  // collate all the files
  var functions_files = grunt.wb.locateSetFiles("lib", "all", "*.php");
  functions_files.push(temp_widgets_file);
  functions_files.push(temp_images_file);
  functions_files.push(grunt.wb.locateFile("lib/common/_after_functions.php"));
  var main_files = grunt.wb.locateSetFiles("lib", "main", "*.php");
  var view_lib_files = grunt.wb.locateFilesDeep("views/lib", "*.php");
  var admin_files = grunt.wb.locateSetFiles("lib", "admin", "*.php");

  var concat_php_options = {
    banner: '<?php\n',
    process: processPHPfile
  };

  grunt.config.merge({
    concat: {
      functions_php: {
        options: concat_php_options,
        src: functions_files,
        dest: grunt.dest+'/functions.php'
      },

      main_php: {
        options: concat_php_options,
        src: main_files,
        dest: grunt.dest+'/lib/main.php',
      },

      view_php: {
        options: concat_php_options,
        src: view_lib_files,
        dest: grunt.dest+'/lib/view.php',
      },

      admin_php: {
        options: concat_php_options,
        src: admin_files,
        dest: grunt.dest+'/lib/admin.php',
      }
    },
  });
}