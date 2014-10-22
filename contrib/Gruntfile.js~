var fs        = require('fs');
var grunt     = require('grunt');


module.exports = function(grunt){

	grunt.loadNpmTasks('grunt-contrib-concat');

grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        json2: {
            src: ['/home/lvunie/work/scraper_project/WPIC_Scraper/category_output/*.json'],
            dest: 'combined2_.json',
            options: {
                // Added to the top of the file
                banner: '"two": [',
                // Will be added at the end of the file
                footer: "]",
                separator: ','
            }
        },
        json3: {
            src: ['/home/lvunie/work/scraper_project/WPIC_Scraper/output/en/*.json'],
            dest: 'combined3_.json',
            options: {
                // Added to the top of the file
                banner: '"three": [',
                // Will be added at the end of the file
                footer: "]",
                separator: ','
            }
        },
        jsonall: {
            src: ['combined2_.json','combined3_.json'],
            dest: 'all.json',
            options: {
                // Added to the top of the file
                banner: '{"pages": {',
                // Will be added at the end of the file
                footer: "}}",
                separator: ','
            }
        }
    }
});
	
};




