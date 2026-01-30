const express = require('express');
const { authUser } = require('../middlewares/auth.middleware');
const { createChat,getChats } = require('../controllers/chat.controller');

const router = express.Router();



router.post('/', authUser,createChat)
router.get('/', authUser,getChats);

router.get('/messages/:id',authUser,getMessages)

module.exports = router;

