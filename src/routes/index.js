const routes = require('express').Router()
//untuk menampung semua enpoint pada aplikasi kita

routes.use('/users', require('./users.router')) ///users disini akan dikuasai oleh user.route

module.exports = routes
