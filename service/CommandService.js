'use strict';


/**
 * command
 *
 * deviceId String 
 * value String 
 * returns ApiResponse
 **/
exports.getComnmands = function(deviceId,value) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "code" : 0,
  "message" : "everything is ok"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

