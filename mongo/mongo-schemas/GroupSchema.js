var mongoose = require("mongoose");

var groupSchema = mongoose.Schema({
    name : String,
    id : String
});

module.exports=mongoose.model("Group",groupSchema);