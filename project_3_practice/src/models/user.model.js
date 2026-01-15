const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        unique:String,
        required:true
    },
    password:String
})


const userModel = mongoose.model("users",userSchema);

module.exports  = userModel;

