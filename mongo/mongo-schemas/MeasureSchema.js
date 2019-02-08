var mongoose = require("mongoose");

var Measure = mongoose.Schema({
    topic: String,
    value: String,
    device: String,
    name: String,
    timestamp: String
});

module.exports=mongoose.model("Measure",Measure);