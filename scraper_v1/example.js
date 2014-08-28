var scraperjs = require('scraperjs');
var fs = require('fs');


var json_wpic = { p_tag : "", title_tag : "", heading_tag : ""};

scraperjs.StaticScraper.create('http://www.web-presence-in-china.com/about-us')
 		.scrape(function($) {
    	    	    return $("p").map(function() {
             	         return $(this).text();
                }).get();
             }, function(news) {
         	  json_wpic.p_tag = news;
     		  //console.log(news);
    })

scraperjs.StaticScraper.create('http://www.web-presence-in-china.com/about-us')
    		.scrape(function($) {
     		   return $("li").map(function() {
    		        return $(this).text();
     		   }).get();
    		}, function(news) {
		   json_wpic.title_tag = news;
     		   //console.log(news);
    	})

	fs.writeFile('output_example.json', JSON.stringify(json_wpic, null, 4), function(err){

        	console.log('v_1.4 File successfully written! - Check project directory for the output_wpic.json file');

        })


