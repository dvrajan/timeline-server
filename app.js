var restify = require('restify')
    , store = require('./store')
    , noOfPostsPerPage = 10;

var server = restify.createServer({
  name: 'timeline',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

server.get('/events', function (req, res, next) {
  store.getEvents(function(events){
    var response = {
      data: events
    }
    res.send(response);

  });
  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
