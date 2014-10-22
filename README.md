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
You already merge all josn in one!

## Usage:



The Scraper program can work well for it's all functionality, include:

1. Get all sub URLs from a given index URL.
2. Scrape content as require and sort them in organized form.
3. Download all require picture mark their path to markdown.
4. Generate JSON, markdown files for each URL and store in organized way.
5. Merge all JSON output files as one final output.



## Summary for scraper project so far(10-12)

The purpose of this project is to scrape targrt content and store them in organized form from WPIC site. The targrt content incluces in two different type of pages:

1. **Service option page(Technology, Marketing, Consulting)**
There are three different category for service option, the target content is all detail business service in each option and their icon. We defined those type of pages as **page_two** page.

2. **Service detail page(more specify service detail, like "chinese-brand-development")**
Under each service option, there are many more specify business service for each category. The target content from service detail page is the text from "Overview", "Impact" section and picture from "process". Also each detail page have its own related link to other detail pages, we need to store those information for each service page. We defined those type of pages as **page_three** page.

####The Scraper program detail:
The program consists of five mian javascript files as following:

**1. URL_reader.js:**  reads a given URL to find out all its subURLs, and write them to "URL_Output.json".   

**2. scraper_marketing.js:** Store each service title and their icon under **marketing** category. Write content to category_output/category_marketing.json. 

**3. scraper_technology.js** Store each service title and their icon under **technology** category. Write conten to category_output/category_technology.json. 

**4. scraper_consulting.js** Store each service title and their icon under **consulting** category. Write conten to category_output/category_consulting.json.

**5. scraper.js:**   

"output":   a folder to store JSON for each **page_three** output.  
"markdown": a folder to store text for *Overview*, *Impact* in markdown(md) format from each **page_three** , download and save picture for "process" section. and also save all *related* icon for each **page_three** URL.       
"related":  download and save all icon for **page_two**.

*the reason why I spearate those category pages because I thought each categroy page may have it own element in funture, and this will be convenience for modification.  
**also there need "grunt" function to merge all json output to one.









