const jwt = require('jsonwebtoken')
const config = require('./config.json')

module.exports = (req, res, next) => {
    const { authorization } = req.headers

    if (authorization) {
        const token = authorization.split(' ')[1]

        jwt.verify(token, config.tokenSecret, (err, user) => {
            if (err) {
                res.sendStatus(403)
                return
            }

            req.user = user
            next()
        })
    } else {
        res.sendStatus(401)
    }
}
