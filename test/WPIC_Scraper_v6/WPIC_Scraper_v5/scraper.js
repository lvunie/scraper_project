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
	scrape(address);

	var pageTwo = S(line).indexOf('category');
	//console.log(pageTwo +': '+ address);
	
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
//////////////////////////////////////new for/////////////////////////////////
		.scrape(function($) {
     		   	return $("img-slide").map(function() {
    		        	return $(img).attr('src').text();
     		   	}).get();
    			}, function(text) {
			console.log(text);
				
   
	})

//////////////////////////////////////////////////////////////////////////////
		.scrape(function($) {
     		   	return $(".slide-heading").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(text) {
				
				string = S(text).collapseWhitespace().s;				
				first = S(string).between('',',').s;
				
				string = S(string).chompLeft(first).s;	
				//console.log('first: ' + first);

				related[0].title = first;
				related[0].icon  = '';

				second = S(string).between(',',',').s;
				string = S(string).chompLeft(',' + second).s;

				//console.log('second: ' + second);

				related[1].title = S(second).trim().s;
				related[1].icon  = '';

				third = S(string).between(',',',').s;
				string = S(string).chompLeft(',' + third).s;

				//console.log('third: ' + third);

				related[2].title = S(third).trim().s;
				related[2].icon  = '';

				fourth = S(string).between(',','').s;
				string = S(string).chompLeft(', ' + fourth).s;

				//console.log('fourth: ' + string);

				related[3].title = string;
				related[3].icon  = '';

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
				tab[1].markdown = '';
   
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

	var pathName = '/home/lvunie/work/scraper_project/WPIC_Scraper_v5/output/' + fileIndex; 

	
	var newAddress = pathName + '.json';
        fs.writeFile(newAddress, JSON.stringify(three, null, 4), function(err){
        	//console.log(json);
        })	
}

//function loop(){
	//alert()
//	$('.img-slide').click(function(){
//		var src = $this.attr('src');
//		console.log(src);
//		console.log('here-------------------');
//	});
//}

//loop();
function loop(){
$('.img-slide').click(function(){
	var src = $this.attr('src');
	console.log(src);
	console.log('here-------------------');
	});
}




