function init(Schema, mongoose){
      var schema = new Schema({
          urls: [String]
      });

      return mongoose.model('topic', schema);
}

module.exports.init = init;
