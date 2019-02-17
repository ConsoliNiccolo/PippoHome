'use strict';
var deviceSchema = require('../mongo/mongo-schemas/DeviceSchema');
var mongoose = require('mongoose');
var Device = mongoose.model("Device", deviceSchema.Device);


/* A standard device raspberry on fresh registration */

let standardConfiguration = {
  connectedInterfaces: [{
    name: "Sensor001",
    type: "001",
    pins: [{
      id: 0,
      name: 'GPIO3'
    },
    {
      id: 1,
      name: 'GPIO4'
    }
    ]
  }],
  availableInterfaces: [{
    id: 2,
    name: 'GPIO5'
  }]
};

/**
 * returns all registered devices
 *
 * returns List
 **/


exports.getDevices = function () {
  return new Promise(function (resolve, reject) {
    resolve(Device.find({}));
  });
}


/**
 *
 * device DeviceRegistrationInfo  (optional)
 * no response value expected for this operation
 **/
exports.registerDevice = function (device) {
  return new Promise(function (resolve, reject) {
    Device.find({
      name: device.name
    }).then(item => {
      if (item.length == 0) {
        Device.create({
          name: device['name'],
          id: Math.floor(Math.random()*Math.PI* 1000) + 1,
          group: device['group'],
          ipAndPort: '192.168.1.67:1880',
          configuration: standardConfiguration,
        }).then(el => {
          console.log("I created the given item", el);
          resolve(el);
        }).catch(err => {
          reject(err);
        });
      } else {
        reject({ Error: "The Device already exists" });
      }
    }).catch(err => { console.log("Error"); reject(err); })
  });
}

function getNumberedId() {
  return new Promise(function (resolve, reject) {
    Device.find({})
      .then(
        items => {
          let number = 0;
          items.forEach(el => { number += 1; });
          resolve(number + 1);
        })
      .catch(err => {
        console.log("Error on registration", err);
        reject(err);
      });
  });
}


/**
 * Update an existing device
 * Update an existing device
 *
 * body Device Device object that needs to be updated
 * no response value expected for this operation
 **/
exports.updateDevice = function (body) {
  return new Promise(function (resolve, reject) {
    Device.findOneAndUpdate(body['name'], body, { new: true }).then((item) => {
      resolve(item);
    }).catch(err => reject({ Error: err }));
  });
}

