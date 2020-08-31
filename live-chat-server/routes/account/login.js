const yup = require('yup')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const validate = require('./../../validate')
const User = require('./../../models/User')
const Conversation = require('../../models/Conversation')
const config = require('./../../config.json')

const login = (req, res) => {
    const { body } = req
    User.findOne({ username: body.username })
        .exec((err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }

            if (!user || !user.isPasswordValid(body.password, user.password)) {
                return res.status(401).send(`Bad username or password`)
            }

            const JWTPayload = {
                userId: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
            }
            jwt.sign(JWTPayload, config.tokenSecret, { expiresIn: config.tokenExpiresIn }, (err, token) => {
                if (err) {
                    return res.sendStatus(500)
                }
                Conversation.findByUserId(user._id).exec((err, conversations) => {
                    if (err) {
                        return res.sendStatus(500)
                    }

                    console.log(`[live-chat] ${user.username} logged in`)
                    return res.json({ token, user: { ...JWTPayload, conversations } })
                })
            })
        })
}

module.exports = [
    bodyParser.json(),
    validate(
        yup.object({
            username: yup.string().required('Username is a mandatory field'),
            password: yup.string().required('Password is a mandatory field'),
        })
    ),
    login,
]
