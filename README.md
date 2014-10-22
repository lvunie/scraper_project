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

1. **Category page(Technology, Marketing, Consulting)**  
There are three different category for service option, the target content is all detail business service in each categoty and their icon. We defined those type of pages as **page_two** page.

2. **Service option page(more specify service detail, like "chinese-brand-development")**  
Under each category page, there are many more specify business service for each category. The target content from service detail page is the text from "Overview", "Impact" section and picture from "process". Also each detail page have its own related link to other detail pages, we need to store those information for each service page. We defined those type of pages as **page_three** page.

####The Scraper program detail:
The program consists of three mian javascript files as following:

1. **URL_reader.js:**  
Reads a given URL to find out all its subURLs, then write them to "URL_Output.json".   

2. **scraper_category.js:**  
Output the information for three types of category item and all their own services title and icons. Write data to category_output/ sort by category title.

3. **scraper.js:**   
"output":   a folder to store JSON for each "page_three" output.  
"markdown": a folder to store text for *Overview*, *Impact* in markdown(md) format from each "page_three" , download and save picture for "process" section. and also save all *related* icon for each *page_three* URL.       
"related":  download and save all icon for "page_two".

*The program can detect new service items and left-tab item as adding more content in it. But might need to add new function for scrape new target context.

####Example for JSON output for a "category page(page_two)":

```````````````````````````````
{
    "filename": "marketing",
    "data": {
        "title": "Marketing ",
        "description": "Drive China Sales with the Proven Performance Leaders",
        "filename": "marketing",
        "content": {
            "items": [
                {
                    "heading": "Chinese Brand Development",
                    "two_text": "Positioning and Branding for the Chinese Market",
                    "link": "http://www.web-presence-in-china.com/chinese-brand-development",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/brand-development-green.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/brand-development-white.png"
                },
                {
                    "heading": "Graphic Design Production",
                    "two_text": "Your Vision, Your Message – Localized",
                    "link": "http://www.web-presence-in-china.com/graphic-design-production",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/graphic-design.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/graphic-design-white.png"
                },
                {
                    "heading": "Market Analysis",
                    "two_text": "Knowledge Geared to Winning Market Share",
                    "link": "http://www.web-presence-in-china.com/market-analysis",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/marketing-analysis.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/marketing-analysis-white.png"
                },
                {
                    "heading": "Mobile Advertising",
                    "two_text": "A New Channel for a Growing Segment",
                    "link": "http://www.web-presence-in-china.com/mobile-advertising",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/mobile-ads.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/mobile-ads-white.png"
                },
                {
                    "heading": "Pay-Per-Click Advertising (PPC)",
                    "two_text": "Highest Conversion Rates at the Lowest Cost Per Conversion",
                    "link": "http://www.web-presence-in-china.com/ppc",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/PPC1.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/PPC1-white.png"
                },
                {
                    "heading": "Search Engine Optimization (SEO)",
                    "two_text": "Quick Discovery and High Trust through Organic Ranking",
                    "link": "http://www.web-presence-in-china.com/chinese-seo",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/SEO.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/SEO-white.png"
                },
                {
                    "heading": "Website Analytics",
                    "two_text": "Accessible Chinese Traffic Insights You Can Trust",
                    "link": "http://www.web-presence-in-china.com/website-analytics",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/web-analytics.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/web-analytics-white.png"
                },
                {
                    "heading": "Campaign Tracking Dashboards",
                    "two_text": "Reliable Feedback on Chinese Media, Campaigns, & Brand Positions",
                    "link": "http://www.web-presence-in-china.com/campaign-tracking-dashboards",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/campaign-tracking-dashboards.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/campaign-tracking-dashboards2.png"
                },
                {
                    "heading": "eCommerce",
                    "two_text": "Seamless Sales in the World’s Largest Online Economy",
                    "link": "http://www.web-presence-in-china.com/ecommerce",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/ecommerce.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/ecommerce-white.png"
                },
                {
                    "heading": "Content Localization & Translations Production",
                    "two_text": "Translate for Accuracy and Impact",
                    "link": "http://www.web-presence-in-china.com/content-localization-translations-production",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/content-localization.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/content-localization-white%27.png"
                },
                {
                    "heading": "Display Advertising",
                    "two_text": "For a Complete Performance Marketing Campaign",
                    "link": "http://www.web-presence-in-china.com/display-advertising",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/display-advertising.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/display-advertising-white.png"
                },
                {
                    "heading": "Content Marketing",
                    "two_text": "Targeted Platforms for Targeted Consumers",
                    "link": "http://www.web-presence-in-china.com/content-marketing",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/icon-24a.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/icon-24.png"
                },
                {
                    "heading": "Direct Marketing",
                    "two_text": "Traditional Messaging is Still a Reliable Channel",
                    "link": "http://www.web-presence-in-china.com/direct-marketing",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/direct-marketing.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/direct-marketing-white.png"
                },
                {
                    "heading": "Channel Strategy",
                    "two_text": "Deconstructing Silos for an Omni-Channel Market",
                    "link": "http://www.web-presence-in-china.com/channel-strategy",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/channel-strategy.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/channel-strategy-white.png"
                },
                {
                    "heading": "Digital Public Relations",
                    "two_text": "Broad Reach with Next Steps",
                    "link": "http://www.web-presence-in-china.com/digital-public-relations",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/digital-PR.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/digital-PR-white.png"
                },
                {
                    "heading": "Campaign Management Dashboards",
                    "two_text": "Transparency Equals Efficiency",
                    "link": "http://www.web-presence-in-china.com/campaign-management-dashboards",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/icon-9898.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/icon-9898A.png"
                },
                {
                    "heading": "Asset Localization",
                    "two_text": "Building a Second Syntax for Your Brand",
                    "link": "http://www.web-presence-in-china.com/asset-localization",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/asset-localization.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/asset-localization-white.png"
                },
                {
                    "heading": "Analytics",
                    "two_text": "Turning Big Data into Market Advantage",
                    "link": "http://www.web-presence-in-china.com/analytics",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/analytics-marketing-green.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/analytics-marketing-white.png"
                }
            ]
        }
    }
}
```````````````````````````````


####Example for JSON output for a "service option page(page_three)":
``````````````````````````````````
{
    "filename": "ppc",
    "data": {
        "title": "Pay-Per-Click Advertising (PPC) ",
        "category": "Marketing",
        "description": "Highest Conversion Rates at the Lowest Cost Per Conversion",
        "filename": "ppc",
        "content": {
            "tab": [
                {
                    "title": "Overview",
                    "markdown": "markdown/ppc/",
                    "href": "#tab1",
                    "class": ""
                },
                {
                    "title": "Process",
                    "markdown": "markdown/ppc/",
                    "href": "#tab2",
                    "class": "active"
                },
                {
                    "title": "Impact",
                    "markdown": "markdown/ppc/",
                    "href": "#tab3",
                    "class": ""
                },
                {
                    "title": "Intelligence",
                    "markdown": "markdown/ppc/",
                    "href": "#tab4",
                    "class": ""
                }
            ],
            "related": [
                {
                    "title": "Campaign Management Dashboards",
                    "icon": "http://www.web-presence-in-china.com/sites/default/files/icon-9898.png",
                    "url": "http://www.web-presence-in-china.com/campaign-management-dashboards"
                },
                {
                    "title": "Display Advertising",
                    "icon": "http://www.web-presence-in-china.com/sites/default/files/display-advertising.png",
                    "url": "http://www.web-presence-in-china.com/display-advertising"
                },
                {
                    "title": "Search Engine Optimization (SEO)",
                    "icon": "http://www.web-presence-in-china.com/sites/default/files/SEO.png",
                    "url": "http://www.web-presence-in-china.com/chinese-seo"
                },
                {
                    "title": "Website Analytics",
                    "icon": "http://www.web-presence-in-china.com/sites/default/files/web-analytics.png",
                    "url": "http://www.web-presence-in-china.com/website-analytics"
                }
            ]
        }
    }
}
``````````````````````````````````





