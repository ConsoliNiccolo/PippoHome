var mongoose = require("mongoose");

var pinSchema = mongoose.Schema({
    name : String,
    id : Number
});

module.exports=mongoose.model("Pin",pinSchema);