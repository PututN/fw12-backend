const routes = require('express').Router()

routes.use('/users', require('./users.router')) ///users disini akan dikuasai oleh user.route

module.exports = routes
