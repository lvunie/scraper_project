var scraperjs = require('scraperjs');

//http://www.web-presence-in-china.com/about-us
//https://news.ycombinator.com/

//var json = { p_tag : }


scraperjs.StaticScraper.create('http://www.web-presence-in-china.com/about-us')
    .scrape(function($) {
        return $("p").map(function() {
            return $(this).text();
        }).get();
    }, function(news) {
        console.log(news);
    })

//return $(".title a").map(function() {
