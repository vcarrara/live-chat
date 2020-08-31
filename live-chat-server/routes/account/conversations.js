const Conversation = require('./../../models/Conversation')

const conversations = (req, res) => {
    const { user } = req
    res.sendStatus(200)
    // Conversation.find({ owner: user.username }, (err, conv) => {})
}

module.exports = [conversations]
