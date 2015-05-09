var eventStore = require('./store');

eventStore.saveEvent({
  title: 'Test',
  picture: 'Pic',
  date: Date()
}, function(err){
  if(!err)
    console.log('success');
    else    
    console.log(err);
});
