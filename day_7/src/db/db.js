const  mongoose  = require("mongoose");


function connectDB(){
    mongoose.connect(process.env.MONGOOSE_URL)
    .then(()=>{
        console.log('DataBase is Conneted....');
    })
}


module.exports = connectDB;
