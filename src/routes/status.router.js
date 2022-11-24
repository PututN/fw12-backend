const statusRouter = require('express').Router()
const {allStatus, deleteStatus, updateStatus, createStatus} = require('../controllers/status.constroller')

statusRouter.get('/', allStatus)
statusRouter.post('/', createStatus)
statusRouter.delete('/:id', deleteStatus)
statusRouter.patch('/:id', updateStatus)

module.exports = statusRouter
