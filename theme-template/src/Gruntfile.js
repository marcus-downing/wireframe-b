module.exports = function (grunt) {
  var base = "./node_modules/wireframe-b";
  var path = require("path");
  grunt.sources = [
    path.resolve("."),
    path.resolve(base)
  ];
  grunt.dest = path.resolve("..");
  require(base+"/grunt/config.js")(grunt);
};