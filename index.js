'use strict';


var fs = require('fs'),
  path = require('path'),
  http = require('http'),
  mongoose = require("mongoose"),
  mosca = require('mosca'),
  mqttServer = new mosca.Server({});

var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var moscaServer = require('./mosca-broker/broker');
var serverPort = 8080;
var regex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g;

var measureSchema = require('./mongo/mongo-schemas/MeasureSchema');
var clientSchema = require('./mongo/mongo-schemas/ClientSchema');
var deviceSchema = require('./mongo/mongo-schemas/DeviceSchema');
var subSchema = require('./mongo/mongo-schemas/SubSchema');

var Measure = mongoose.model("Measure", measureSchema.Measure);
var Client = mongoose.model("Client", clientSchema.Client);
var Device = mongoose.model("Device", deviceSchema.Device);
var Subscription = mongoose.model("Subscription", subSchema.Subscription);

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname, 'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// var sockets;

// var ascoltatore = {
//     //using ascoltatore
//     type: 'mongo',
//     url: 'mongodb://localhost:27017/mqtt',
//     pubsubCollection: 'ascoltatori',
//     mongo: {}
//   };

//   var settings = {
//     port: 1883,
//     backend: ascoltatore
//   };

// var mqttServer = new mosca.Server(settings);
// mqttServer.on('ready', setup); 


// Initialize the Swagger middleware
let initializeMiddleWare = swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  return app;
});

// Start the server
let httpServ = http.createServer(initializeMiddleWare).listen(process.env.PORT || 8080, function () {
  console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
  console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  console.log('Mosca is currently running on ')
});
var io = require('socket.io')(httpServ);
mqttServer.attachHttpServer(httpServ);
mqttServer.on('ready', setup);


io.on('connection', function (socket) {
  var address = socket.handshake.address;
  console.log('New connection from ' + address.address + ':' + address.port);
});
// ######################################################
//                 Mongo Settings
// ######################################################
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://Niccos:Reitalia88@cluster0-9rqfj.mongodb.net/PippoHome?retryWrites=true");

// # Load Schemas from ./MongoSchemas

// var Command = mongoose.model("Command",measureSchema.measureSchema);
// var Device = mongoose.model("Device",deviceSchema.deviceSchema);
// var Configuration = mongoose.model("Configuration",deviceSchema.deviceSchema);
// var Group = mongoose.model("Group",deviceSchema.deviceSchema);
// var PhysicalInterface = mongoose.model("PhysicalInterface",deviceSchema.deviceSchema);
// var Pin = mongoose.model("Pin",.deviceSchema);

// ######################################################
//                    Mosca Server
// ######################################################


// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
}

//  Comunication with IoT Devices
//      register all measures
mqttServer.on('clientConnected', function (client) {

  Client.findOne({
    id: client.id
  }).then(foundCl => {
    if (foundCl == null) {
      Client.create({
        id: client.id,
        address: "ipAddress"
      }).then(client => {
        console.log("Client created", client.id);
      }).catch(err => console.log(err));
    } else { console.log("Client exists", client.id); }
  }).catch(err => console.log(err));
});

mqttServer.on('published', function (packet, client) {
  let topic = packet.topic;
  if (topic.indexOf('/new/subscribes') > -1) {
    let item = JSON.parse(packet.payload);
    Subscription.create({
      sensorId: parseInt(item.topic.split('/')[2]),
      mqttId: item.clientId,
      sensorName: item.topic.split('/')[3]
    }).then(el => console.log("Subscription created")).catch(err => console.log(err));
  }
  if (topic.indexOf("/new/subscribes") == -1 || topic.indexOf("/new/clients") == -1) {
    Measure.create({
      topic: packet.topic,
      deviceId: packet.topic.split('/')[1],
      name: packet.topic.split('/')[2],
      value: packet.payload.toString(),
      timestamp: new Date().getTime()
    }).then(
      item => {
        console.log("Measure created ");
      })
      .catch(err => {
        console.log("Error", err);
      });
  }
});


const routineSubs = setInterval(function () {
  Client.find().then(clients => clients.forEach(client => {
    Subscription.findOne({ mqttId: client.id }).then(sub => {
      console.log(sub);
      if (sub != null) {
        Device.findOne({ id: sub.sensorId }).then(device => {
          device.ipAndPort = client.address;
          console.log("Update Address to:" + device.ipAndPort);
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log(err));;
  })).catch(err => console.log(err));;
}, 30000);
routineSubs;


module.exports = {
  mqttServer: mqttServer
}
