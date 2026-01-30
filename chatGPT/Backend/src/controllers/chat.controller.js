const chatModel = require("../models/chat.model");
const messageModel = require("../models/message.model");



const createChat = async (req, res) => {
    const { title } = req.body;

    const user = req.user;

    const chat = await chatModel.create({
        user: user._id,
        title
    })

    res.status(201).json({
        message: 'Chat Created',
        chat: {
            _id: chat._id,
            title: chat.title,
            lastActivity: chat.lastActivity,
            user:chat.user
        }
    })


}


async function getChats(req, res) {
    const user = req.user;

    const chats = await chatModel.find({
        user:user._id
    })


    res.status(200).json({
        message:"Chat Recieved",
        chats:chats.map(chat=>({
            _id:chat._id,
            title:chat.title,
            user:chat.user
        }))
    })
}



async function getMessages(req,res) {
    const chatID = req.params.id;

    const messages = await messageModel.find({chat:chatID});

    res.status(200).json({
        message:messages
    })

}

module.exports = {
    createChat,
    getChats
}