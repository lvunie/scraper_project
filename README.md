# WPIC WebScraper

WPIC WebScraper is a simple program  for scraping the entire contents of "Web Presence In China" with organized form.

This program is develop in Ubuntu Kylin 14.01.1 operation system write in nodejs and JSON.

## Installation:

Download source from nodejs.org/download/ with newest version.

.........

.........

(to be finished)


## Problem lists:

####So far, the program can finish the following functionality:

1. Read one URL and get its all subURLs
  1. URL_reader.js read an original URL and get all its subURLS
  2. URL_reader.js sort those subURLS and write it to URL_output.son
2. Scrape content from a given URL
  1. scraper.js read from URL_output.json to get all subURLs
  2. scraper.js can scrape all content from given URL and sort those text from different html tag,like header
tag, paragraph tag and list tag.... 
  3. scraper.js can write scraped content to a JSON file

####Follow problems lists from different version:

######For WPIC_Scraper_v2:
  1. It only can write the first URL to JSON
  2. local Port is not necessary to be used

######For WPIC_Scraper_v3:
  1. json is a global variable in scraper.js and it is an array used to store URL scraped content, it is assigned in scrape function but in write function, so nothing write in JSON file.


######Commom problem:
1. What should the name for each JSON file that is make sence and easy to match with correspond URLs.
2. In content of each JSON, there is lot of necessary symbol and need to be removed.






















