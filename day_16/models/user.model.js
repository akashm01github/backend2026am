//! MONGOOSE
const mongoose = require('mongoose');

//! SCHEMA

const userSchema = new mongoose.Schema({

    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    job_title: {
        type: String
    },
    gender: {
        type: String
    }


})

// ! MODEL
const userModel = mongoose.model('users', userSchema);


module.exports = userModel;
