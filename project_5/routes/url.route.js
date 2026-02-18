const express = require('express');
const { handelGenerateShortURL, getMainURL } = require('../controllers/url.controller');



const router = express.Router();


router.post('/',handelGenerateShortURL)


router.get('/:id',getMainURL)


module.exports = router;