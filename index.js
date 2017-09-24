//const express = require("express")
const jsonfile = require("jsonfile");
const request = require("request")
const cheerio = require("cheerio")
// const url = "https://fr.wikiquote.org/wiki/Kaamelott";
const url = "http://localhost:7000/Kaamelott%20-%20Wikiquote%2C%20le%20recueil%20de%20citations%20libres.htm";

function scrappy(url, name) {
  request(
    url,
    (error, response, html) => {
      if(!error) {
        const $ = cheerio.load(html);

        const citations = [];
        $('.citation')
          .each(
            function (i, elem) {
              citations.push($(this).text());
            }
          );

          jsonfile.writeFileSync(`../fb-anonify/data/kaamelott/${name}.json`, citations);
      } else {
        console.log("ERROR => ", error);
      }
    }
  )
}

require('./kaamelott.json').forEach(
  (toScrap) => {
    scrappy(toScrap.url, toScrap.name);
  }
)
