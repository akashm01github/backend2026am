const mongoose  = require("mongoose");


function connectDB(){
    mongoose.connect(process.env.MOGOOSE_URL)
    .then(()=>{
        console.log('DataBase Connected........')
    })
}



module.exports = connectDB;
