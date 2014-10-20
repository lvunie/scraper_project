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
var cate_heading, two_text, link, img_slide, img_white;
var length_index;

var three = {
	//page: "",
};

var json = { 
	filename : "",  
	data: "",
};

var data = {
	title : "", 
	description : "", 
	filename : "",
	content : ""
};

var content = {
	items : "",
};

var items = [
	{
		"cate_heading":"",
		"two_text": "",
		"link": "",
		"img_slide": "",
		"img_white": "",
	},	
	{
		"cate_heading":"",
		"two_text": "",
		"link": "",
		"img_slide": "",
		"img_white": "",
	},
	{
		"cate_heading":"",
		"two_text": "",
		"link": "",
		"img_slide": "",
		"img_white": "",
	},
	{
		"cate_heading":"",
		"two_text": "",
		"link": "",
		"img_slide": "",
		"img_white": "",
	},	
	{
		"cate_heading":"",
		"two_text": "",
		"link": "",
		"img_slide": "",
		"img_white": "",
	},	
	{
		"cate_heading":"",
		"two_text": "",
		"link": "",
		"img_slide": "",
		"img_white": "",
	},	
	{
		"cate_heading":"",
		"two_text": "",
		"link": "",
		"img_slide": "",
		"img_white": "",
	},	
	{
		"cate_heading":"",
		"two_text": "",
		"link": "",
		"img_slide": "",
		"img_white": "",
	},	
	{
		"cate_heading":"",
		"two_text": "",
		"link": "",
		"img_slide": "",
		"img_white": "",
	},	
	{
		"cate_heading":"",
		"two_text": "",
		"link": "",
		"img_slide": "",
		"img_white": "",
	},	
	{
		"cate_heading":"",
		"two_text": "",
		"link": "",
		"img_slide": "",
		"img_white": "",
	},	
	{
		"cate_heading":"",
		"two_text": "",
		"link": "",
		"img_slide": "",
		"img_white": "",
	},	
	{
		"cate_heading":"",
		"two_text": "",
		"link": "",
		"img_slide": "",
		"img_white": "",
	},	
	{
		"cate_heading":"",
		"two_text": "",
		"link": "",
		"img_slide": "",
		"img_white": "",
	},	
	{
		"cate_heading":"",
		"two_text": "",
		"link": "",
		"img_slide": "",
		"img_white": "",
	},	
	{
		"cate_heading":"",
		"two_text": "",
		"link": "",
		"img_slide": "",
		"img_white": "",
	},
	{
		"cate_heading":"",
		"two_text": "",
		"link": "",
		"img_slide": "",
		"img_white": "",
	},	
	{
		"cate_heading":"",
		"two_text": "",
		"link": "",
		"img_slide": "",
		"img_white": "",
	},	
];

// create folder if no exist, to store category output json
function createFolder(){

	var pathName = '/home/lvunie/work/scraper_project/WPIC_Scraper/category_output/'; 


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
	
	var pageTwo = S(line).indexOf('category/marketing');
	if(pageTwo > 0)
	{
		scrape(address);
	}
	
});


/////////////////////////Scrape content from given URL///////////////////////////////////////
//content include all text in between <p>, <li>, and all header tag(from <h1> to <h6>)

function scrape(address){

	// Get category title, ("title")
	scraperjs.StaticScraper.create(address)
	    	.scrape(function($) {
	     		   return $("title").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(string) {
				data.title = S(string).between('', '|').s ;
 	})
		// Get icon address for each service option, ("img_slide", "img_white")
		.scrape(function($) {
     		   	return $("img").map(function() {
    		        	return $(this).attr("src");
     		   	}).get();
    			}, function(link) {
				i_slide = 1;
				size = link.length/2 - 1;

				for(i = 0;  i < size; i++){			

					items[i].img_slide = link[i_slide];
					i_slide = i_slide + 1;
					items[i].img_white = link[i_slide];
					i_slide = i_slide + 1;
				}
			
	})
		// Get the size of service options
		.scrape(function($) {
     		   	return $(".content a").map(function() {
    		        	return $(this).attr("href");
     		   	}).get();
    			}, function(link) {
			
			length_index = link.length;
	})


		// Get detail description for each service option, ("two_text")
		.scrape(function($) {
     		   	    return $(".b-from-bottom.b-animate.inner-para.text-left").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(string) {

			 	for(i=0; i < length_index; i++)
				{
					newString = string[i];				
					newString = S(newString).trim().s;
					items[i].two_text = newString;
				}
   		
	})
		// Get category description
		.scrape(function($) {
     		   	    return $("h3").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(string) {
				data.description = S(string).trim().s;
   
	})

		// Get "link"
		.scrape(function($) {
     		   	    return $(".col-xs-12.col-sm-6.col-md-3 > a").map(function() {
    		        	return $(this).attr("href");
     		   	}).get();
    			}, function(string) {

				for(i = 0;  i < (string.length); i++){			
					items[i].link = string[i];
				}
   
	})
		//Get service title, "cate_heading"
		.scrape(function($) {
     		   	return $(".cate-heading.b-from-bottom").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(string) {

				for(i=0; i < length_index; i++)
				{
					newString = string[i];				
					newString = S(newString).trim().s;
					items[i].cate_heading = newString;
					console.log(newString);
				}
				
				content.items = items;

				
	})
		//Assign correspond data to "content" 
		.scrape(function($) {
     		  	return $("#tab3 p, ol").map(function() {
    		       		return $(this).text();
     		   	}).get();
    			}, function(string) {
				string = S(string).lines();
				string = S(string).trim().s;
			
				data.content = content;
				json.data = data;

				var index    = address.lastIndexOf('/');
				json.filename = address.slice(index+1); 
				data.filename = json.filename;

				three = json; 
				writeToJson(address,three);
				
	})
}


////////////////////////////Write content to JSON file//////////////////////////////////////////////////
function writeToJson(address,json){

	fileIndex = fileIndex +1;

	var pathName = '/home/lvunie/work/scraper_project/WPIC_Scraper/category_output/'; 


	var newAddress = pathName + 'category_marketing.json';
        fs.writeFile(newAddress, JSON.stringify(three, null, 4), function(err){
        	//console.log(json);
        })	
}







