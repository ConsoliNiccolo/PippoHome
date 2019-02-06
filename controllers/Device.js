'use strict';

var utils = require('../utils/writer.js');
var Device = require('../service/DeviceService');

module.exports.getDevices = function getDevices (req, res, next) {
  Device.getDevices()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.registerDevice = function registerDevice (req, res, next) {
  var device = req.swagger.params['device'].value;
  Device.registerDevice(device)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateDevice = function updateDevice (req, res, next) {
  var body = req.swagger.params['body'].value;
  Device.updateDevice(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
