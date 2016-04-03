import { Router } from 'express';
import rp from 'request-promise';
import cheerio from 'cheerio';
import request from 'request';
import URL from 'url-parse';
import Page from '../models/page';

const router = new Router();

function crawl(baseUrl, res) {

  // var baseUrl = new URL(baseUrl);
  // baseUrl = baseUrl.protocol + "//" + baseUrl.hostname;
  if (baseUrl[baseUrl.length - 1] === "/") baseUrl = baseUrl.slice(0,baseUrl.length-1)

  var MAX_PAGES_TO_VISIT = 200;

  var pagesVisited = {};
  var numPagesVisited = 0;
  var pagesToVisit = [];

  function crawlPage(page) {
    console.log("Crawling page " + page);
    if (numPagesVisited >= MAX_PAGES_TO_VISIT) {
      console.log("Reached max limit of number of pages to visit.");
      return;
    }
    if (pagesVisited[page]) return 

    pagesVisited[page] = true
    numPagesVisited++
    // New page we haven't visited
    rp(page).then(function(body) {
      // Parse the document body
      var $ = cheerio.load(body);

      //jquery get all hyperlinks
      var links = $('a'); 

      var allLinks = []

      $(links).each(function(i, link){
        let url = $(link).attr('href')
        if (url.search(/\.\//) > -1) { 
          url = url.slice(url.indexOf('/'))
        }
        if (url[0] !== '/') url = '/' + url
        allLinks.push(url);
      });

      // filter external/bad links
      var relativeLinks = allLinks.filter(function (link) {
          return !(link.search('http') > -1 || link.search('#') > -1)
      })

      relativeLinks.forEach(function(link) {
          crawlPage(baseUrl + link)
      })

      var text = $('body *').contents().map(function() {
        return (this.type === 'text') ? $(this).text() + ' ' : '';
      }).get().join('');

      var title = $('title').text();

        /// Then store in db
      Page.create({
          url: page,
          title: title,
          text: text
        })
        .then(function(site) {
        })
    }).catch(function () {
      console.log(404)
    });
  }

  crawlPage(baseUrl);
  res.send("Done!!!")

}


export function crawlSite(req, res) {
  crawl(req.body.url, res)
}

export function getPages(req, res) {
  Page.find()
    .then(function(pages) {
      res.json(pages)
    })
}

export function search(req, res) {
  if (req.params.query === 'undefined') return res.json({})
  Page
    .find({ $text: { $search: req.params.query } }, { score: { $meta: "textScore" } })
    .sort({ score: { $meta: 'textScore' } })
    .then(function(results) {
      res.json({results})
    })
    .then(null, console.log)
}

export default router;
