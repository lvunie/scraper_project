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


///////////////////////////////////////////////////////////////////////////////////////////
//////////////////scrape image///////////////////



// Dependencies
var fs = require('fs');
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

// App variables


//////////////////////////////////////////////////////////////////////////////////////////

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
				
				option = 'Process';
				html = S(html).replaceAll('/sites/default/files/','').s;
				make_tab_folder(json.filename, option, html );

		//		tab[1].title = option;
		//		tab[1].markdown = process_path;
	})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		.scrape(function($) {
     		   	return $(".imgpopup").map(function() {
    		        	return $(this).attr("href");
     		   	}).get();
    			}, function(process) {

			file_url = 'http://www.web-presence-in-china.com' + process;
			DOWNLOAD_DIR = '/home/lvunie/work/scraper_project/WPIC_Scraper/markdown/' + json.filename + '/';

			imgScraper(file_url, DOWNLOAD_DIR);
	
	})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		.scrape(function($) {
     		   	return $(".imgpopup img").map(function() {
    		        	return $(this).attr("src");
     		   	}).get();
    			}, function(process2) {
			
			file_url = 'http://www.web-presence-in-china.com' + process2;
			DOWNLOAD_DIR = '/home/lvunie/work/scraper_project/WPIC_Scraper/markdown/' + json.filename + '/';

			imgScraper(file_url, DOWNLOAD_DIR);

			tab[1].title = 'Process';
			tab[1].markdown = DOWNLOAD_DIR;
			
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

	var option_path ='/home/lvunie/work/scraper_project/WPIC_Scraper/markdown/' + address + '/';			

	mkdirp(option_path, function(err) { 
		//console.log('ok');
	});

	option = option.toLowerCase();

	var option_markdown = option_path + '/' +  option  +'.md';
	writeToMarkdown(option_markdown, text);
			
	return option_path;

}

function writeToMarkdown(option_markdown, text){
	
	fs.writeFile(option_markdown, text, function(err){
       	
	});

}




function imgScraper(file_url, DOWNLOAD_DIR){
	// We will be downloading the files to a directory, so make sure it's there
	// This step is not required if you have manually created the directory
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
	//newName = unescape(file_url);
	//console.log(file_name);

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


