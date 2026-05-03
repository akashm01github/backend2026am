const ImageKit = require("imagekit");
const mongoose = require("mongoose");

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_END_POINT
});


const uploadFile = (file)=>{
    return new Promise((resolve,reject)=>{
        imagekit.upload({
            file:file.buffer,
            fileName:(new mongoose.Types.ObjectId()).toString(),
            folder:"moodyPlayer"
        },(err,result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result)
            }
        })
    })
}


module.exports = uploadFile;