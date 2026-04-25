const mongoose = require('mongoose');


function connectDB(){
    mongoose.connect(`mongodb+srv://akashm:k0O1wEwxsAOtHXvs@cluster0.5z6ovxm.mongodb.net/notes`)
    .then(()=>{
        console.log('DB is Connected.....')
    })
}


module.exports = connectDB;

