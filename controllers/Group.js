'use strict';

var utils = require('../utils/writer.js');
var Group = require('../service/GroupService');

module.exports.createGroup = function createGroup (req, res, next) {
  var name = req.swagger.params['name'].value;
  Group.createGroup(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getGroups = function getGroups (req, res, next) {
  Group.getGroups()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
