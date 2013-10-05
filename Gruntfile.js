module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            livereload: {
                files: [
                    'browser/*.html',
                    'browser/css/*.css',
                    'browser/scripts/{,*/}*.js'
                ]
            },
        },
        jshint: {
            all: ['Gruntfile.js', 'browser/scripts/**/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('build', ['jshint']);
    grunt.registerTask('default', ['watch']);

};
