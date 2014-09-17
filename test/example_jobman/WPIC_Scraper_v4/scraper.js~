var scraperjs = require('scraperjs');
var express = require('express');
var app     = express();

var S = require('string');
var fs = require('fs');

var address;
var index_filename = 0;
var json_filename;
var new_json_filename;


var web_filename;
var title, catagory, content, description;

var json = { 
	web_filename : "",  
	catagory : "", 
	data: "",
};


var data = {
	title : "", 
	description : "", 
	content : ""
};






////////////////////////////open JOSN file to get URL for scraping//////////////////////////
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


/////////////////////////Scrape content from given URL///////////////////////////////////////
//content include all text in between <p>, <li>, and all header tag(from <h1> to <h6>)

function scrape(address){

	scraperjs.StaticScraper.create(address)
	    		.scrape(function($) {
	     		   return $("title").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(text) {
			data.title = S(text).between('', '|').s ;
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
		 
			//data.description = S(text).trim().s;
	
			var number = S(text).length;
			number =  number/2;

			//console.log('-------------------------------------');
			//console.log(text);

			var test = S(text).left(number).s;
			//console.log('   ' + test);

			data.description = test;

   
	})
		.scrape(function($) {
     		  return $(".container").map(function() {
    		        return $(this).text();
     		   }).get();
    		}, function(text) {
		   
			var index    = address.lastIndexOf('/');
			json.web_filename = address.slice(index+1); 
			
			json_filename = address;
			json.data = data;

			writeToJson(json_filename,json);
			
	})

}


////////////////////////////Write content to JSON file//////////////////////////////////////////////////

function writeToJson(json_filename,json){
	
	index_filename = index_filename + 1;
	var json_name = index_filename + '.json';

	new_json_filename =  S(json_filename).between('.', '.').s;

        fs.writeFile(json_name, JSON.stringify(json, null, 4), function(err){
        	//console.log('ok');
        })
	
}




