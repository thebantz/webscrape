const cheerio = require('cheerio');
const rp = require('request-promise');
let jsonframe = require('jsonframe-cheerio');

// webscrape a live webpage
let rawHTML = 'https://www.airbnb.com/rooms/10469182?source_impression_id=p3_1593038560_GQLlHpGfpPzd2H84&guests=1&adults=1';

rp(rawHTML)
  .then(function (rawHTML) {
    // Wikipedia's code altered. Update if it changes again in the future. The mapping is based on 6/24/20
    // const wikiUrls = [];
    // for (let i = 8; i < 52; i++) {
    //   wikiUrls.push($('b > a', html)[i].attribs.href);
    // }
    // console.log(wikiUrls);


    /////////////////////////////////////
    let $ = cheerio.load(rawHTML);

    jsonframe($) // initializing the plugin

    let details = {
      "listing": "._14i3z6h",
    }

    console.log($('body').scrape(details, { string: true }))

    ///////////////////////////////////

  })
  .catch(function (err) {
    //handle error
  });


