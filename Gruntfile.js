module.exports = function(grunt) {
    var SRC = 'src/';
    var SRCp = SRC + 'paper/';
    var DEST = 'browser/scripts/';

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
            all: ['Gruntfile.js', SRC+'/**/*.js']
        },
        concat: {
            paper: {
                src: [SRCp+'objects.js', SRCp+'animation.js', SRCp+'settings.js'],
                dest: DEST+'graphics.js'
            }
        },
        copy: {
            all: {
                expand: true,
                cwd: SRC,
                src: ['*'],
                dest: DEST
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', ['jshint', 'concat', 'copy']);
    grunt.registerTask('default', ['watch']);

};
