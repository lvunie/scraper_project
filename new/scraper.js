var scraperjs = require('scraperjs');
var express   = require('express');
var app       = express();
var mkdirp    = require('mkdirp');

var he = require('he');
var toMarkdown = require('to-markdown').toMarkdown;

var S         = require('string');
var fs        = require('fs');

// JSON 
var fileIndex = 0;
var address;
var filename;
var title, category, content, description;
var page = 0;

// Dependencies for scrape image from URL
var fs = require('fs');
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;


// JSON structure
var frame = {
	
};

var json = { 
	filename : "",  
	data: "",
};


var data = {
	title : "", 
	category : "", 
	description : "", 
	filename : "", 
	content : ""
};

var content = {
	tab : "", 
	related : "", 
};

var tab = [{
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
}];

var related = [{
	     "title" : "", 
	     "icon" : "", 
	     "url" : ""
	},	
	{
	     "title" : "", 
	     "icon" : "", 
	     "url" : ""
	},
	{
	     "title" : "", 
	     "icon" : "", 
	     "url" : ""
	},
	{
	     "title" : "", 
	     "icon" : "", 
	     "url" : ""
}];

//create output folder for each type three's JSON, markdown folder
function createFolder(){

	var pathName = 'output/en'; 
	var markdown_pathName = 'markdown'; 

	mkdirp(pathName, function(err) { 

	});

	mkdirp(markdown_pathName, function(err) { 
		
	});

}

scrape();
//Scrape content from given URL
function scrape(){
	
	//Title name
	scraperjs.StaticScraper.create('http://www.web-presence-in-china.com/category/marketing')
	    		.scrape(function($) {
	     		  return $(".img-slide img").map(function() {
    		        	return $(this).attr("src");
     		   	}).get();
    			}, function(related_img) {
			
			for(i = 0; i < related_img.length; i++){

			console.log(related_img[i]);
			DOWNLOAD_DIR = 'related/';

			imgScraper(related_img[i], DOWNLOAD_DIR);

			}
			
	})
	
		
}

//////
////////////////////////////Write content to JSON file//////////////////////////////////////////////////
function writeToJson(address,json){

	fileIndex = fileIndex +1;

	//var pathName = '/home/lvunie/work/scraper_project/WPIC_Scraper/output/en/' + fileIndex; 
	var pathName = 'output/en/' + fileIndex; 

	
	var newAddress = pathName + '.json';
        fs.writeFile(newAddress, JSON.stringify(frame, null, 4), function(err){
  
        })	
}

//////
////////////////////////////create folder for markdown//////////////////////////////////////////////////
function make_tab_folder(address, option , text ){

	//var option_path ='/home/lvunie/work/scraper_project/WPIC_Scraper/markdown/' + address + '/';	
	var option_path ='markdown/' + address + '/';			
		
	option = option.toLowerCase();

	var option_markdown = option_path + '/' +  option  +'.md';
	writeToMarkdown(option_markdown, text);
			
	return option_path;

}
//////////////
function create_markdown_folder(address){

	var option_path ='markdown/' + address + '/';				

	mkdirp(option_path, function(err) { 
		//console.log('ok');
	});
}

function writeToMarkdown(option_markdown, text){
	
	fs.writeFile(option_markdown, text, function(err){
       	
	});

}


function imgScraper(file_url, DOWNLOAD_DIR){
	// We will be downloading the files to a directory, so make sure it's there
	// This step is not required if you have manually created the directory
	//console.log(file_url);

	var mkdir = 'mkdir -p ' + DOWNLOAD_DIR;
	var child = exec(mkdir, function(err, stdout, stderr) {
	    if (err) throw err;
	    else download_file_httpget(file_url);
	});
	
	// Function to download file using HTTP.get
	var download_file_httpget = function(file_url) {
	var options = {
	    host: url.parse(file_url).host,
	    port: 80,
	    path: url.parse(file_url).pathname
	};
	
	var file_name = url.parse(file_url).pathname.split('/').pop();
	file_name = unescape(file_name);

	var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);
	
	http.get(options, function(res) {
	    res.on('data', function(data) {
	            file.write(data);
	        }).on('end', function() {
	            file.end();
	            //console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
	        });
	    });
	};

}


