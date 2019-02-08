var mongoose = require("mongoose");

var commandSchema = mongoose.Schema({
    name : String
});

module.exports=mongoose.model("Command",commandSchema);