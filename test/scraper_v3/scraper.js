var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var scraperjs = require('scraperjs');
    router = new scraperjs.Router();

var p_tag, list_tag, heading_tag;
var web_address;

var json = { p_tag : "", list_tag : "", heading_tag : ""};
	


scraperjs.StaticScraper.create('http://www.web-presence-in-china.com/graphic-design-production')
    		.scrape(function($) {
     		   return $("p").map(function() {
    		        return $(this).text();
     		   }).get();
    		}, function(news) {
		   json.p_tag = news;
     		   //console.log(news);
		   //console.log(json.p_tag);
 })
	.scrape(function($) {
     		   return $("li").map(function() {
    		        return $(this).text();
     		   }).get();
    		}, function(news) {
		   json.list_tag = news;
     		   //console.log(news);
		   //console.log(json.list_tag);
})
		.scrape(function($) {
     		  return $(":header").map(function() {
    		        return $(this).text();
     		   }).get();
    		}, function(news) {
		   json.heading_tag = news;
     		   //console.log(news);
		   //console.log(json.heading);
})

app.get('/scrape', function(req, res){
	
	url = '// http://www.web-presence-in-china.com/';

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
		}
 

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

        	console.log('File successfully written! - Check your project directory for the output.json file');

        })


        res.send('Check your console!')
	})
})

app.listen('8081')
console.log('Please go to "http://localhost:8081/scrape"');
exports = module.exports = app;





