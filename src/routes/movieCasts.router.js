const movieCastsRouter = require('express').Router()
const {allMovieCasts, deleteMovieCasts, updateMovieCasts, createMovieCasts} = require('../controllers/movieCasts.controller')

movieCastsRouter.get('/', allMovieCasts)
movieCastsRouter.post('/', createMovieCasts)
movieCastsRouter.delete('/:id', deleteMovieCasts)
movieCastsRouter.patch('/:id', updateMovieCasts)

module.exports = movieCastsRouter
