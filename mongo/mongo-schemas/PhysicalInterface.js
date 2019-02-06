var mongoose = require("mongoose"),
    pins = require('./PinSchema');

var physicalInterfaceSchema = mongoose.Schema({
    name : String,
    type: String,
    pins: [pins.pinSchema]
});

module.exports=mongoose.model("PhysicalInterface",physicalInterfaceSchema);