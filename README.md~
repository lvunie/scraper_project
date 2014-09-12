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











