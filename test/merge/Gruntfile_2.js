var fs        = require('fs');
var grunt     = require('grunt');


module.exports = function(grunt){

     grunt.initConfig({
          "merge-locale": {
      	 	options:{
			  includeFilename: true
        	},
        	dist: {
          	  srcDir: '/home/lvunie/work/scraper_project/WPIC_Scraper_v5/merge',
          	  dest: '/home/lvunie/work/scraper_project/WPIC_Scraper_v5/merge'
       	 	}
   	     }
	});

	grunt.loadNpmTasks('grunt-merge-locale');
};




