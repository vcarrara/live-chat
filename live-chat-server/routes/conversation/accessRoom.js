const authenticateJWT = require('./../../authenticateJWT')
const Conversation = require('./../../models/Conversation')

const accessRoom = (req, res) => {
    Conversation.findOne({ room: req.params.room })
        .select('-_id -__v -messages._id')
        .populate({ path: 'members', select: 'username -_id' })
        .populate({ path: 'owner', select: 'username -_id' })
        .populate({ path: 'messages.user', select: 'username -_id' })
        .lean()
        .exec((err, conv) => {
            if (err) {
                // console.log(err)
                return res.sendStatus(500)
            } else if (!conv) {
                return res.sendStatus(404)
            }
            // console.log(conv)
            return res.status(200).json(conv)
        })

    // Conversation.findOne({ room: req.params.room }, (err, conv) => {
    //     if (err) {
    //         return res.sendStatus(500)
    //     } else if (!conv) {
    //         return res.sendStatus(404)
    //     }

    //     // console.log(conv)
    //     return res.json({
    //         room: conv.room,
    //         owner: conv.owner,
    //         members: conv.members,
    //         messages: conv.messages.map((message) => ({ date: message.date, username: message.username, text: message.text })),
    //     })
    // })
}

module.exports = [authenticateJWT, accessRoom]
