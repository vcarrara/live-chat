const yup = require('yup')
const bodyParser = require('body-parser')

const update = (req, res) => {}

module.exports = [
    bodyParser.json(),
    yup.object({
        username: yup.string().matches(/^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/, 'Invalid username'),
        password: yup
            .string()
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%\-*#?&])[A-Za-z\d@$!%\-*#?&]{8,}$/,
                'Password must Contain 8 characters, one uppercase, one lowercase, one number and one special case character'
            ),
        firstName: yup.string().matches(/^[a-zA-Z-' ]{1,32}$/, 'First Name in invalid'),
        lastName: yup.string().matches(/^[a-zA-Z-' ]{1,32}$/, 'Last Name in invalid'),
    }),
    update,
]
