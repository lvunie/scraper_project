# WPIC WebScraper

WPIC WebScraper is a program  for scraping the target contents from "Web Presence In China" and save them with organized form.

This program is developed under Ubuntu Kylin 14.01.1 operation system.

## Installation:

Download source from [nodejs.org/download/] with newest version.

Node.js is needed for compling so make sure they are installed.
The following guide is for ubuntu OS installation:

`````````````````````````````
$ sudo apt-get update
$ sudo apt-get install build-essential openssl libssl-dev pkg-config
`````````````````````````````
Get link for larest tarball from Source Code. Download and extract it.
Then with the example from source node-v0.10.31

`````````````````````````````
$ tar -xzf node-v0.10.31.tar.gz
$ cd node-v0.10.31/
$ sudo ./configure
$ sudo make
$ sudo make install
`````````````````````````````````
 Also need to install npm
````````````````````````````````
$ npm install npm-install
``````````````````````````````````

Now start to install scraperjs, expressjs or any other plugin that need for running the progrom, all source can be found in "node_modules" directory

````````````````````````````````
$ npm install scraperjs
$ npm install express
.......
````````````````````````````````

After installation above, you can download WPIC_scraper to try this program:
Before run this program you need to run URL_reader.js first to get whole URLs, then run scraper.js and scraper_category.js to get all JSON and markdown file.
`````````````````````````````````
$ nodejs URL_reader.js
$ nodejs scraper.js
$ nodejs scraper_category.js
`````````````````````````````````

After running the command above, you already get all output JSON file and markdown file, as require, we also need to merge all json file as one. All the merge function can be finish by using "grunt"

(for more detail can click: https://github.com/gruntjs/grunt-contrib-concat )

`````````````````````````````````
$ npm install grunt-contrib-concat --save-dev
`````````````````````````````````

Then go to contrib directory, run:
`````````````````````````````````
$ grunt concat
`````````````````````````````````

You already merge all JSON file in one!

## Usage:


The Scraper program can used for following functionality, include:

1. Get all sub URLs from a given index URL.
2. Scrape target content and sort them in organized form(.md).
3. Download all target picture mark their path to markdown.
4. Generate JSON files to indicate the information of content store.
5. Merge all JSON output files as one final output.


## Summary for the scraper project

The purpose of this project is to scrape targrt content and store them in organized form from WPIC site. The targrt content incluces in two different type of pages:

1. **Service option page(Technology, Marketing, Consulting)**
There are three different category for service option, the target content is all detail business service in each option and their icon. We defined those type of pages as **page_two** page.

2. **Service detail page(more specify service detail, like "chinese-brand-development")**
Under each service option, there are many more specify business service for each category. The target content from service detail page is the text from "Overview", "Impact" section and picture from "process". Also each detail page have its own related link to other detail pages, we need to store those information for each service page. We defined those type of pages as **page_three** page.

####The Scraper program detail:
The program consists of three mian javascript files as following:

**1. URL_reader.js:**  reads a given URL to find out all its subURLs, then write them to "URL_Output.json".   

**2. scraper_category.js:** output the information for three types of category item and all their own services title and icons. Write data to category_output/ sort by category title.

**3. scraper.js:**   

"output":   a folder to store JSON for each **page_three** output.  
"markdown": a folder to store text for *Overview*, *Impact* in markdown(md) format from each **page_three** , download and save picture for "process" section. and also save all *related* icon for each **page_three** URL.       
"related":  download and save all icon for **page_two**.

*The program can detect new service items and left-tab item as adding more content in it. But might need to add new function for scrape new target context.







