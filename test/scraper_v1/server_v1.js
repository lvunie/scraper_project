var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var scraperjs = require('scraperjs');
     router = new scraperjs.Router();


app.get('/scrape', function(req, res){

	var p_tag, list_tag, heading_tag;
	var json_wpic = { p_tag : "", list_tag : "", heading_tag : "", web_list : ""};	
//////////////////////////////////////////////////////////////
router
    .otherwise(function(url) {
    console.log("Url '"+url+"' couldn't be routed.");
});

var path = {};

router.on('http://www.web-presence-in-china.com/')
    .createStatic()
    .scrape(function($) {
        return $("a").map(function() {
            return $(this).attr("href");
        }).get();
    }, function(links, utils) {
	//console.log(utils);
	console.log(links);
	//console.log(path);
	json_wpic.web_list =  links;
        path[utils.params.id] = links
    })

router.route("http://www.web-presence-in-china.com/", function() {
    console.log("i'm done");
});


//////////////////////////////////////////////////////////////

	scraperjs.StaticScraper.create('http://www.web-presence-in-china.com/graphic-design-production')
    		.scrape(function($) {
     		   return $("p").map(function() {
    		        return $(this).text();
     		   }).get();
    		}, function(news) {
		   //json_wpic.p_tag = news;
     		   //console.log(news);
    	})

    		.scrape(function($) {
     		   return $("li").map(function() {
    		        return $(this).text();
     		   }).get();
    		}, function(news) {
		   //json_wpic.list_tag = news;
     		   //console.log(news);
    	})
		.scrape(function($) {
     		  return $(":header").map(function() {
    		        return $(this).text();
     		   }).get();
    		}, function(news) {
		   json_wpic.heading_tag = news;
     		   //console.log(news);
    	})

	// The structure of our request call
    	// The first parameter is our URL
    	// The callback function takes 3 parameters, an error, response status code and the html

	url = 'http://www.web-presence-in-china.com/graphic-design-production';

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
		}
  
        	fs.writeFile('output_WPIC.json', JSON.stringify(json_wpic, null, 4), function(err){
        		console.log('v_1.5 File successfully written! - Check project directory for the output_wpic.json file');
        	})

        	// Finally, just send out a message to the browser reminding you that this app does not have a UI.
        	res.send('Check your console!')
	})
})

app.listen('8081')
console.log('Please go to http://localhost:8081/scrape');
exports = module.exports = app;
