const authenticateJWT = require('../../authenticateJWT')
const Conversation = require('./../../models/Conversation')

const getAccount = (req, res) => {
    const { user } = req
    Conversation.findByUserId(user.userId).exec((err, conversations) => {
        if (err) {
            return res.sendStatus(500)
        }
        // conversations.forEach((conv) => {
        //     console.log(conv.messages)
        // })
        console.log(user)
        return res.status(200).json(Object.assign({}, user, { conversations }))
    })
}

module.exports = [authenticateJWT, getAccount]
