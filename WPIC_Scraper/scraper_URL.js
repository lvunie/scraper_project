var fs = require('fs');
var express = require('express');
var request = require('request');
var S         = require('string');

var scraperjs = require('scraperjs');
    router = new scraperjs.Router();

var web_address;
var links;
var json = { web_address : ""};

var menu;
var menu_size = 0;
var menu_tag = { 
	menus : "",
	SubURLs: "",
};

var menu_size = 0;
	

router
    .otherwise(function(url) {
    console.log("Url '"+url+"' couldn't be routed.");
});

var path = {};

router.on('http://www.web-presence-in-china.com/')
      // Get all subURLs from a given address
      .createStatic()
      .scrape(function($) {
          return $("#navbar-collapse-grid a").map(function() {
              return $(this).attr("href");
          }).get();
      }, function(links, utils) {
        path[utils.params.id] = links;
	json.web_address = links;

	writeToJson('URL_List.json',links);
      })

	// Get menu title
	.scrape(function($) {
     		   	    return $(".dropdown-toggle").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(string) {
   	
			menu_size = string.length;
			
			menus = [];
			for(var i = 0; i < menu_size ; i++)
			{
				new_item = S(string[i]).trim().s;
				MenuFrame();
				menus[i].menu = new_item;
			}

		menu_tag.menus = menus;
		
	})
		// Get tab class
		.scrape(function($) {
     			   	    return $(".dropdown-toggle").map(function() {
    			        	return $(this).html();
     			   	}).get();
    				}, function(text) {
				
				var text_size = text.length;
				for(var i = 0; i<text_size; i++)
				{
					var newString = S(text[i]).trim().s;
					newString = S(newString).collapseWhitespace().s;
					var newString2 = S(newString).between('"', '"').s
					menus[i].b_class = newString2;
				}
		menu_tag.menus = menus;
	})

		// Get Menu URL
		.scrape(function($) {
     			   	    return $(".dropdown-toggle").map(function() {
    			        	return $(this).attr("href");
     			   	}).get();
    				}, function(menu_href) {
	
				for(var i = 0; i < menu_size; i++)
				{
					menus[i].menu_url = menu_href[i];
				}

	})
		// Get ........
		.scrape(function($) {
     		   	    return $(".container.dropdown-menu a").map(function() {
    		        	//return $(this).text();
				return $(this).attr("href")
     		   	}).get();
    			}, function(text) {
			
			var text_index =  text.length;

			console.log(text_index);				
			//console.log(string);

		var new_text = S(text).trim().s; 
		    new_text = S(new_text).lines();
		
		menu_tag.SubURLs = text;

		fs.writeFile("new_output.json", JSON.stringify(new_text, null, 4), function(err){
  
        	})
	})

	
	// Get submenu title
		.scrape(function($) {
     		   	    return $(".container.dropdown-menu").map(function() {
    		        	return $(this).text();
     		   	}).get();
    			}, function(string) {
				var string_size =  string.length;

				for(var i = 0; i < string_size; i++)
				{
					var new_string = S(string[i]).trim().s;
					new_string = S(new_string).lines();

					var index = new_string.length;

					var newArray = [];
					for(var j = 0; j < index; j++)
					{
						new_string[j] = S(new_string[j]).trim().s;
						if(new_string[j] != ""){
							newArray.push(new_string[j]);
						}
					}
					
					menus[i].sub_menu = newArray;
				}
			
			menu_tag.menus = menus;
			writeToJson('menu.json',menu_tag);
	})

	//$(".dropdown>a").eq(0).siblings()

router.route("http://www.web-presence-in-china.com/", function() {
    console.log("URLs gotten!");
    
});


function writeToJson(fileName,links){

        fs.writeFile(fileName, JSON.stringify(links, null, 4), function(err){
  
        })	
}


function MenuFrame()
{
	menus.push({ 
                    "menu": "",
		    "b_class": "",
		    "menu_url": "",
		    "sub_menu": "",
     	});
}



