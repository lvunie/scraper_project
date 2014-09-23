var scraperjs = require('scraperjs');
var express   = require('express');
var app       = express();
var mkdirp    = require('mkdirp');

var he = require('he');
var toMarkdown = require('to-markdown').toMarkdown;

var S         = require('string');
var fs        = require('fs');

var fileIndex = 0;
var address;
var filename;
var title, category, content, description;
var page = 0;

var frame = {
	//page: "",
};

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
	},	
	{
	     "title" : "", 
	     "icon" : "", 
	},
	{
	     "title" : "", 
	     "icon" : "", 
	},
	{
	     "title" : "", 
	     "icon" : "", 
}];

function createFolder(){

	var pathName = '/home/lvunie/work/scraper_project/WPIC_Scraper/output/en'; 
	var markdown_pathName = '/home/lvunie/work/scraper_project/WPIC_Scraper/markdown'; 

	mkdirp(pathName, function(err) { 

	});

	mkdirp(markdown_pathName, function(err) { 
		
	});

}

createFolder();

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
	
	var about_page = S(address).indexOf('about-us');
	var index_page  = S(address).indexOf('category');

	if((about_page >0) || (index_page)>0)
	{
		//console.log('about-us');
	}else{
		scrape(address);
		//console.log(address);
	}	
	
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

				var index    = address.lastIndexOf('/');
				json.filename = address.slice(index+1); 

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
////////////////////////////related title//////////////////////////////////

		.scrape(function($) {
     		   	return $(".img-slide > img").map(function() {
    		        	return $(this).attr("src");
     		   	}).get();
    			}, function(link) {

				related[0].icon  = link[0];
				related[1].icon  = link[1];
				related[2].icon  = link[2];
				related[3].icon  = link[3];
	
	})


////////////////////////////////////write related title//////////////////////////////////

		.scrape(function($) {
     		   	return $(".slide-heading").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(text) {
				
				string = S(text).collapseWhitespace().s;				
				first = S(string).between('',',').s;
				
				string = S(string).chompLeft(first).s;	
				related[0].title = first;

				second = S(string).between(',',',').s;
				string = S(string).chompLeft(',' + second).s;
				related[1].title = S(second).trim().s;

				third = S(string).between(',',',').s;
				string = S(string).chompLeft(',' + third).s;
				related[2].title = S(third).trim().s;

				fourth = S(string).between(',','').s;
				string = S(string).chompLeft(', ' + fourth).s;
				related[3].title = string;

				content.related = related;
   
	})
////////////////////////////// content ////////////////////////////////
		.scrape(function($) {
     		   	return $("#tab1").map(function() {
    		        	return $(this).html();
     		   	}).get();
    			}, function(html) {
					
				option = 'Overview';
				html = S(html).collapseWhitespace().s;
				html = toMarkdown(html);
	
				overview_path = make_tab_folder(json.filename, option, html );

				tab[0].title = option;
				tab[0].markdown = overview_path;
   
	})
		.scrape(function($) {
     		   	return $("#tab2 p").map(function() {
    		        	return $(this).html();
     		   	}).get();
    			}, function(html) {
				
				option = 'process';

				html = S(html).decodeHTMLEntities().s;
				//html = toMarkdown(html);

				process_path = make_tab_folder(json.filename, option, html );

				tab[1].title = option;
				tab[1].markdown = process_path;
	})
		.scrape(function($) {
     		  	return $("#tab3").map(function() {
    		       		return $(this).html();
     		   	}).get();
    			}, function(html) {

				option = 'Impact';

				html = S(html).decodeHTMLEntities().s;
				html = toMarkdown(html);

				impact_path = make_tab_folder(json.filename, option, html );

				tab[2].title = option;
				tab[2].markdown = impact_path;
				
////////////////////////////////assign value to json format///////////////////////////////
				content.tab = tab;
				data.content = content;
				json.data = data;

////////////////////////////////call write function////////////////////////////////////////
				frame = json;
				writeToJson(address,frame);
				
	})
}

//////
////////////////////////////Write content to JSON file//////////////////////////////////////////////////
function writeToJson(address,json){

	fileIndex = fileIndex +1;

	var pathName = '/home/lvunie/work/scraper_project/WPIC_Scraper/output/en/' + fileIndex; 

	
	var newAddress = pathName + '.json';
        fs.writeFile(newAddress, JSON.stringify(frame, null, 4), function(err){
  
        })	
}

//////
////////////////////////////create folder for markdown//////////////////////////////////////////////////
function make_tab_folder(address, option , text ){

	var option_path ='/home/lvunie/work/scraper_project/WPIC_Scraper/markdown/' + option + '/' + address + '/';			

	mkdirp(option_path, function(err) { 
		//console.log('ok');
	});

	var option_markdown = option_path + '/' + option +'.md';
	writeToMarkdown(option_markdown, text);
			
	return option_path;

}

function writeToMarkdown(option_markdown, text){
	
	fs.writeFile(option_markdown, text, function(err){
       	
	});

}




