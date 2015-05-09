function init(Schema, mongoose){
      var schema = new Schema({
          urls: [String]
      });

      return mongoose.model('article', schema);
}

module.exports.init = init;
