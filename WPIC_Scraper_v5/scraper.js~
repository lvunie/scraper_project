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

var three = {
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

var related = [
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
	},
	{
	     "title" : "", 
	     "icon" : "", 
	},	
];

function createFolder(){

	var pathName = '/home/lvunie/work/scraper_project/WPIC_Scraper_v5/output'; 

	mkdirp(pathName, function(err) { 
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
////////////////////////////start///////////////////////////////////

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

//////////////////////////end////////////////////////////////////

////////////////////////////start///////////////////////////////////

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
			
			tab[1].markdown = part1 + part2;
	
	})

//////////////////////////end////////////////////////////////////

		.scrape(function($) {
     		   	return $(".slide-heading").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(text) {
				
				string = S(text).collapseWhitespace().s;				
				first = S(string).between('',',').s;
				
				string = S(string).chompLeft(first).s;	

				related[0].title = first;
				//related[0].icon  = '';

				second = S(string).between(',',',').s;
				string = S(string).chompLeft(',' + second).s;

				related[1].title = S(second).trim().s;
				//related[1].icon  = '';

				third = S(string).between(',',',').s;
				string = S(string).chompLeft(',' + third).s;

				related[2].title = S(third).trim().s;
				//related[2].icon  = '';

				fourth = S(string).between(',','').s;
				string = S(string).chompLeft(', ' + fourth).s;

				related[3].title = string;
				//related[3].icon  = '';

				content.related = related;
   
	})
///////////////////////////content ////////////////////////////////
		.scrape(function($) {
     		   	return $("#tab1 p").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(text) {

				text = S(text).lines();
				text = S(text).trim().s;
	
				tab[0].title = 'Overview';
				tab[0].markdown = text;
   
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
				text = S(text).lines();
				text = S(text).trim().s;

				tab[2].title = 'Impact';
				tab[2].markdown = text;
				content.tab = tab;
			
				data.content = content;
				json.data = data;

				var index    = address.lastIndexOf('/');
				json.filename = address.slice(index+1); 

////////////////////////////////call write function////////////////////////////////////////
				three.page = json;
				writeToJson(address,three);
				
	})
}


////////////////////////////Write content to JSON file//////////////////////////////////////////////////
function writeToJson(address,json){

	fileIndex = fileIndex +1;

	var pathName = '/home/lvunie/work/scraper_project/WPIC_Scraper_v5/output/en/' + fileIndex; 

	
	var newAddress = pathName + '.json';
        fs.writeFile(newAddress, JSON.stringify(three, null, 4), function(err){
  
        })	
}




