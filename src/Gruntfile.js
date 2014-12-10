module.exports = function (grunt) {
  var path = require("path");
  grunt.sources = [
    path.resolve(".")
  ];
  grunt.dest = path.resolve("..");
  require("./grunt/config.js")(grunt);
};