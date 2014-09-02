var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var scraperjs = require('scraperjs');
    router = new scraperjs.Router();

var p_tag, list_tag, heading_tag;
var web_address;

var json = { web_address : ""};
	

router
    .otherwise(function(url) {
    console.log("Url '"+url+"' couldn't be routed.");
});

var path = {};

// http://www.web-presence-in-china.com/
router.on('http://www.web-presence-in-china.com/')
    .createStatic()
    .scrape(function($) {
        return $("a").map(function() {
            return $(this).attr("href");
        }).get();
    }, function(links, utils) {
        path[utils.params.id] = links;
	//console.log(links);
	json.web_address = links;
	//console.log(json.web_address);
    })

router.route("http://www.web-presence-in-china.com/", function() {
    console.log("Got all URL!");
});


app.get('/scrape', function(req, res){
	
	url = '// http://www.web-presence-in-china.com/';

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
		}
 

        fs.writeFile('URL_output.json', JSON.stringify(json, null, 4), function(err){

        	console.log('File successfully written! - Check your project directory for the output.json file');

        })


        res.send('Check your console!')
	})
})

app.listen('8082')
console.log('Please go to "http://localhost:8082/scrape"');
exports = module.exports = app;





