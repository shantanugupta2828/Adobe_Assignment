module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        clean: ['dist', 'staging'],

        connect: {
            server: {
                options: {
                    port: 3000,
                    keepalive: true,
                    base: "dist",
                    open: true
                }
            }
        },

        copy: {
            dist: {
                files: [
                    /* views */
                    {
                        expand: true,
                        cwd: "staging/",
                        src: "**/*",
                        dest: "dist/"
                    }
                ]
            },
            staging: {
                files: [

                    /* js_angular */
                    {
                        expand: true,
                        cwd: "bower_components/angular",
                        src: grunt.option("dev") ? "angular.js" : "angular.min.js",
                        dest: "staging/js"
                    },
                    /* services, other JS */
                    {
                        expand: true,
                        cwd: ".",
                        src: ["*.js"],
                        dest: "staging/"
                    },
                    /* views */
                    {
                        expand: true,
                        cwd: ".",
                        src: ["**/*html", "*.html"],
                        dest: "staging/"
                    },
                    /* json */
                    {
                        expand: true,
                        cwd: ".",
                        src: ["*.json"],
                        dest: "staging/"
                    }
                ]
            }
        },

        war: {
            target: {
                options: {
                    war_dist_folder: "dist/",
                    war_name: "home"
                },
                files: [
                    {
                        expand: true,
                        cwd: "dist/",
                        src: ["**"],
                        dest: "."
                    }
                ]
            }
        },

        watch: {
            eca_files: {
                files: [
                        "*.js",
                        "*.html",
                        "*.json"
                ],
                tasks: ["clean", "copy_staging_dev", "copy:dist"]
            },
            options: {
                livereload: true
            }
        }

    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-war");

    grunt.registerTask("copy_staging_dev", function () {
        var done = this.async();

        grunt.util.spawn({
            cmd: 'grunt',
            args: ['copy:staging', '--dev']
        }, function (err, response, stderr) {
            done();
        });
    });

    grunt.registerTask("default", ["clean", "copy:staging", "uglify", "concat", "copy:dist", "cssmin", "htmlmin", /*"imagemin",*/ "war"]);
    grunt.registerTask("serve", ["clean", "copy_staging_dev", "copy:dist", "connect"]);
    
};
