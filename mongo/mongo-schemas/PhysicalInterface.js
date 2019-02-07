var mongoose = require("mongoose"),
    pins = require('./PinSchema');

var physicalInterfaceSchema = new mongoose.Schema();
physicalInterfaceSchema.add({
    name : String,
    type : String,
    pins : [pins.pinSchema]  
});

module.exports=mongoose.model("PhysicalInterface",physicalInterfaceSchema);