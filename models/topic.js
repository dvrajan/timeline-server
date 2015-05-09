function init(Schema, mongoose){
      var schema = new Schema({
          names: [String]
      });

      return mongoose.model('topic', schema);
}

module.exports.init = init;
