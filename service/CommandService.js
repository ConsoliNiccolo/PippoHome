'use strict';
var commandSchema = require('../mongo/mongo-schemas/CommandSchema');
var mongoose = require('mongoose');
var Command = mongoose.model("Command", commandSchema.Command);


/**
 * command
 *
 * deviceId String 
 * value String 
 * returns ApiResponse
 **/
exports.getComnmands = function (deviceId, value) {
  return new Promise(function (resolve, reject) {
    let device = deviceId,
      command = value;
    let message = {
      topic: '/' + device,
      payload: command, // or a Buffer
      qos: 0, // 0, 1, or 2
      retain: false // or true
    };
    moscaServer.server.publish(message, function () {
      resolve();
    });
  });
}



