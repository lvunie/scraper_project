var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var scraperjs = require('scraperjs');


app.get('/scrape', function(req, res){

	var json_wpic = { p_tag : "", list_tag : "", heading_tag : ""};	

	scraperjs.StaticScraper.create('http://www.web-presence-in-china.com/graphic-design-production')
    		.scrape(function($) {
     		   return $("p").map(function() {
    		        return $(this).text();
     		   }).get();
    		}, function(news) {
		   json_wpic.p_tag = news;
     		   //console.log(news);
    	})

    		.scrape(function($) {
     		   return $("li").map(function() {
    		        return $(this).text();
     		   }).get();
    		}, function(news) {
		   json_wpic.list_tag = news;
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

        	console.log('v_1.7 File successfully written! - Check project directory for the output_wpic.json file');

        })

        // Finally, just send out a message to the browser reminding you that this app does not have a UI.
        res.send('Check your console!')
	})
})

app.listen('8081')
console.log('Please go to http://localhost:8081/scrape');
exports = module.exports = app;

