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
var test = 123;
var json_filename;

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

	scrape(address);
});


/////////////////////////Scrape content from given URL///////////////////////////////
//content include all text in between <p>, <li>, and all header tag(from <h1> to <h6>)

function scrape(address){

	//console.log('test here point v1');
	//console.log(address);

	scraperjs.StaticScraper.create(json_filename)
	    		.scrape(function($) {
	     		   return $("p").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(news) {
		   	json.p_tag = news;
 	})
		.scrape(function($) {
     		   	return $("li").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(news) {
		   	json.list_tag = news;
   
	})
		.scrape(function($) {
     		  return $(":header").map(function() {
    		        return $(this).text();
     		   }).get();
    		}, function(news) {
		   json.heading_tag = news;
	  
	})

	json_filename = address;
	writeToJson(json_filename);
}

//scrape();

// Write content to JSON file

function writeToJson(json_filename){
	
	//console.log('here is file name!!!');
	//console.log(json_filename);
	
	
	test = test + 1;
	var json_name = test + '.json';
	console.log(json_name);
	console.log('here is json file name');


	app.get('/scrape', function(req, res){
	
		url = '// http://www.web-presence-in-china.com/';

		request(url, function(error, response, html){
			if(!error){
				var $ = cheerio.load(html);
			}

	
        	fs.writeFile(json_name, JSON.stringify(json, null, 4), function(err){
        		console.log('File successfully written! - Check your project directory for the output.json file');
        	})

        	res.send('Check your console!')
		})
	})
}

////////////////////////////port 8081//////////////////////////////////////
app.listen('8081')
console.log('V_1.4 Please go to "http://localhost:8081/scrape"');
exports = module.exports = app;





