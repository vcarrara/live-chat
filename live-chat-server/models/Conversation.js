const mongoose = require('mongoose')

const conversationSchema = require('./../schemas/conversationSchema')

const Conversation = mongoose.model('Conversation', conversationSchema)

module.exports = Conversation
