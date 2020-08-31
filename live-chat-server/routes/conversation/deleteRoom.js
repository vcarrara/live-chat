const authenticateJWT = require('./../../authenticateJWT')
const Conversation = require('./../../models/Conversation')

const deleteRoom = (req, res) => {
    Conversation.remove({ room: req.params.room }, (err) => {
        if (err) {
            return res.sendStatus(500)
        }
        return res.status(200).send(`Room ${req.params.room} deleted successfully.`)
    })
}

module.exports = [authenticateJWT, deleteRoom]
