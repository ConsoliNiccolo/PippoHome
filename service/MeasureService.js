'use strict';
var MeasureSchema = require('../mongo/mongo-schemas/GroupSchema');
var mongoose = require('mongoose');
var Measure = mongoose.model("Measure", MeasureSchema.Measure);

class MeasureClass {
    constructor(name,value) {
      this.name = name;
      this.value = value;
    } 
}


/**

 **/
exports.getMeasures = function(deviceId) {
  return new Promise(function(resolve, reject) {
      Measure.find({
        deviceId : deviceId
      }).then( foundMeasures => { // Different sensors.
        let returnElements = [];
        let topics = [];
        foundMeasures.forEach(el=>{if(topics.indexOf(el.name) == -1) {topics.push(el.name)}});
        for( var i=0; i <topics.length; i++){
            let max_temp = 0;
            for (var m = 0; m < foundMeasures.length; m++){
                if(foundMeasures[m].name == topics[i]){
                    if( foundMeasures[m].timestamp > max_temp){
                        max_temp = foundMeasures[m].timestamp;
                        returnElements[i] =new MeasureClass(foundMeasures[m].name,foundMeasures[m].value);
                    }
                }
            }
        }
        resolve( returnElements);
      }).catch( err => reject({Error:err}));
  });
}


