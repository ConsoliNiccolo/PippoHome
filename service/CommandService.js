'use strict';
var commandSchema = require('../mongo/mongo-schemas/CommandSchema');
var mongoose = require('mongoose');
var Command = mongoose.model("Command", commandSchema.Command);
var deviceSChema = require('../mongo/mongo-schemas/DeviceSchema');
var Device = mongoose.model("Device", deviceSChema.Device);
var moscaServer = require('../mosca-broker/broker');
var http = require('http');
var axios = require('axios');


/**
 * command
 *
 * deviceId String 
 * value String 
 * returns ApiResponse
 **/
/* Read and Write values */
exports.getComnmands = function (deviceId, sensorName, value) {
  return new Promise(function (resolve, reject) {
    Device.findOne({ id: deviceId }).then(items => {
      if (items != null) {
        items.configuration[0].connectedInterfaces.forEach(sensorObj => {
          if (sensorName == sensorObj.name) {
            sensorObj.pins.forEach(pin => {
              if (pin.id == "0") {
                //Data pin.
                ProcessingNodeREDRequest(items.ipAndPort, sensorName,
                  pin.name).then(el => {
                    let message = {
                      topic: '/sub/' + deviceId + '/' + sensorName,
                      payload: value, // or a Buffer
                      qos: 1, // 0, 1, or 2
                      retain: false // or true
                    };
                    if (el.status == "200") { // Flow is correct just push message
                      moscaServer.server.publish(message, function () {
                        // Logic.
                        resolve(message);
                      });
                    }
                    else if (el.status == "500") { // POST the new flow
                      getFlowConfig(items.ipAndPort, el.id, sensorName, el.flow).then(res => {
                        moscaServer.server.publish(message, function () {
                          // Logic.
                          resolve(message);
                        });
                      }).catch(err => reject(err))
                    }
                  }).catch(err => reject(err));
              }
            })

          }
        });
      } else {
        reject();
      }
    })
  });
}

function ProcessingNodeREDRequest(NodeRedAddress, sensorName, pinNumber) {
  return new Promise(function (resolve, reject) {
    http.get('http://' + NodeRedAddress + ":1880" + '/flows', (resp) => {
      let data = '';
      let flow_id = "";
      let modifiedElements = [];
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        //let flow_id = data.map(el => el.label != null).filter(el => el.label == "Flow 1")['id'];
        let dataParsed = JSON.parse(data);
        dataParsed.forEach(function (obj) {
          if (obj.type == "tab") {
            flow_id = obj.id;
          }
          if (obj.name === sensorName) {
            if (obj.pin != pinNumber) {
              obj.pin = pinNumber;
              modifiedElements.push(obj);
            }
          }
        });
        if (modifiedElements.length > 0) { resolve({ status: "500", flow: modifiedElements, id: flow_id }); }
        else { resolve({ status: "200" }); }
      });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
      reject({ status: err });
    });
  });
}

function getFlowConfig(NodeRedAddress, flow_id, sensorName, elementModified) {
  return new Promise(function (resolve, reject) {
    console.log("Flowid:", flow_id);
    http.get('http://' + NodeRedAddress + ":1880" + '/flow/' + flow_id, (resp) => {
      let data = '';
      let newdata = '';
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        let flowdata = JSON.parse(data);
        flowdata.nodes.forEach(function (obj) {
          if (obj.name === sensorName) {
            flowdata.nodes = flowdata.nodes.filter(el => el != obj);
          }
        });
        modifiedElements.forEach(modifiedSensor => { flowdata.nodes.push(modifiedSensor); });
        console.log("NewData:", flowdata);
        POSTaNewFlow(NodeRedAddress, flowdata, flow_id).then(res => resolve(res)).catch(err => reject({ Error: err }));
      });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
      reject({ status: err });
    });;
  });
}


function POSTaNewFlow(NodeRedAddress, newflow, id) {
  return new Promise(function (resolve, reject) {
    console.log("Here", newflow);
    axios.put('http://' + NodeRedAddress + ":1880" + '/flow/' + id, {
      id: newflow.id,
      label: newflow.label,
      nodes: newflow.nodes
    }).then((res) => {
      console.log("Result");
      console.log(res)
      resolve(res.data);
    }).catch((error) => {
      console.error(error)
      reject({ status: error })
    })
  });
}

