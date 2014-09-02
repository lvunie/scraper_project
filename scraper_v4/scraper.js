var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var scraperjs = require('scraperjs');
var app     = express();
var S = require('string');

var p_tag, list_tag, heading_tag;
var json = { p_tag : "", list_tag : "", heading_tag : ""};
var address;

//open JOSN file to get URL for scraping
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
	//console.log(address);
    }
    
    //console.log('------------------------------------');
});


/////////////////////////Scrape content from given URL///////////////////////////////
//content include all text in between <p>, <li>, and all header tag(from <h1> to <h6>)
function scrape(){

	console.log('-----------------------------------------------------------------------------');
	console.log(window.address);
	console.log('-----------------------------------------------------------------------------');

	scraperjs.StaticScraper.create('http://www.web-presence-in-china.com/graphic-design-production')
	    		.scrape(function($) {
	     		   return $("p").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(news) {
		   	json.p_tag = news;
 	})
		.scrape(function($) {
     		   	return $("li").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(news) {
		   	json.list_tag = news;
   
	})
		.scrape(function($) {
     		  return $(":header").map(function() {
    		        return $(this).text();
     		   }).get();
    		}, function(news) {
		   json.heading_tag = news;
	  
	})
}

scrape();

// Write content to JSON file

app.get('/scrape', function(req, res){
	
	url = '// http://www.web-presence-in-china.com/';

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
		}
 
	//console.log(json);
        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
        	console.log('File successfully written! - Check your project directory for the output.json file');
        })

        res.send('Check your console!')
	})
})

////////////////////////////port 8081//////////////////////////////////////
app.listen('8081')
console.log('V_1.6 Please go to "http://localhost:8081/scrape"');
exports = module.exports = app;





