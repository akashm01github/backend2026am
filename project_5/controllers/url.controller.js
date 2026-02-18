const shortid = require('shortid');
const { urlModel } = require('../models/url.model');

const handelGenerateShortURL = async (req, res) => {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({
            message: 'URL not Found'
        })
    }


    const shortId = shortid();


    await urlModel.create({
        shortId: shortId,
        redirectUrl: body.url,
    })


    return res.render('home', { id: shortId });
}


const getMainURL = async (req, res) => {
    const { id } = req.params;

    const entry = await urlModel.findOne({
        shortId: id
    })

    res.redirect(entry.redirectUrl)
}


module.exports = {
    handelGenerateShortURL,
    getMainURL
}