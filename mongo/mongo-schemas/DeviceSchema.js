var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var Pin = new Schema();
Pin.add({
    id : String,
    name : String
});

var PhysicalInterface = new Schema({
    name : String, 
    type : String,
    pins : [Pin]
});

var Configuration = new Schema({
    connectedInterfaces : [PhysicalInterface],
    availableInterfaces : [Pin]
});

var Device = new Schema({
    id : Number,
    name : String,
    group : Number,
    ipAndPort : String,
    configuration : [Configuration]
});

module.exports=mongoose.model("Device",Device);