const resetPasswordRouter = require('express').Router()
const {allResetPassword, deleteResetPassword, updateResetPassword, createResetPassword} = require('../controllers/resetPassword.controller')

resetPasswordRouter.get('/', allResetPassword)
resetPasswordRouter.post('/', createResetPassword)
resetPasswordRouter.delete('/:id', deleteResetPassword)
resetPasswordRouter.patch('/:id', updateResetPassword)

module.exports = resetPasswordRouter
