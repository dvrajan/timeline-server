var express = require('express')
    , app = express()
    , store = require('./store')
    , _ = require('./lib/lodash');


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

app.use(express.static(__dirname + '/public'));
app.get('/events', function (req, res) {
  store.getEvents(function(events){
    var filteredEvents = filterEvents(events);
    var response = {
      data: filteredEvents
    }
    res.send(response);
  });
});


var server = app.listen(80, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Timeline app listening at http://%s:%s', host, port);

});
