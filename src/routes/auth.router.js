const auth = require('express').Router()
const {login, register, forgotPassword, resetPassword} = require ('../controllers/auth.controller')
const {body} = require('express-validator')

auth.post('/login', login)
auth.post('/register', body('email').notEmpty().isEmail().withMessage('Please fill email'),
body('password').notEmpty().isLength({min:5}).withMessage('must be at least 5 chars long'),
register)
auth.post('/forgotPassword', forgotPassword)
auth.post('/resetPassword', resetPassword)

module.exports = auth
