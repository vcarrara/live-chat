const mongoose = require('mongoose')

const avatarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    extension: {
        type: String,
    },
})

avatarSchema.statics.findRandom = function (callback) {
    this.count((err, count) => {
        if (err) {
            return callback(err)
        }
        const rand = Math.floor(Math.random() * count)
        this.findOne().skip(rand).exec(callback)
    })
}

module.exports = avatarSchema
