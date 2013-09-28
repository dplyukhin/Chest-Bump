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
        }


    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);

}
