const mongoose  = require("mongoose");


const userSchema = mongoose.Schema({
    title:String,
    desc:String
})

const noteModel = mongoose.model('notes',userSchema)



module.exports = noteModel