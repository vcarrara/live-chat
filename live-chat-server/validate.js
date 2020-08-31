const yup = require('yup')

module.exports = (schema) => (req, res, next) => {
    const { body } = req
    schema
        .validate(body)
        .then(() => {
            next()
        })
        .catch((e) => {
            return res.status(400).send(e.errors)
        })
}
