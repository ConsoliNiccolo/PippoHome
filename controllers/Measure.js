'use strict';

var utils = require('../utils/writer.js');
var Measure = require('../service/MeasureService');

module.exports.getMeasures = function getMeasures(req, res, next) {
    var deviceId = req.swagger.params['deviceId'].value;
    Measure.getMeasures(deviceId)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
