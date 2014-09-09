var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var scraperjs = require('scraperjs');
var app     = express();
var S = require('string');

var p_tag, list_tag, heading_tag;
var json = { p_tag : "", list_tag : "", heading_tag : ""};
var address;

//open JOSN file to get URL for scraping
    readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('URL_output.json'),
    output: process.stdout,
    terminal: false
});

rd.on('line', function(line) {
    
    var vertify = S(line).include('http');
	
    if(vertify){
	address = S(line).between('"', '"').s;
	//console.log(address);
    }
});

/////////////////////////Scrape content from given URL///////////////////////////////
//content include all text in between <p>, <li>, and all header tag(from <h1> to <h6>)
scraperjs.StaticScraper.create('http://www.web-presence-in-china.com/graphic-design-production')
    		.scrape(function($) {
     		   return $("p").map(function() {
    		        return $(this).text();
     		   }).get();
    		}, function(news) {
		   json.p_tag = news;
		   //console.log(json.p_tag);
 })
	.scrape(function($) {
     		   return $("li").map(function() {
    		        return $(this).text();
     		   }).get();
    		}, function(news) {
		   json.list_tag = news;
		   //console.log(json.list_tag);
   
})
		.scrape(function($) {
     		  return $(":header").map(function() {
    		        return $(this).text();
     		   }).get();
    		}, function(news) {
		   json.heading_tag = news;
		   //console.log(json.heading_tag);
		   //console.log(json);---------------------------------------------'json' here is not empty
})


// Write content to JSON file
function writeJSON(content) {
	
  //console.log(json); --------------------------------------------------------------'json' here is empty(why is empty?)
  fs.writeFile('output.json', JSON.stringify(content, null, 4), function(err){
        	console.log('File successfully written! - Check your project directory for the output.json file');
        })
}

writeJSON(json);

