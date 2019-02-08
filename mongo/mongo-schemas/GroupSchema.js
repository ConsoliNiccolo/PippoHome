var mongoose = require("mongoose");

var Group = mongoose.Schema({
    name : String,
    id : Number
});
module.exports=mongoose.model("Group",Group);