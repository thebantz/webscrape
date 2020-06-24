const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

rp(url)
  .then(function (html) {
    // Wikipedia's code altered. Update if it changes again in the future. The mapping is based on 6/24/20
    const wikiUrls = [];
    for (let i = 8; i < 52; i++) {
      wikiUrls.push($('b > a', html)[i].attribs.href);
    }
    console.log(wikiUrls);
  })
  .catch(function (err) {
    //handle error
  });