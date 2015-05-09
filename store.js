var mongoose = require('mongoose')
    , url = "mongodb://127.0.0.1:27017/timeline"
    , db = mongoose.connect(url)
    , Schema = mongoose.Schema
    , Event = require("./models/event").init(Schema, mongoose);

module.exports = {
      saveEvent: function(data, callback){

        var event = new Event({
          title: data.title,
          date: data.date,
          picture: data.picture
        });

        event.save(function(err){
            callback(err);
        });
      }
};
