var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var scraperjs = require('scraperjs');
var app     = express();


var p_tag, list_tag, heading_tag;
var json = { p_tag : "", list_tag : "", heading_tag : ""};


//open JOSN file to get URL for scraping
var file = __dirname + '/URL_output.json';

var list = file["web_address"];
var sub_URLs;

fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }

  data = JSON.parse(data);
  sub_URLs = data;
  //console.dir(data);
  //console.dir(sub_URLs);
});


/////////////////////////Scrape content from given URL///////////////////////////////
//content include all text in between <p>, <li>, and all header tag(from <h1> to <h6>)	



// Write content to JSON file

app.get('/scrape', function(req, res){
	
	url = '// http://www.web-presence-in-china.com/';

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
		}
 

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

        	console.log('File successfully written! - Check your project directory for the output.json file');

        })

        res.send('Check your console!')
	})
})

////////////////////////////port 8081//////////////////////////////////////
app.listen('8081')
console.log('V_1.0 Please go to "http://localhost:8081/scrape"');
exports = module.exports = app;





