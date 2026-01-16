const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    image: String,
    caption: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})

const postModel  = mongoose.model('posts',postSchema);


module.exports = postModel;
