var mongoose = require("mongoose"),
    Schema = mongoose.Schema;


var pinSchema = mongoose.Schema({
    name : String,
    id : Number
});

module.exports=mongoose.model("Pin",pinSchema);