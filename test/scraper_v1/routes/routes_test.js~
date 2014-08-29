var path = {};
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var p_tag, list_tag, heading_tag;
var web_address;

var json = { p_tag : "", list_tag : "", heading_tag : ""};
var scraperjs = require('scraperjs'),
    router = new scraperjs.Router();

router
    .otherwise(function(url) {
    console.log("Url '"+url+"' couldn't be routed.");
});

scraperjs.StaticScraper.create('http://www.web-presence-in-china.com/graphic-design-production')
    		.scrape(function($) {
     		   return $("p").map(function() {
    		        return $(this).text();
     		   }).get();
    		}, function(news) {
		   json.p_tag = news;
     		   console.log(news);
})

router.on('http://www.web-presence-in-china.com/')
    .createStatic()
    .scrape(function($) {
        return $("a").map(function() {
            return $(this).attr("href");
        }).get();
    }, function(links, utils) {
        path[utils.params.id] = links;
	//console.log(links);
	json.list = links;
	console.log("here is version1.1");
    })

router.route("http://www.web-presence-in-china.com/", function() {
    console.log("i'm done");
});

fs.writeFile('output_wpic.json', JSON.stringify(json, null, 4), function(err){

        	console.log('File successfully written! - Check your project directory for the output.json file');

})

//https://www.youtube.com/watch/YE7VzlLtp-4
