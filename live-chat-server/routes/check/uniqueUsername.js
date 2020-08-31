const User = require('../../models/User')

const uniqueUsername = (req, res) => {
    const { username } = req.params
    User.findOne({ username }, (err, user) => {
        if (err) {
            return res.sendStatus(500)
        }
        if (user) {
            return res.status(409).send(`Username ${username} is already taken.`)
        } else {
            return res.status(200).send(`Username ${username} is free.`)
        }
    })
}

module.exports = uniqueUsername
