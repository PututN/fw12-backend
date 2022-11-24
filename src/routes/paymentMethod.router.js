const paymentMethodRouter = require('express').Router()
const {allPaymentMethod, deletePaymentMethod, updatePaymentMethod, createPaymentMethod} = require('../controllers/paymentMethod.controller')

paymentMethodRouter.get('/', allPaymentMethod)
paymentMethodRouter.post('/', createPaymentMethod)
paymentMethodRouter.delete('/:id', deletePaymentMethod)
paymentMethodRouter.patch('/:id', updatePaymentMethod)

module.exports = paymentMethodRouter
