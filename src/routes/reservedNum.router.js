const reservedNumRouter = require('express').Router()
const {allReservedNum, deleteReservedNum, updateReservedNum, createReservedNum} = require('../controllers/reservedSeat.controller')

reservedNumRouter.get('/', allReservedNum)
reservedNumRouter.post('/', createReservedNum)
reservedNumRouter.delete('/:id', deleteReservedNum)
reservedNumRouter.patch('/:id', updateReservedNum)

module.exports = reservedNumRouter
