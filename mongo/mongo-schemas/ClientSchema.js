var mongoose = require("mongoose");

var clientSchema = mongoose.Schema({
    id : String,
    address : String
});

module.exports=mongoose.model("Client",clientSchema);