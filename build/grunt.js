module.exports = function(grunt) {

  var path = require('path');

  grunt.loadNpmTasks('grunt-growl');
  grunt.loadNpmTasks('grunt-contrib');
  
  
  grunt.initConfig({
    growl: {
      start: {
        title: 'Grunt',
        message: 'Build Started'
      },
      done: {
        title: 'Grunt',
        message: 'Build Successful'
      }
    },

    less: {
        compile: {
            options: {
                paths: ["../less"]
            },
            files: {
                //add less files
                "../css/all.css": ["../less/**/*.less"],
                "../css/home.css": ["../less/home/**/*.less"]
            }
        }
    },

    mincss: {
        compress: {
            files: {
                "../css/all.min.css": '../css/all.css',
                "../css/normalize.min.css": '../css/normalize.css',
                "../css/main.min.css": '../css/main.css',
                
                
            }
        }
    },  


    coffee: {
        compile: {
            options: {
                bare: true
            },
            files: {
              "../js/app.js": "../coffee/app.coffee",
              "../js/another.js": ["path/to/sources/*.coffee", "path/to/more/*.coffee"]
            }
        }
    },


    min: {
        'dist': {
            'src': ['../js/main.js', '../js/plugins.js'],
            'dest': '../js/all.min.js'
        }
    },




    copy: {
        all: {
            files: {
                "../../public/css/": "../css/**",
                "../../public/js/": "../js/**/*.js"
            }
        }
    },

    watch: {
        app: {
           files: ['../less/**/*.less', '../coffee/**/*.coffee', '../css/**/*.css', '../js/**/*.js'], 
            tasks:  'growl:start less:compile mincss:compress coffee:compile min copy:all growl:done' 
        }
        
    }

  });

  grunt.registerTask('default', 'growl:start less:compile mincss:compress coffee:compile min copy:all growl:done');

};