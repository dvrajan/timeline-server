var restify = require('restify')
    , store = require('./store')
    , _ = require('./lib/lodash')
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

function filterEvents(events){
  var filteredEvents = [];
  var d = new Date(events[0].date);
  var res = [];
  var trial = 0;
  do{
    res = _.filter(events, _.matches({date: d}));
    filteredEvents = filteredEvents.concat(threeRandomValues(res));
    d.setDate(d.getDate() - 1);
    if(res.length == 0){
      trial ++;
    }
  } while(trial < 10);


  return filteredEvents;
}

function threeRandomValues(arr){
  var res = [];
  for(var i=0; i<3 ; i++){
    var value = Math.floor((Math.random() * arr.length) + 1);
    if(res.indexOf(arr[value]) < 0 && arr[value] != null){
        res.push(arr[value]);
    }
  }
  return res;
}

server.get('/events', function (req, res, next) {
  store.getEvents(function(events){
    var filteredEvents = filterEvents(events);
    var response = {
      data: filteredEvents
    }
    res.send(response);
  });
  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
