'use strict';


/**
 * returns all registered devices
 *
 * returns List
 **/
exports.getDevices = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "configuration" : {
    "availableInterfaces" : [ {
      "name" : "name",
      "id" : 1.46581298050294517310021547018550336360931396484375
    }, {
      "name" : "name",
      "id" : 1.46581298050294517310021547018550336360931396484375
    } ],
    "connectedInterfaces" : [ {
      "name" : "name",
      "pins" : [ {
        "name" : "name",
        "id" : 1.46581298050294517310021547018550336360931396484375
      }, {
        "name" : "name",
        "id" : 1.46581298050294517310021547018550336360931396484375
      } ],
      "type" : "type"
    }, {
      "name" : "name",
      "pins" : [ {
        "name" : "name",
        "id" : 1.46581298050294517310021547018550336360931396484375
      }, {
        "name" : "name",
        "id" : 1.46581298050294517310021547018550336360931396484375
      } ],
      "type" : "type"
    } ]
  },
  "name" : "name",
  "id" : 0.80082819046101150206595775671303272247314453125,
  "group" : 6.02745618307040320615897144307382404804229736328125
}, {
  "configuration" : {
    "availableInterfaces" : [ {
      "name" : "name",
      "id" : 1.46581298050294517310021547018550336360931396484375
    }, {
      "name" : "name",
      "id" : 1.46581298050294517310021547018550336360931396484375
    } ],
    "connectedInterfaces" : [ {
      "name" : "name",
      "pins" : [ {
        "name" : "name",
        "id" : 1.46581298050294517310021547018550336360931396484375
      }, {
        "name" : "name",
        "id" : 1.46581298050294517310021547018550336360931396484375
      } ],
      "type" : "type"
    }, {
      "name" : "name",
      "pins" : [ {
        "name" : "name",
        "id" : 1.46581298050294517310021547018550336360931396484375
      }, {
        "name" : "name",
        "id" : 1.46581298050294517310021547018550336360931396484375
      } ],
      "type" : "type"
    } ]
  },
  "name" : "name",
  "id" : 0.80082819046101150206595775671303272247314453125,
  "group" : 6.02745618307040320615897144307382404804229736328125
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * device DeviceRegistrationInfo  (optional)
 * no response value expected for this operation
 **/
exports.registerDevice = function(device) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update an existing device
 * Update an existing device
 *
 * body Device Device object that needs to be updated
 * no response value expected for this operation
 **/
exports.updateDevice = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

