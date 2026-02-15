const mongoose = require('mongoose');


// ! DB CONNECTION

async function connectDB() {

    try {


        await mongoose.connect(process.env.MONGODB_URL)

        console.log('Connected to the DB.......');


    } catch (error) {
        console.log(`Data Base is Not Connected.....`, error.message)
    }

}

module.exports = connectDB;

