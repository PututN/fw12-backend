const usersRouter = require('express').Router()
const uploadMiddleware = require('../middleware/upload.middleware')


const { readAll, createAllUsers, deletedUserId, updatedUserId, readUserId } = require('../controllers/users.controller') //import dari controller
//akhir dari url endpoint untuk menjalan method
usersRouter.get('/', readAll ) //kirim data melalui query string
usersRouter.get('/:id', readUserId ) //kirim data melalui query string
usersRouter.post('/', createAllUsers ) //kirim data melalui query string & body (digunakan utk mengirimkan data yang tidak terlihat scara kasat mata)
usersRouter.delete('/:id', deletedUserId ) //kirim data melalui query string
usersRouter.patch('/:id', uploadMiddleware, updatedUserId )//kirim data melalui query string & body (digunakan utk mengirimkan data yang tidak terlihat scara kasat mata ex ketika login)

module.exports = usersRouter
