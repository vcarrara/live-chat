const yup = require('yup')
const bodyParser = require('body-parser')
const validate = require('./../../validate')
const User = require('../../models/User')
const Avatar = require('../../models/Avatar')

const register = (req, res) => {
    const { body } = req
    User.findOne({ username: body.username }, (err, user) => {
        if (err) {
            return res.sendStatus(500)
        } else if (user) {
            return res.status(409).send(`User ${body.username} already exists.`)
        }

        Avatar.findRandom((err, avatar) => {
            if (err) {
                return res.sendStatus(500)
            }

            const newUser = new User()
            newUser.username = body.username
            newUser.password = newUser.generateHash(body.password)
            newUser.firstName = body.firstName
            newUser.lastName = body.lastName
            newUser.avatar = avatar.name

            newUser.save((err) => {
                if (err) {
                    return res.sendStatus(500)
                }
                return res.status(200).send(`User ${body.username} signed up successfully.`)
            })
        })
    })
}

module.exports = [
    bodyParser.json(),
    validate(
        yup.object({
            username: yup
                .string()
                .required('Username is a mandatory field')
                .matches(/^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/, 'Invalid username'),
            password: yup
                .string()
                .required('Password is a mandatory field')
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%\-*#?&])[A-Za-z\d@$!%\-*#?&]{8,}$/,
                    'Password must Contain 8 characters, one uppercase, one lowercase, one number and one special case character'
                ),
            firstName: yup
                .string()
                .required('First Name is a mandatory field')
                .matches(/^[a-zA-Z-' ]{1,32}$/, 'First Name in invalid'),
            lastName: yup
                .string()
                .required('Last Name is a mandatory field')
                .matches(/^[a-zA-Z-' ]{1,32}$/, 'Last Name in invalid'),
        })
    ),
    register,
]
