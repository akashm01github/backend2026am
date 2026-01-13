const  mongoose  = require("mongoose");

const userSchema  = mongoose.Schema({
    userName:String,
    password:String
})


const userModel = mongoose.model('users',userSchema)



module.exports = userModel;