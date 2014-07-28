module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
 
    watch: {
        files: ['src/*.js', 'test/*.js', 'test/*.html'],
        tasks: ['qunit']
    },
    qunit: {
        all: ['test/*.html']
    },
    jshint: {
        options: {
            curly: true,
            eqeqeq: true,
            eqnull: true,
            browser: true
        },
        all: ['*.js']
    },
    connect: {
        server: {
            options: {
                port: '9000',
                base: '.',
                keepalive: true
            }
        }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('test', ['jshint:all', 'qunit']);
  grunt.registerTask('default', ['jshint:all', 'qunit']);
};
