const profileRouter = require('express').Router()
const uploadMiddleware = require('../middleware/upload.middleware')
const {idUser, updateUser} = require('../controllers/profile.controller')


profileRouter.get('/', idUser)
profileRouter.patch('/', uploadMiddleware, updateUser)

module.exports = profileRouter
