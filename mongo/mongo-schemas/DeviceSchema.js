var mongoose = require("mongoose"),
    configuration = require('./Configuration');

var deviceSchema = mongoose.Schema({
    id : Number,
    name : String,
    group : Number,
    configuration : [configuration.configurationSchema]
});

module.exports=mongoose.model("Device",deviceSchema);