const usersRouter = require('express').Router()

const { readAllUsers, createUsers, deletedUsers, updatedUsers, readUser } = require('../controllers/users.controller') //import dari controller

usersRouter.get('/', readAllUsers ) //ketika /users method get kita kembalikan ke users.controller (readAllUsers)
usersRouter.get('/:id', readUser ) //ketika /users/id method get kita kembalikan ke users.controller(readUser)
usersRouter.post('/', createUsers ) //ketika method get kita kembalikan ke users.controller (createUsers)
usersRouter.delete('/:id', deletedUsers ) //ketika method get kita kembalikan ke users.controller (deletedUsers)
usersRouter.patch('/:id', updatedUsers ) //ketika method get kita kembalikan ke users.controller (updatedUsers)

module.exports = usersRouter
