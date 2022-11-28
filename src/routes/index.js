const routes = require('express').Router()
//untuk menampung semua enpoint pada aplikasi kita
const authMiddleware = require('../middleware/auth.middleware')


routes.use('/users', require('./users.router')) ///users disini akan dikuasai oleh user.route
routes.use('/movies', authMiddleware, require('./movies.router'))
routes.use('/genres', require('./genres.router'))
routes.use('/casts', require('./casts.router'))
routes.use('/status', require('./status.router'))
routes.use('/subscribers', require('./subscribers.router'))
routes.use('/movieCasts', require('./movieCasts.router'))
routes.use('/movieGenre', require('./movieGenre.router'))
routes.use('/movieScheduleTime', require('./movieScheduleTime.router'))
routes.use('/paymentMethod', require('./paymentMethod.router'))
routes.use('/reservedNum', require('./reservedNum.router'))
routes.use('/resetPassword', require('./resetPassword.router'))
routes.use('/cinemas', require('./cinemas.router'))
routes.use('/movieSchedules', require('./movieSchedules.router'))
routes.use('/transaction', require('./transaction.router'))

routes.use('/auth', require('./auth.router') )

module.exports = routes
