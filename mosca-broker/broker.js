// ######################################################
//                 Mqtt Broker Settings
// ######################################################
var mosca = require('mosca');

// var ascoltatore = {
//     //using ascoltatore
//     type: 'mongo',
//     url: 'mongodb+srv://Niccos:Reitalia88@cluster0-9rqfj.mongodb.net/mqtt?retryWrites=true',
//     pubsubCollection: 'ascoltatori',
//     mongo: {}
//   };
  
//   var settings = {
//     port: 1883,
//     backend: ascoltatore
//   };
// ######################################################
//                 Not required for db
// ######################################################


// ######################################################
//                Mosca Server Power up
// ######################################################
 
  var server = new mosca.Server(settings);
  server.on('ready', setup); 
  var db = new mosca.persistence.Mongo({
    url: 'mongodb+srv://Niccos:Reitalia88@cluster0-9rqfj.mongodb.net/mqtt?retryWrites=true'
  }
  );
  db.wire(server);


  // fired when the mqtt server is ready
  function setup() {
    console.log('Mosca server is up and running');
  }

module.exports = {
    server: server
}
