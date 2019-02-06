'use strict';


/**
 * create a new group
 *
 * name GroupCreationInfo 
 * no response value expected for this operation
 **/
exports.createGroup = function(name) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * returns all registered groups
 *
 * returns List
 **/
exports.getGroups = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "name" : "name",
  "id" : 0.80082819046101150206595775671303272247314453125
}, {
  "name" : "name",
  "id" : 0.80082819046101150206595775671303272247314453125
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

