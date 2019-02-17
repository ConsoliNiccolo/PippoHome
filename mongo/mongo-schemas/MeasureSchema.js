var mongoose = require("mongoose");

var Measure = mongoose.Schema({
    topic: String,
    value: String,
    deviceId: String,
    name: String,
    timestamp: String
});

module.exports=mongoose.model("Measure",Measure);