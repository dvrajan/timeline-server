function init(Schema, mongoose){
      var schema = new Schema({
          title: String,
          date: Date,
          picture: String,
          description: String,
          url: String
      });

      return mongoose.model('event', schema);
}

module.exports.init = init;
