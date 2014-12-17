var scraperjs = require('scraperjs');
var express   = require('express');
var app       = express();
var mkdirp    = require('mkdirp');

var he = require('he');
var toMarkdown = require('to-markdown').toMarkdown;

var S         = require('string');
var fs        = require('fs');


//////////error detect///////////
var error_index = 0;
var error_index2 = 0;
var error_index_overview = 0;
var error_index_process = 0;
var error_index_impact = 0;
var error_index_intellenge = 0;
var result = 0;
var result_done = 0;
/////////////////////////////////

// JSON 
var fileIndex = 0;
var address;
var filename;
var title, category, content, description;
var page = 0;
var glocal_test = 0;

// Dependencies for scrape image from URL
var fs = require('fs');
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

// app.set('port', 3001);


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

///////// Create output directory for each service option's (.md) file and, (.json) file//////////
function createFolder(){

	var pathName = 'output/en'; 
	var markdown_pathName = 'markdown'; 

	mkdirp(pathName, function(err) { 
	});

	mkdirp(markdown_pathName, function(err) { 
	});

}

// Run function to create output directory for each service option's (.md) file and, (.json) file
createFolder();


//open a JOSN file to get all URLs 
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

	// Select target URL for scraping content
	//(For here, ignore "about-us" page and "category"page)
	if((about_page >0) || (index_page)>0)
	{

	}else{
		scrape(address);
	}	
	
});


////////////Scrape content from given URL////////////
function scrape(address){
	
	//Title name
	scraperjs.StaticScraper.create(address)
	    		.scrape(function($) {
	     		   return $("title").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(text) {
				//return when there is no content
				if(text ==''){return};

				data.title = S(text).between('', '|').s ;
				var index    = address.lastIndexOf('/');
				json.filename = address.slice(index+1); 
				data.filename = json.filename;

				create_markdown_folder(json.filename);

 	})
		//Service categoy 
		.scrape(function($) {
     		   	return $(".page-title").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(text) {
				//return when there is no content
				if(text ==''){return};

				data.category = S(text).trim().s;
   
	})
		//Service Description
		.scrape(function($) {
     		   	return $(".hidden-xs").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(text) {
				//return when there is no content
				if(text ==''){return};

				var number = S(text).length;
				number =  number/2;

				var test = S(text).left(number).s;
				data.description = test;
	})

///////////////////////Related icon (related start)//////////////////////
		//Related link
		.scrape(function($) {
     		   	return $(".img-slide > img").map(function() {
    		        	return $(this).attr("src");
     		   	}).get();
    			}, function(link) {
				//return when there is no content
				if(link ==''){return};
				
				// Set Json structure for "related" array
				related = [];
				related_index = link.length;
		
				for(i=0;i<related_index;i++)
				{
					createRelatedFrame()
					related[i].icon  = link[i];
				}
		
	})

		//Related url
		.scrape(function($) {
     		   	return $(".slide-content a").map(function() {
    		        	return $(this).attr("href");
     		   	}).get();
    			}, function(link) {
				//return when there is no content
				if(link ==''){return};

				url_index = link.length;
	
				for(i=0;i<url_index;i++)
				{
					related[i].url  = link[i];
				}
		
	})

		//Related title 
		.scrape(function($) {
     		   	return $(".slide-heading").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(text) {
				if(text ==''){return}

				for(i=0; i < 4; i++)
				{
					newString = text[i];				
					newString = S(newString).trim().s;
					related[i].title = newString;
				}
				
				content.related = related;
   
	})
		// Download all related picture and save in 'related/' directory
		.scrape(function($) {
     		   	return $(".img-slide img").map(function() {
    		        	return $(this).attr("src");
     		   	}).get();
    			}, function(related_img) {
			
			for(i = 0; i < related_img.length; i++)
			{
				DOWNLOAD_DIR = 'related/';		
				imgScraper(related_img[i], DOWNLOAD_DIR);
			}
			
	})

/////////////////// CONTENT (overiver, process, impact, intelligence )
//////////////////////////////////////////////////////////////////////////////////

		//left-tabs
		// Get "href"tab description 
		.scrape(function($) {
			return $(".left-tabs a").map(function() {
    		        	return $(this).attr("href");
     		   	}).get();
    			}, function(html) {
				//return when there is no content
				if(html ==''){return};

				//Set Json structure for "tab" array
 				tab = [];
				tab_index = html.length;

				for(i=0;i<tab_index;i++)
				{
					createTabFrame();
					newChar = S(html[i]).trim().s;
					tab[i].href = newChar;
				}

   
	})
		// Get "class" tab description
		.scrape(function($) {

			return $(".left-tabs a").map(function() {
    		        	return $(this).attr("class");
     		   	}).get();
    			}, function(html) {
				//return when there is no content
				if(html ==''){return};

				tab_index = html.length;
				for(i=0;i<tab_index;i++)
				{
					newChar = S(html[i]).trim().s;
					tab[i].class = newChar;
				}
   
	})
		// Get "title", "markdown" tab description
		.scrape(function($) {
			return $(".left-tabs a").map(function() {
    		        	return $(this).html();
     		   	}).get();
    			}, function(html) {
		
				tab_index = html.length;

				for(i=0;i<tab_index;i++)
				{
					newChar = S(html[i]).trim().s;

					tab[i].title = newChar;
					tab[i].markdown = 'markdown/' + json.filename + '/';
	
				}

				//Assign value to json structure//
				content.tab = tab;
				data.content = content;
				json.data = data;

				//Write to output//
				frame = json;
				writeToJson(address,frame);

				error_index2++;
				console.log('task: '+error_index2+ '  ' + address );
	
		})
//////////////
/////////////////////////////////Main content scraping/////////////////////////////////////////////////////// 
		
		// Get "Overview"(tab1) content
		.scrape(function($) {
     		   	return $("#tab1").map(function() {
    		        	return $(this).html();
     		   	}).get();
    			}, function(html) {
				//return when there is no content
				if(html ==''){return};

				option = 'Overview';
				html = S(html).collapseWhitespace().s;
				html = toMarkdown(html);
	
				var overview_result =  make_tab_folder(json.filename, option, html );
   
	})
		// Write process path
		.scrape(function($) {
     		   	return $("#tab2 p").map(function() {
    		        	return $(this).html();
     		   	}).get();
    			}, function(html) {

				//return when there is no content
				if(html ==''){return};
				
				option = 'Process';
				html = S(html).replaceAll('/sites/default/files/','').s;

				make_tab_folder(json.filename, option, html );

	})
		// Get Process pictures1 from URL 
		.scrape(function($) {
     		   	return $(".imgpopup").map(function() {
    		        	return $(this).attr("href");
     		   	}).get();
    			}, function(process) {
				//return when there is no content
				if(process ==''){return};

			file_url = 'http://www.web-presence-in-china.com' + process;
			DOWNLOAD_DIR = 'markdown/' + json.filename + '/';
	
			imgScraper(file_url, DOWNLOAD_DIR);
	
	})

		//  Get Process pictures2 from URL (Maybe empty)
		.scrape(function($) {
     		   	return $(".imgpopup img").map(function() {
    		        	return $(this).attr("src");
     		   	}).get();
    			}, function(process2) {
			
			file_url = 'http://www.web-presence-in-china.com' + process2;
			DOWNLOAD_DIR = 'markdown/' + json.filename + '/';
		
			imgScraper(file_url, DOWNLOAD_DIR);
			
	})

		// Intelligence(tab4) 
		.scrape(function($) {
     		   	return $("#tab4").map(function() {
    		        	return $(this).html();
     		   	}).get();
    			}, function(html) {
				// 当内容部存在时停止操作
				if(html ==''){return}
				option = 'Intelligence';
				html = S(html).collapseWhitespace().s;
				html = toMarkdown(html);

				make_tab_folder(json.filename, option, html);

	})

		// Impact(tab3)
		.scrape(function($) {
     		  	return $("#tab3").map(function() {
    		       		return $(this).html();
     		   	}).get();
    			}, function(html) {
				//return when there is no content
				if(html ==''){return};

				option = 'Impact';

				html = S(html).decodeHTMLEntities().s;
				html = toMarkdown(html);

				make_tab_folder(json.filename, option, html );

				console.log('--------------------------------------------------');
				
	})
//new
		.scrape(function($) {
     		  	return $(".intelligence-item img").map(function() {
    		       		return $(this).attr("src");
     		   	}).get();
    			}, function(html) {
				//return when there is no content
				if(html ==''){return};

			htmlIndex = html.length;
			DOWNLOAD_DIR = 'markdown/' + json.filename + '/';

			for(i = 0; i < htmlIndex; i++)
			{
				//console.log(html[i]);
				imgScraper(html[i], DOWNLOAD_DIR);
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
////////////////////////////Create folder for markdown//////////////////////////////////////////////////
function make_tab_folder(address, option , text ){

	var option_path ='markdown/' + address + '/';			
	var md_result = 0;
	
	option = option.toLowerCase();

	var option_markdown = option_path +  option  +'.md';


	writeToMarkdown(option_markdown, text);

	return md_result;

}


// Create all services folder 
function create_markdown_folder(address){

	var option_path ='markdown/' + address + '/';				

	mkdirp(option_path, function(err) { 

	});
}

// Write content to .md file
function writeToMarkdown(option_markdown, text){

console.log('start writing..... ' + option_markdown);
	
	
	fs.writeFile(option_markdown, text);
       		
	return;
}

// Download pictures from url to a folder
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

function createTabFrame()
{
	tab.push({ 
		"title":    "",
             	"markdown": "",
	     	"href":     "",
	     	"class":    ""
    	});

}

function createRelatedFrame()
{
	related.push({ 
	     "title" : "", 
	     "icon" :  "", 
	     "url" :   ""
    	});

}



