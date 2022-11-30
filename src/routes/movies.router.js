const moviesRouter = require('express').Router()
const {allMovies, movieId, deleteMovieId, updateMovieId, createMovies, upComingMovies, nowShowing} = require('../controllers/movies.controller')

moviesRouter.get('/', allMovies)
moviesRouter.get('/upComingMovies',upComingMovies )
moviesRouter.get('/nowShowing',nowShowing )
moviesRouter.get('/:id', movieId)
moviesRouter.post('/', createMovies)
moviesRouter.delete('/:id', deleteMovieId )
moviesRouter.patch('/:id', updateMovieId )


module.exports = moviesRouter
