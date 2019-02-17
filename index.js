'use strict';

var fs = require('fs'),
  path = require('path'),
  http = require('http'),
  mongoose = require("mongoose");

var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var moscaServer = require('./mosca-broker/broker');
var serverPort = 8080;


var measureSchema = require('./mongo/mongo-schemas/MeasureSchema');
var Measure = mongoose.model("Measure", measureSchema.Measure);




// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname, 'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    console.log('Mosca is currently running on ', moscaServer.server.url)
  });

});


// ######################################################
//                 Mongo Settings
// ######################################################
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/PippoHomeOfficial");

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


//  Comunication with IoT Devices
//      register all measures
moscaServer.server.on('published', function (packet, client) {
  console.log(packet);
  let topic = packet.topic;
  if (topic.indexOf("/new/subscribes") == -1 || topic.indexOf("/new/clients") == -1) {
    Measure.create({
      topic: packet.topic,
      deviceId: packet.topic.split('/')[1],
      name: packet.topic.split('/')[2],
      value: packet.payload.toString(),
      timestamp: new Date().getTime()
    }).then(
      item => {
        console.log(" I created the item");
      })
      .catch(err => {
        console.log("Error", err);
      });
  }
});
