'use strict';
var Groupschema = require('../mongo/mongo-schemas/GroupSchema');
var mongoose = require('mongoose');
var Group = mongoose.model("Group", Groupschema.Group);


/**
 * create a new group
 *
 * name GroupCreationInfo 
 * no response value expected for this operation
 **/
exports.createGroup = function(name) {
  return new Promise(function(resolve, reject) {
    let id = Math.floor(Math.random()*1000) +1;
    Group.create({
      name : name,
      id : id,
    }).then( item => {
      console.log("Created Group",name,id);
      resolve(item);
    }).catch(err => reject({Error:err}));
  });
}


/**
 * returns all registered groups
 *
 * returns List
 **/
exports.getGroups = function() {
  return new Promise(function(resolve, reject) {
    Group.find({}).then( items => { resolve(items);})
    .catch(err => {reject({Error:err});});
});
}

