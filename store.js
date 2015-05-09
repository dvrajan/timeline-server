var mongoose = require('mongoose')
    , url = "mongodb://127.0.0.1:27017/timeline"
    , db = mongoose.connect(url)
    , Schema = mongoose.Schema
    , Event = require("./models/event").init(Schema, mongoose)
    , Topic = require("./models/topic").init(Schema, mongoose)
    , Article = require("./models/article").init(Schema, mongoose);

module.exports = {
      saveEvent: function(data, callback){

        var event = new Event(data);

        event.save(function(err){
            callback(err);
        });
      },

      saveTopics: function(topics){
        var topic = new Topic({urls: topics});
        topic.save(function(err){
          if(err){
            console.log("Error saving topic" + err);
          }
        })

      },

      getTopics: function(callback){
        Topic.find(function(err, topics){
          if(err) {
            console.log("Error getting topics" + err);
            return;
          }

          callback(topics[0]['urls']);
        });
      },

      saveArticles: function(articles){
        var article = new Article({urls: articles});
        article.save(function(err){
          if(err){
            console.log("Error saving article" + err);
          }
        })
      }
};
