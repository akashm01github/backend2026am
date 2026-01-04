const mongoose = require("mongoose");


// Schema 
const noteSchema  = new mongoose.Schema({
    title:String,
    content:String
})


// MODEL
const noteModel = mongoose.model("note",noteSchema);

module.exports = noteModel;