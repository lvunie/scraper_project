var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var scraperjs = require('scraperjs');
var app     = express();
var S = require('string');
    readline = require('readline');

var json = { address : ""};

var rd = readline.createInterface({
    input: fs.createReadStream('URL_output.json'),
    output: process.stdout,
    terminal: false
});

var address;

rd.on('line', function(line) {
    
    var vertify = S(line).include('http');
	
    if(vertify){
	console.log(S(line).between('"', '"').s);
	json.address = line;
    }
    
    console.log('------------------------------------');
});

/////////////////////////////////////////////////////////////////
app.get('/scrape', function(req, res){
	
	// vertify given address
	url = '// http://www.web-presence-in-china.com/';
	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
		}
 
	// write to JSON file
        fs.writeFile('URL_output123.json', JSON.stringify(json, null, 4), function(err){

        	console.log('File successfully written! - Check your project directory for the URL_output.json file');

        })


        res.send('Check your console!')
	})
})

///////////////////////operation in port 8082/////////////////////////////
app.listen('8082')
console.log('Please go to "http://localhost:8082/scrape"');
exports = module.exports = app;




