const transactionRouter = require('express').Router()
const {allTransaction, transactionId, deleteTransactionId, updateTransactionId, createTransactionId} = require('../controllers/transaction.controller')

transactionRouter.get('/', allTransaction)
transactionRouter.get('/:id', transactionId)
transactionRouter.post('/', createTransactionId)
transactionRouter.delete('/:id', deleteTransactionId )
transactionRouter.patch('/:id', updateTransactionId )

module.exports = transactionRouter
