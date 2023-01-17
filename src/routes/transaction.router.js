const transactionRouter = require('express').Router()
const {createOrder,allTransaction, transactionId, deleteTransactionId, updateTransactionId, createTransactionId} = require('../controllers/transaction.controller')

// transactionRouter.get('/', allTransaction)
transactionRouter.get('/history', transactionId)
transactionRouter.post('/', createTransactionId)
transactionRouter.post('/order', createOrder)
transactionRouter.delete('/:id', deleteTransactionId )
transactionRouter.patch('/:id', updateTransactionId )


module.exports = transactionRouter
