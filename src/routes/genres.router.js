const genresRouter = require('express').Router()
const {allGenre, deleteGenre, updateGenreId, createGenres} = require('../controllers/genres.controller')

genresRouter.get('/', allGenre)
genresRouter.post('/', createGenres)
genresRouter.delete('/:id', deleteGenre )
genresRouter.patch('/:id', updateGenreId )

module.exports = genresRouter
