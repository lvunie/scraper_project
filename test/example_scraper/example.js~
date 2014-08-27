var scraperjs = require('scraperjs');

//http://www.web-presence-in-china.com/about-us
//https://news.ycombinator.com/
scraperjs.StaticScraper.create('https://news.ycombinator.com/')
    .scrape(function($) {
        return $(".title a ").map(function() {
            return $(this).text();
        }).get();
    }, function(news) {
        console.log(news);
    })

//return $(".title a").map(function() {
