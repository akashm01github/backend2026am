
const shortid = require('shortid');

const { URL } = require("../models/url.model");

const handleGenerateNewShortURL = async (req, res) => {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({
            error: 'url is required'
        })
    }

    const shortID = shortid();

    await URL.create({
        shortID: shortID,
        redirectURL:body.url,
        visitHistory:[]
    })


    return res.render('home',{id:shortID});

    
    return res.status(201).json({
        message:'URL Created',
        id:shortID
    })
}

module.exports = {handleGenerateNewShortURL}