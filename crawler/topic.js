var cheerio = require('cheerio')
    , _ = require('../lib/lodash')
    , request = require('request')
    , url = "http://techcrunch.com/topic/"
    , store = require('../store');

function getTopics(){
  request.get(url, function(error, response, body){
    if(!error && response.statusCode == 200){
       var $ = cheerio.load(body);
       var topics = $("body").find("div.topic-archive-links-list p.topic-alpha-column a");
       var t = [];
       topics.each(function(){
          t.push($(this).text())
       });
       store.saveTopics(t);
    } else {
       console.log('Fetch failed');
    }
  });
}


getTopics();
