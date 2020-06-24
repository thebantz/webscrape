let cheerio = require('cheerio')

// webscrape a live webpage
let $ = cheerio.load('https://www.airbnb.com/rooms/10469182?source_impression_id=p3_1593038560_GQLlHpGfpPzd2H84&guests=1&adults=1');

let jsonframe = require('jsonframe-cheerio')
jsonframe($) // initializing the plugin

// TODO: work in progress
let details = {
  "listing": "._14i3z6h",
}

console.log($('body').scrape(details, { string: true }))