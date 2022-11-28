const auth = require('express').Router()
const {login} = require ('../controllers/auth.controller')
const {createAllUsers} = require('../controllers/users.controller')

auth.post('/login', login)
auth.post('/register', createAllUsers)

module.exports = auth
