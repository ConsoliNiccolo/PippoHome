var mongoose = require("mongoose"),
    physicalInterface = require('./PhysicalInterface'),
    pins = require ('./PinSchema');

var configurationSchema = mongoose.Schema({
    connectedInterfaces : [physicalInterface.physicalInterfaceSchema],
    availableInterfaces : [pins.pinSchema]
});

module.exports=mongoose.model("Configuration",configurationSchema);