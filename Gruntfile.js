module.exports = function (grunt) {

    "use strict";

    // this saves us having to load each plugin individually
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        less: {
            development: {
                options: {
                    strictMath: true,
                    strictUnits: true,
                    cleancss: false,
                    sourceMap: true,
                    sourceMapFilename: "style.map"
                },
                files: {
                    "style.css": "styles/style.less"
                }
            }
        },

        autoprefixer: {
            single_file: {
                options: {
                    browsers: ["last 2 version"]
                },
                src: "style.css",
                dest: "style.css"
            },
        },

        csslint: {
            options: {
                csslintrc: ".csslintrc"
            },
            strict: {
                src: ["style.css"]
            }
        },

        cssmin: {
            minify: {
                src: "style.css",
                dest: "style.css"
            }
        },

        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            all: [
                ".jshintrc",
                "Gruntfile.js",
                "js/app.js",
                "js/config.js",
                "js/helpers.js",
                "js/router.js",
                "js/collections/**/*.js",
                "js/models/**/*.js",
                "js/views/**/*.js"
            ]
        },

        modernizr: {
            dist: {
                // Path to the build you're using for development.
                "devFile" : "js/bower/modernizr/modernizr.js",

                // Path to save out the built file.
                "outputFile" : "js/modernizr-custom.js",

                // Based on default settings on http://modernizr.com/download/
                "extra" : {
                    "shiv" : true,
                    "printshiv" : false,
                    "load" : false,
                    "mq" : true,
                    "cssclasses" : false
                },

                // By default, source is uglified before saving
                "uglify" : false,

                "tests" : [],

                // By default, this task will crawl your project for references to Modernizr tests.
                "parseFiles" : true,

                // File to parse
                "files" : {
                    "src": [
                        "js/app.js",
                        "js/config.js",
                        "js/emoji-config.js",
                        "js/emoji-picker.js",
                        "js/chart-helpers.js",
                        "js/helpers.js",
                        "js/router.js",
                        "js/collections/**/*.js",
                        "js/models/**/*.js",
                        "js/views/**/*.js"
                    ]
                },

                "matchCommunityTests" : true,
            }
        },

        concat: {
            production: {
                src: [
                    "js/bower/jquery/dist/jquery.js",
                    "js/bower/underscore/underscore.js",
                    "js/bower/backbone/backbone.js",
                    "js/modernizr-custom.js",

                    "js/app.js",
                    "js/config.js",

                    "js/collections/**/*.js",
                    "js/models/**/*.js",
                    "js/views/**/*.js",
                    "js/router.js",
                    "js/helpers.js"
                ],
                dest: "js/production.js"
            }
        },

        uglify: {
            production: {
                files: {
                    "js/production.js": ["js/production.js"]
                }
            }
        },

        hashres: {
            // Global options
            options: {
                fileNameFormat: "${name}.${ext}?${hash}",
                renameFiles: false
            },
            prod: {
                // Specific options, override the global ones
                options: {
                  // You can override encoding, fileNameFormat or renameFiles
                },
                // Files to hash
                src: [
                    "js/production.js",
                    "style.css"
                ],
                // File that refers to above files and needs to be updated with the hashed name
                dest: "index.php",
            }
        },

        imagemin: {
            images: {
                files: [{
                    expand: true,
                    cwd: "img/",
                    src: [
                        "*.{png,jpg,gif}",
                        "favicons/*.{png,jpg,gif}",
                    ],
                    dest: "img/"
                }]
            },
            cdn: {
                files: [{
                    expand: true,
                    cwd: "cdn/",
                    src: [
                        "*.{png,jpg,gif}",
                        "*/**.{png,jpg,gif}"
                    ],
                    dest: "cdn/"
                }]
            }
        },

        watch: {
            options: {
                livereload: true
            },
            images: {
                files: ["img/**/*.{png,jpg,jpeg,gif}"],
                tasks: "buildimg"
            },
            css: {
                files: "styles/**/*.less",
                tasks: "buildcss"
            },
            icons: {
                files: "fonts/icons-src/svg/*.svg",
                tasks: "buildicons"
            },
            scripts: {
                files: [
                    "Gruntfile.js",
                    "js/config.js",
                    "js/app.js",
                    "js/helpers.js",
                    "js/router.js",
                    "js/models/**/*.js",
                    "js/collections/**/*.js",
                    "js/views/**/*.js"
                ],
                tasks: "buildjs"
            }
        },

        notify: {
            notify_hooks: {
                options: {
                    enabled: true,
                    max_jshint_notifications: 5,
                }
            },
            js: {
                options: {
                    title: "Back of the net!",
                    message: "Javascript build successful!"
                }
            },
            less: {
                options: {
                    title: "Cashback!",
                    message: "LESS build successful!"
                }
            },
            img: {
                options: {
                    title: "Jurassic Park!",
                    message: "Image minify successful!"
                }
            },
            build: {
                options: {
                    title: "Buck Rogers Toilet!",
                    message: "Full build completed!"
                }
            }
        }

    });

    // List of available tasks
    grunt.registerTask("default", []);
    grunt.registerTask("buildcss", ["less", "autoprefixer", "csslint", "cssmin", "notify:less"]);
    grunt.registerTask("buildjs", ["jshint", "modernizr", "concat", "uglify", "notify:js"]);
    grunt.registerTask("buildimg", ["imagemin", "notify:img"]);
    grunt.registerTask("build", ["buildcss", "buildjs", "buildimg", "hashres:prod", "notify:build"]);
};
