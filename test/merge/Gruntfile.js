var fs        = require('fs');
var grunt     = require('grunt');


module.exports = function(grunt){

	grunt.loadNpmTasks('grunt-merge-json');
	grunt.initConfig({
    		"merge-json": {
      	 	 "en": {
         	   src: [ "/home/lvunie/work/scraper_project/WPIC_Scraper_v5/merge/*-en.json" ],
         	   dest: "/home/lvunie/work/scraper_project/WPIC_Scraper_v5/merge/all.json"
        	}
   	     }
	});
	
};




