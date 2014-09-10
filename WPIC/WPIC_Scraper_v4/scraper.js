var express = require('express');
var fs = require('fs');

var scraperjs = require('scraperjs');
var app     = express();
var S = require('string');

var web_filename;
var title, catagory, content_tag, description;
var json = { web_filename : "",  catagory : "", title : "", description : "", content_tag : "", description : ""};
var address;

var index_filename = 1;
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

	

	//json_filename = address;

	scraperjs.StaticScraper.create(address)
	    		.scrape(function($) {
	     		   return $("title").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(text) {
			//json.title = text;
			json.title = S(text).between('', '|').s ;
			
 	})
		.scrape(function($) {
     		   	return $(".page-title").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(text) {

			json.catagory = S(text).trim().s;
   
	})
		.scrape(function($) {
     		   	return $(".hidden-xs").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(text) {

			json.description = S(text).trim().s;
			///////////////////////////////////////////////////
			//here = S(text).trim().s;			
			//here = S(text).between('"', ',').s;
			//console.log(here);
			///////////////////////////////////////////////////
			//json.description = here;
   
	})
		.scrape(function($) {
     		  return $("div .container").map(function() {
    		        return $(this).text();
     		   }).get();
    		}, function(text) {
		   
			var index    = address.lastIndexOf('/');
			json.web_filename         = address.slice(index+1); 
			//console.log(here);
			json_filename = address;

			json.content_tag = text;
			writeToJson(json_filename,json);
	})

}


// Write content to JSON file

function writeToJson(json_filename,json){
	
	index_filename = index_filename + 1;
	var json_name = index_filename + '.json';

	new_json_filename =  S(json_filename).between('.', '.').s;
	//console.log(new_json_filename);
	
        fs.writeFile(json_name, JSON.stringify(json, null, 4), function(err){
        	//console.log('ok');
        })
	
}




