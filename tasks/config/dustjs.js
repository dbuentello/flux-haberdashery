module.exports = function(grunt) {

  grunt.config.set('dustjs', {

    compile: {
      files: {
        "assets/templates/compiled_templates.js": [ require('../pipeline').dustToCompile ]
      }
    }

  });

  grunt.loadNpmTasks("grunt-dustjs");
};
