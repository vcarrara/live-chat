const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true,
        unique: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
    messages: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                required: true,
                default: Date.now,
            },
        },
    ],
})

conversationSchema.statics.findByUserId = function (userId) {
    return this.find({ members: userId }, { messages: { $slice: -1 } })
        .select('-__v')
        .populate({ path: 'members', select: '-password -__v' })
        .populate({ path: 'owner', select: '-password -__v' })
        .populate({ path: 'messages.user', select: '-password -__v' })
        .lean()
}

module.exports = conversationSchema
