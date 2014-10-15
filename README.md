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



## 9-11:

JSON file for store scraped content is required with an specific form like this:

`````````````````````````````````````````````````````````````````````````````````
{
  "pages":{
    "two":[
      {
        "filename" : "marketing",
        "data" : {
          "title" : "Marketing",
          "description" : "........"
        }
      }
    ],
    "three":[
      {
        "filename" : "chinese-brand-development",
        "catagory" : "Marketing",
        "data" : {
          "title" : "Chinese Brand Development",
          "description" : "Chinese Brand Development",
          "content" : "......"
        }
      }
    ]
  }
}
```````````````````````````````````````````````````````````````````````````````````````

####For my example, the ouput json is like this:

```````````````````````````````````````````````````````````````````````````````````````
{
    "web_filename": "chinese-brand-development",
    "catagory": "Marketing",
    "data": {
        "title": "Chinese Brand Development ",
        "description": "Positioning and Branding for the Chinese Market,Positioning and Branding for the Chinese Market",
        "content": "............."
    }
}
```````````````````````````````````````````````````````````````````````````````````````

So the problem is following:

1. json format is not as require and need to be fixed.
2. Cannot get correct content to "content" item.
4. In "description" item, content repeat.
5. Cannot separate different index pages from URL.


## 9-12 Problem list:

New requirement:

`````````````````````````````````````````````````````````````````````````````````````````````````
{
  "pages": {
    "two": [{
      "filename": "marketing",
      "data": {
        "title": "Marketing",
        "description": "Drive China Sales with the Proven Performance Leaders",
        "content": {
          "items": [{
            "cate-heading": "Chinese Brand Development",
            "text": "Positioning and Branding for the Chinese Market",
            "link": "http://web-presence-in-china.com/chinese-brand-development",
            "img-slide": "http://web-presence-in-china.com/sites/default/files/brand-development-green.png",
            "img-white": "http://web-presence-in-china.com/sites/default/files/brand-development-white.png",
          }, {
            "cate-heading": "Graphic Design Production",
            "text": "Your Vision, Your Message – Localized",
            "link": "http://web-presence-in-china.com/graphic-design-production",
            "img-slide": "http://web-presence-in-china.com/sites/default/files/graphic-design.png",
            "img-white": "http://web-presence-in-china.com/sites/default/files/graphic-design-white.png",
          }]
        }
      }
    }],
    "three": [{
      "filename": "chinese-brand-development",
      "data": {
        "title": "Chinese Brand Development",
        "category": "Marketing",
        "description": "Positioning and Branding for the Chinese Market",
        "content": {
          "tabs": [{
            "title": "Overview",
            "markdown": "/path/to/markdown.md"
          }, {
            "title": "Process",
            "markdown": "/path/to/markdown.md"
          }, {
            "title": "Impact",
            "markdown": "/path/to/markdown.md"
          }],
          "related": [{
            "title": "Logistics & Fulfillment",
            "icon": "http://web-presence-in-china.com/sites/default/files/logistics-%26-fulfillment.png"
          }, {
            "title": "Microsoft Dynamics",
            "icon": "http://web-presence-in-china.com/sites/default/files/microsoft-dynamics.png"
          }]
        }
      }
    }]
  }
}
`````````````````````````````````````````````````````````````````````````````````````````````````

####My sample:
````````````````````````````````
{
    "filename": "chinese-brand-development",
    "data": {
        "title": "Chinese Brand Development ",
        "category": "Marketing",
        "description": "Positioning and Branding for the Chinese Market",
        "content": {
            "tab": [
                {
                    "title": "Overview",
                    "markdown": "Brand equity, as we used to know it, has plummeted in China as much as in the West. The Information Age enables consumers to compare products and services quickly and objectively, leaving little need to rely on a brand’s reputation. Therefore, branding is no longer an exercise in telling stories, or “telling” anything else, for that matter. Rather, it is an exercise in showing consumers value by engaging them along every phase of the sales journey., ,The Internet has created both this new model of branding, as well as the means by which to implement it. Digital marketing channels are growing integrated, so that performance marketing, social media, content marketing, and their variations can be rapidly deployed to work together in creating a new, vibrant brand experience for Chinese consumers., ,WPIC has developed a vetted process that gears western brands for quick, sustainable, revenue-generating traction in the China market. We believe in exploiting Chinese consumers’ perceived high quality and authenticity of western products and services, by providing them an on-brand experience customized for China’s unique Internet ecosystem. WPIC has capabilities for all aspects of such China brand development in its wheelhouse – technical, creative, and commercial. Your brand journey will be planned and executed with comprehensive measurement at all phases, for unrivaled adaptability, leading to most efficient market penetration., ,Get in touch now to discuss launching or revitalizing your brand in China with WPIC, and qualify for a free ten hours of customized consultation."
                },
                {
                    "title": "Process",
                    "markdown": ""
                },
                {
                    "title": "Impact",
                    "markdown": "A Canadian real estate marketing company wanted to establish a brand to attract Chinese overseas investors, and match them with Canadian agents and developers. The brand needed to convey luxury, reliability, and expertise. Furthermore, the brand needed to be launched across a broad yet targeted section of the Chinese Internet, in order to gain relatively rapid traction and recognition., ,Tactics:,Development of brand kit: logo, palette, fonts, Mandarin copy guidelinesCreation of brand media assets: videos, press releases, photo sets, introductory articlesDevelopment of a branded website, hosted in China, integrated for form fill and database buildingDigital PR plan, including steps for conversion and trackingCreation of Mandarin physical promotion assets: business cards, brochures, and displays, ,Results:,The marketing company was able to show Chinese engagement metrics, in the form of conversions, emails, and online reach, to secure over $250,000 worth of property advertising on the Chinese site within three months of launch."
                }
            ],
            "related": [
                {
                    "title": "Asset Localization ",
                    "icon": ""
                },
                {
                    "title": "Content Localization & Translations Production",
                    "icon": ""
                },
                {
                    "title": "Content Marketing",
                    "icon": ""
                },
                {
                    "title": "Digital Public Relations",
                    "icon": ""
                }
            ]
        }
    }
}
```````````````````````````````

For WPIC_Scraper_v5, the ouput JSON file is almost the same as the requirement need but still cannot scrape pictures and with following problem:

1. Cannot write all content to one JSON file
2. Distinguish category page and other detail page
3. Create markdown file for each URL content 



## 9-25:

Here is the output sample for Scraper so far:

####For JSON output for each type two URL(category pages): 

````````````````````````````````
{
    "filename": "marketing",
    "data": {
        "title": "Marketing ",
        "description": "Drive China Sales with the Proven Performance Leaders",
        "filename": "marketing",
        "content": {
            "items": [
                {
                    "cate_heading": "Chinese Brand Development",
                    "two_text": "Positioning and Branding for the Chinese Market",
                    "link": "http://www.web-presence-in-china.com/chinese-brand-development",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/brand-development-green.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/brand-development-white.png"
                },
                {
                    "cate_heading": "Graphic Design Production",
                    "two_text": "Your Vision, Your Message – Localized",
                    "link": "http://www.web-presence-in-china.com/graphic-design-production",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/graphic-design.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/graphic-design-white.png"
                },
                {
                    "cate_heading": "Market Analysis",
                    "two_text": "Knowledge Geared to Winning Market Share",
                    "link": "http://www.web-presence-in-china.com/market-analysis",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/marketing-analysis.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/marketing-analysis-white.png"
                },
                {
                    "cate_heading": "Mobile Advertising",
                    "two_text": "A New Channel for a Growing Segment",
                    "link": "http://www.web-presence-in-china.com/mobile-advertising",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/mobile-ads.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/mobile-ads-white.png"
                },
                {
                    "cate_heading": "Pay-Per-Click Advertising (PPC)",
                    "two_text": "Highest Conversion Rates at the Lowest Cost Per Conversion",
                    "link": "http://www.web-presence-in-china.com/ppc",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/PPC1.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/PPC1-white.png"
                },
                {
                    "cate_heading": "Search Engine Optimization (SEO)",
                    "two_text": "Quick Discovery and High Trust through Organic Ranking",
                    "link": "http://www.web-presence-in-china.com/chinese-seo",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/SEO.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/SEO-white.png"
                },
                {
                    "cate_heading": "Website Analytics",
                    "two_text": "Accessible Chinese Traffic Insights You Can Trust",
                    "link": "http://www.web-presence-in-china.com/website-analytics",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/web-analytics.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/web-analytics-white.png"
                },
                {
                    "cate_heading": "Campaign Tracking Dashboards",
                    "two_text": "Reliable Feedback on Chinese Media, Campaigns, & Brand Positions",
                    "link": "http://www.web-presence-in-china.com/campaign-tracking-dashboards",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/campaign-tracking-dashboards.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/campaign-tracking-dashboards2.png"
                },
                {
                    "cate_heading": "eCommerce",
                    "two_text": "Seamless Sales in the World’s Largest Online Economy",
                    "link": "http://www.web-presence-in-china.com/ecommerce",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/ecommerce.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/ecommerce-white.png"
                },
                {
                    "cate_heading": "Content Localization & Translations Production",
                    "two_text": "Translate for Accuracy and Impact",
                    "link": "http://www.web-presence-in-china.com/content-localization-translations-production",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/content-localization.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/content-localization-white%27.png"
                },
                {
                    "cate_heading": "Display Advertising",
                    "two_text": "For a Complete Performance Marketing Campaign",
                    "link": "http://www.web-presence-in-china.com/display-advertising",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/display-advertising.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/display-advertising-white.png"
                },
                {
                    "cate_heading": "Content Marketing",
                    "two_text": "Targeted Platforms for Targeted Consumers",
                    "link": "http://www.web-presence-in-china.com/content-marketing",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/icon-24a.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/icon-24.png"
                },
                {
                    "cate_heading": "Direct Marketing",
                    "two_text": "Traditional Messaging is Still a Reliable Channel",
                    "link": "http://www.web-presence-in-china.com/direct-marketing",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/direct-marketing.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/direct-marketing-white.png"
                },
                {
                    "cate_heading": "Channel Strategy",
                    "two_text": "Deconstructing Silos for an Omni-Channel Market",
                    "link": "http://www.web-presence-in-china.com/channel-strategy",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/channel-strategy.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/channel-strategy-white.png"
                },
                {
                    "cate_heading": "Campaign Management Dashboards",
                    "two_text": "Transparency Equals Efficiency",
                    "link": "http://www.web-presence-in-china.com/campaign-management-dashboards",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/icon-9898.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/icon-9898A.png"
                },
                {
                    "cate_heading": "Digital Public Relations",
                    "two_text": "Broad Reach with Next Steps",
                    "link": "http://www.web-presence-in-china.com/digital-public-relations",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/digital-PR.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/digital-PR-white.png"
                },
                {
                    "cate_heading": "Asset Localization",
                    "two_text": "Building a Second Syntax for Your Brand",
                    "link": "http://www.web-presence-in-china.com/asset-localization",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/asset-localization.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/asset-localization-white.png"
                },
                {
                    "cate_heading": "Analytics",
                    "two_text": "Turning Big Data into Market Advantage",
                    "link": "http://www.web-presence-in-china.com/analytics",
                    "img_slide": "http://www.web-presence-in-china.com/sites/default/files/analytics-marketing-green.png",
                    "img_white": "http://www.web-presence-in-china.com/sites/default/files/analytics-marketing-white.png"
                }
            ]
        }
    }
}
````````````````````````````````


####For JSON output for each type three URL(detail pages): 

````````````````````````````````
{
    "filename": "chinese-brand-development",
    "data": {
        "title": "Chinese Brand Development ",
        "category": "Marketing",
        "description": "Positioning and Branding for the Chinese Market",
        "filename": "chinese-brand-development",
        "content": {
            "tab": [
                {
                    "title": "Overview",
                    "markdown": "markdown/chinese-brand-development/"
                },
                {
                    "title": "Process",
                    "markdown": "markdown/chinese-brand-development/"
                },
                {
                    "title": "Impact",
                    "markdown": "markdown/chinese-brand-development/"
                }
            ],
            "related": [
                {
                    "title": "Asset Localization ",
                    "icon": "http://www.web-presence-in-china.com/sites/default/files/asset-localization.png",
                    "url": "http://www.web-presence-in-china.com/asset-localization"
                },
                {
                    "title": "Content Localization & Translations Production",
                    "icon": "http://www.web-presence-in-china.com/sites/default/files/content-localization.png",
                    "url": "http://www.web-presence-in-china.com/content-localization-translations-production"
                },
                {
                    "title": "Content Marketing",
                    "icon": "http://www.web-presence-in-china.com/sites/default/files/icon-24a.png",
                    "url": "http://www.web-presence-in-china.com/content-marketing"
                },
                {
                    "title": "Digital Public Relations",
                    "icon": "http://www.web-presence-in-china.com/sites/default/files/digital-PR.png",
                    "url": "http://www.web-presence-in-china.com/digital-public-relations"
                }
            ]
        }
    }
}

````````````````````````````````



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









