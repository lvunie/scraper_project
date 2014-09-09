# WPIC WebScraper

WPIC WebScraper is a simple program  for scraping the entire contents of "Web Presence In China" with organized form.

This program is develop in Ubuntu Kylin 14.01.1 operation system write in nodejs and JSON.

## Installation:

Download source from [nodejs.org/download/] with newest version.

Node.js needs a few things to complie so make sure they are installed.
`````````````````````````````
$ sudo apt-get update
$ sudo apt-get install build-essential openssl libssl-dev pkg-config
`````````````````````````````
Get link for larest tarball from Source Code. Download and extract it.
then with the example from source node-v0.10.31

`````````````````````````````
$ tar -xzf node-v0.10.31.tar.gz
$ cd node-v0.10.31/
$ sudo ./configure
$ sudo make
$ sudo make install
`````````````````````````````````
 Also need to install npm
.........
$ npm install npm-install
.........

Now start to install scraperjs and expressjs
````````````````````````````````
$ npm install scraperjs
$ npm install express
````````````````````````````````

After installation above, you can download WPIC_scraper_v4 to try this program:
When run this program you need to run URL_reader.js first to get whole URLs, then run scraper.js to get all JSON file.
`````````````````````````````````
$ nodejs URL_reader.js
$ nodejs scraper.js
`````````````````````````````````

(to be finished)

## Usage:

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

####Problems lists from different version(9_9):

######For WPIC_Scraper_v2:
  1. It only can write the first URL to JSON
  2. local Port is not necessary to be used

######For WPIC_Scraper_v3:
  1. json is a global variable in scraper.js and it is an array used to store URL scraped content, it is assigned in scrape function but in write function, so nothing write in JSON file.


######Commom problem:
1. What should the name for each JSON file that is make sence and easy to match with correspond URLs.
2. In content of each JSON, there is lot of necessary symbol and need to be removed.

####Problems lists from different version(9_10):

######For WPIC_Scraper_v4
There is a new version for v4 and this version almost fix all problem and functionality runs well. But still with common problem:


######Commom problem:
1. What should the name for each JSON file that is make sence and easy to match with correspond URLs.
2. In content of each JSON, there is lot of necessary symbol and need to be removed.





















