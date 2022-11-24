const cinemasRouter = require('express').Router()
const {allCinemas, cinemasId, deleteCinemasId, updateCinemasId, createCinemas} = require('../controllers/cinemas.controller')

cinemasRouter.get('/', allCinemas)
cinemasRouter.get('/:id', cinemasId)
cinemasRouter.post('/', createCinemas)
cinemasRouter.delete('/:id', deleteCinemasId )
cinemasRouter.patch('/:id', updateCinemasId )

module.exports = cinemasRouter
