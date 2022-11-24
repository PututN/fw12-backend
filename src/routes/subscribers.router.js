const subscribersRouter = require('express').Router()
const {allSubscribers, deleteSubscribers, updateSubscribers, createSubscribers} = require('../controllers/subscribers.controller')

subscribersRouter.get('/', allSubscribers)
subscribersRouter.post('/', createSubscribers)
subscribersRouter.delete('/:id', deleteSubscribers)
subscribersRouter.patch('/:id', updateSubscribers)

module.exports = subscribersRouter
