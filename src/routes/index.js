const routes = require('express').Router()
//untuk menampung semua enpoint pada aplikasi kita
const authMiddleware = require('../middleware/auth.middleware')


routes.use('/users', authMiddleware, require('./users.router')) ///users disini akan dikuasai oleh user.route
routes.use('/movies', require('./movies.router'))
routes.use('/genres', authMiddleware, require('./genres.router'))
routes.use('/casts', authMiddleware, require('./casts.router'))
routes.use('/status', authMiddleware, require('./status.router'))
routes.use('/subscribers', require('./subscribers.router'))
routes.use('/movieCasts', authMiddleware, require('./movieCasts.router'))
routes.use('/movieGenre', authMiddleware, require('./movieGenre.router'))
routes.use('/movieScheduleTime', authMiddleware, require('./movieScheduleTime.router'))
routes.use('/paymentMethod', authMiddleware, require('./paymentMethod.router'))
routes.use('/reservedNum', authMiddleware, require('./reservedNum.router'))
routes.use('/resetPassword', authMiddleware, require('./resetPassword.router'))
routes.use('/cinemas', authMiddleware, require('./cinemas.router'))
routes.use('/movieSchedules', authMiddleware, require('./movieSchedules.router'))
routes.use('/transaction', authMiddleware, require('./transaction.router'))

routes.use('/movieDetail', authMiddleware, require('./movieDetail.router'))

routes.use('/auth', require('./auth.router') )

routes.use('/profile', authMiddleware, require("./profile.router") )

module.exports = routes
