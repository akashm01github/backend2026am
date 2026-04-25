const mongoose  = require("mongoose");

const connectDB = ()=>{
    mongoose.connect(`mongodb+srv://akashm:k0O1wEwxsAOtHXvs@cluster0.5z6ovxm.mongodb.net/newNotes`)
    .then(()=>{
        console.log(`Data Base Is Connected........`)
    })
}


module.exports = connectDB;
