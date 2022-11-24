const castsRouter = require('express').Router()
const {allCasts, deleteCasts, updateCasts, createCasts} = require('../controllers/casts.controller')

castsRouter.get('/', allCasts)
castsRouter.post('/', createCasts)
castsRouter.delete('/:id', deleteCasts)
castsRouter.patch('/:id', updateCasts )

module.exports = castsRouter
