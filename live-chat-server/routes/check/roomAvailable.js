const Conversation = require('../../models/Conversation')

const roomAvailable = (req, res) => {
    Conversation.findOne({ room: req.params.room }, (err, room) => {
        if (err) {
            return res.sendStatus(500)
        }
        if (room) {
            return res.status(409).send(`Room ${req.params.room} is already taken.`)
        } else {
            return res.status(200).send(`Room ${req.params.room} is free.`)
        }
    })
}

module.exports = roomAvailable
