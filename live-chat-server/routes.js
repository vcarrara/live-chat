const register = require('./routes/account/register')
const login = require('./routes/account/login')
const get = require('./routes/account/get')
const deleteAccount = require('./routes/account/deleteAccount')
const conversations = require('./routes/account/conversations')
const accessRoom = require('./routes/conversation/accessRoom')
const createRoom = require('./routes/conversation/createRoom')
const deleteRoom = require('./routes/conversation/deleteRoom')
const uniqueUsername = require('./routes/check/uniqueUsername')
const roomAvailable = require('./routes/check/roomAvailable')

module.exports = {
    account: {
        register,
        login,
        get,
        deleteAccount,
        conversations,
    },
    conversation: {
        accessRoom,
        createRoom,
        deleteRoom,
    },
    check: {
        uniqueUsername,
        roomAvailable,
    },
}
