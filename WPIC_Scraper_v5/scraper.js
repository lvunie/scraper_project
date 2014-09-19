var scraperjs = require('scraperjs');
var express   = require('express');
var app       = express();
var mkdirp    = require('mkdirp');

var S         = require('string');
var fs        = require('fs');

var fileIndex = 0;
var address;
var filename;
var title, category, content, description;
var page = 0;

var frame = {
	page: "",
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

	var pathName = '/home/lvunie/work/scraper_project/WPIC_Scraper_v5/output/en'; 
	var markdown_pathName = '/home/lvunie/work/scraper_project/WPIC_Scraper_v5/markdown'; 

	mkdirp(pathName, function(err) { 
		//console.log('ok');
	});

	mkdirp(markdown_pathName, function(err) { 
		//console.log('ok');
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
	
	var about_page = S(line).indexOf('about-us');
	if(about_page >0)
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

////////////////////////////////Process content//////////////////////////////////

		.scrape(function($) {
     		   	return $(".imgpopup").map(function() {
    		        	return $(this).attr("href");
     		   	}).get();
    			}, function(process) {

			part1 = '<p><a class=\"imgpopup" href=\"' + process + '\"><img src=\"';
	
	})

		.scrape(function($) {
     		   	return $(".imgpopup img").map(function() {
    		        	return $(this).attr("width");
     		   	}).get();
    			}, function(width) {
			
			part3 = width;
	
	})
		.scrape(function($) {
     		   	return $(".imgpopup img").map(function() {
    		        	return $(this).attr("height");
     		   	}).get();
    			}, function(height) {
			
			part4 = height ;

	
	})
		.scrape(function($) {
     		   	return $(".imgpopup img").map(function() {
    		        	return $(this).attr("src");
     		   	}).get();
    			}, function(process2) {
			
			part2 = process2 + " width=\"" + part3 + "\" height=\"" + part4 + "\" /></a></p> ";

			html_png = part1 + part2;
			
			option = 'Process';
			process_path = make_tab_folder(json.filename, option, html_png );

			tab[1].markdown = process_path;
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
     		   	return $("#tab1 p").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(text) {
					
				option = 'Overview';
				overview_path = make_tab_folder(json.filename, option, text );

				tab[0].title = option;
				tab[0].markdown = overview_path;
   
	})
		.scrape(function($) {
     		   	return $("#tab2 p").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(text) {

				tab[1].title = 'Process';

	})
		.scrape(function($) {
     		  	return $("#tab3 p, ol").map(function() {
    		       		return $(this).text();
     		   	}).get();
    			}, function(text) {
				//console.log(text);

				option = 'Impact';
				impact_path = make_tab_folder(json.filename, option, text );

				tab[2].title = option;
				tab[2].markdown = impact_path;
				
////////////////////////////////assign value to json format///////////////////////////////
				content.tab = tab;
				data.content = content;
				json.data = data;

////////////////////////////////call write function////////////////////////////////////////
				frame.page = json;
				writeToJson(address,frame);
				
	})
}

//////
////////////////////////////Write content to JSON file//////////////////////////////////////////////////
function writeToJson(address,json){

	fileIndex = fileIndex +1;

	var pathName = '/home/lvunie/work/scraper_project/WPIC_Scraper_v5/output/en/' + fileIndex; 

	
	var newAddress = pathName + '.json';
        fs.writeFile(newAddress, JSON.stringify(frame, null, 4), function(err){
  
        })	
}

//////
////////////////////////////create folder for markdown//////////////////////////////////////////////////
function make_tab_folder(address, option , text ){

	var option_path ='/home/lvunie/work/scraper_project/WPIC_Scraper_v5/markdown/' + option + '/' + address + '/';			

	mkdirp(option_path, function(err) { 
		//console.log('ok');
	});

	var option_markdown = option_path + '/' + option +'.md';
	writeToMarkdown(option_markdown, text);
			
	return option_path;

}

function writeToMarkdown(option_markdown, text){

	fs.writeFile(option_markdown, JSON.stringify(text, null, 4), function(err){
       	
	});

}




