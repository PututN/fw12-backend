const profileRouter = require('express').Router()
const {uploadMiddleware} = require('../middleware/upload.middleware')
const {idUser, updateUser, newUpdateUser} = require('../controllers/profile.controller')


profileRouter.get('/', idUser)
profileRouter.patch('/updated/', uploadMiddleware, newUpdateUser)

module.exports = profileRouter
