const authenticateJWT = require('./../../authenticateJWT')
const Conversation = require('./../../models/Conversation')

const createRoom = (req, res) => {
    const { userId } = req.user

    // let conversation = new Conversation()
    // conversation.room = req.params.room
    // conversation.owner = userId
    // conversation.members = [userId, '5efde21ef9e875238c0a8691']
    // conversation.messages = [
    //     {
    //         user: userId,
    //         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    //     },
    //     {
    //         user: '5efde21ef9e875238c0a8691',
    //         text:
    //             'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    //     },
    //     {
    //         user: userId,
    //         text: 'Excepteur sint occaecat cupidatat non proident.',
    //     },
    // ]

    let conversation = new Conversation()
    conversation.room = req.params.room
    conversation.owner = userId
    conversation.members = [userId]
    conversation.messages = []

    conversation.save((err, conversation) => {
        if (err) {
            if (err.code === 11000) {
                // Conversation already exists
                return res.sendStatus(409)
            }
            return res.sendStatus(500)
        }
        Conversation.populate(
            conversation,
            [
                { path: 'owner', select: '-password -_id' },
                { path: 'members', select: '-password -_id' },
            ],
            (err, conversation) => {
                if (err) {
                    return res.sendStatus(500)
                }
                return res.status(201).send(conversation)
            }
        )
    })
}

module.exports = [authenticateJWT, createRoom]
