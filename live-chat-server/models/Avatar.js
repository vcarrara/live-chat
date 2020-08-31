const mongoose = require('mongoose')

const avatarSchema = require('./../schemas/avatarSchema')

const Avatar = mongoose.model('Avatar', avatarSchema)

module.exports = Avatar
