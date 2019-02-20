var mongoose = require("mongoose");

var subSchema = mongoose.Schema({
    sensorId : Number,
    mqttId : String,
    sensorName : String
});

module.exports=mongoose.model("Subscription",subSchema);