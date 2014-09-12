var scraperjs = require('scraperjs');
var express = require('express');
var app     = express();
var mkdirp = require('mkdirp');

var S = require('string');
var fs = require('fs');

var address;
var index_filename = 0;
var json_filename;
var new_json_filename;


var filename;
var title, category, content, description;

var json = { 
	filename : "",  
	data: "",
};


var data = {
	title : "", 
	category : "", 
	description : "", 
	content : ""
};

var content = {
	tab : "", 
	related : "", 
};

var tab = [
	{
	     "title": "",
             "markdown": ""
	},	
	{
	     "title": "",
             "markdown": ""
	},
	{
	     "title": "",
             "markdown": ""
	},	
];

var related = {
	title : "", 
	icon : "", 
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

				data.category = S(text).trim().s;
   
	})
		.scrape(function($) {
     		   	return $(".hidden-xs").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(text) {
				var number = S(text).length;
				number =  number/2;

				var test = S(text).left(number).s;
				data.description = test;
   
	})
		.scrape(function($) {
     		  	return $("h2").map(function() {
    		       		return $(this).text();
     		   	}).get();
    			}, function(text) {

				var index    = address.lastIndexOf('/');
				json.filename = address.slice(index+1); 
/////////////////////////////////////////////////////////////////////////
				tab[0].title = 'Overview';
				tab[0].markdown = '';

				tab[1].title = 'Process';
				tab[1].markdown = '';

				tab[2].title = 'Impact';
				tab[2].markdown = '';
				content.tab = tab;

				related.title = '';
				related.icon = '';
				content.related = related;
			
				data.content = content;
/////////////////////////////////////////////////////////////////////////
				json_filename = address;
				json.data = data;

	var pathName = '/home/lvunie/work/scraper_project/URL/' + address; 
				mkdirp(pathName, function(err) { 
				
	var newAddress = pathName + '/' +'output.json';
	
					writeToJson(newAddress,json);
				
				});

				//writeToJson(json_filename,json);
				
			
	})

}


////////////////////////////Write content to JSON file//////////////////////////////////////////////////

//function writeToJson(json_filename,json){

function writeToJson(newAddress,json){
	index_filename = index_filename + 1;
	var json_name = index_filename + '.json';

	//new_json_filename =  S(json_filename).between('.', '.').s;

	//var newName = '/home/lvunie/work/scraper_project/URL/' + json_name;

        fs.writeFile(newAddress, JSON.stringify(json, null, 4), function(err){
        	//console.log('ok');
        })
	
}




