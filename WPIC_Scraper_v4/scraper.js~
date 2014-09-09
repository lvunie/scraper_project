var express = require('express');
var fs = require('fs');

var scraperjs = require('scraperjs');
var app     = express();
var S = require('string');

var p_tag, list_tag, heading_tag;
var json = { p_tag : "", list_tag : "", heading_tag : ""};
var address;
var test = 111;
var json_filename;

var new_json_filename;

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
    }

	scrape(address);
});


/////////////////////////Scrape content from given URL///////////////////////////////
//content include all text in between <p>, <li>, and all header tag(from <h1> to <h6>)

function scrape(address){

	//console.log('test here point v1');
	//console.log(address);
	json_filename = address;

	scraperjs.StaticScraper.create(address)
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
			writeToJson(json_filename,json);
	})

}


// Write content to JSON file

function writeToJson(json_filename,json){
	
	test = test + 1;
	var json_name = test + '.json';

	new_json_filename =  S(json_filename).between('.', '.').s;
	//console.log(new_json_filename);
	
        fs.writeFile(json_name, JSON.stringify(json, null, 4), function(err){
        	console.log('ok');
        })
	
}




