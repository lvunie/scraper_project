var fs        = require('fs');
var grunt     = require('grunt');


module.exports = function(grunt){

	grunt.initConfig({
    		"merge-json": {
      	 	 "en": {
         	   src: [ "*-en.json" ],
         	   dest: "/home/lvunie/work/scraper_project/WPIC_Scraper_v5/merge"
        	},
        	"de": {
          	  src: [ "all.json" ],
          	  dest: "/home/lvunie/work/scraper_project/WPIC_Scraper_v5/merge"
       	 	}
   	     }
	});

	grunt.loadNpmTasks('grunt-merge-json');
};




