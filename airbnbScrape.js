const cheerio = require('cheerio');
const rp = require('request-promise');
let jsonframe = require('jsonframe-cheerio');

// webscrape a live webpage
let rawHTML = 'https://www.airbnb.com/rooms/10469182?source_impression_id=p3_1593038560_GQLlHpGfpPzd2H84&guests=1&adults=1';

rp(rawHTML)
  .then(function (rawHTML) {
    let $ = cheerio.load(rawHTML);

    jsonframe($) // initializing the plugin

    let details = {
      "listing": "._14i3z6h",
      "city": "._5twioja",
    }

    console.log($('body').scrape(details, { string: true }))

  })
  .catch(function (err) {
    //handle error
  });