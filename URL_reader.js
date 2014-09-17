var fs = require('fs');
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

/////// Reference from https://github.com/ruipgil/scraperjs#show-me-the-way-aka-routes //////
/////// To get all sub URLs from a given original URL address ///////

var scraperjs = require('scraperjs');
    router = new scraperjs.Router();

var web_address;
var json = { web_address : ""};
	

router
    .otherwise(function(url) {
    console.log("Url '"+url+"' couldn't be routed.");
});

var path = {};

router.on('http://www.web-presence-in-china.com/')
    .createStatic()
    .scrape(function($) {
        return $("#navbar-collapse-grid a").map(function() {
            return $(this).attr("href");
        }).get();
    }, function(text) {
		console.log(text);
    })

router.route("http://www.web-presence-in-china.com/", function() {
    console.log("URLs gotten!");
});

/////// Reference from http://scotch.io/tutorials/javascript/scraping-the-web-with-node-js //////
/////// To writen content to JSON file /////////

app.get('/scrape', function(req, res){
	
	// vertify given address
	url = '// http://www.web-presence-in-china.com/';
	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
		}
 
	// write to JSON file
        fs.writeFile('URL_output.json', JSON.stringify(json, null, 4), function(err){

        	console.log('File successfully written! - Check your project directory for the URL_output.json file');

        })


        res.send('Check your console!')
	})
})

///////////////////////operation in port 8082/////////////////////////////
app.listen('8082')
console.log('Please go to "http://localhost:8082/scrape"');
exports = module.exports = app;





