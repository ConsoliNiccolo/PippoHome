'use strict';

var utils = require('../utils/writer.js');
var Command = require('../service/CommandService');

module.exports.getComnmands = function getComnmands (req, res, next) {
  var deviceId = req.swagger.params['deviceId'].value;
  var value = req.swagger.params['value'].value;
  var sensorName = req.swagger.params['sensorName'].value;
  Command.getComnmands(deviceId,sensorName,value)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
