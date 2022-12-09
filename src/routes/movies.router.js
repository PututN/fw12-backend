const moviesRouter = require('express').Router()
const {allMovies, movieId, deleteMovieId, updateMovieId, createMovies, upComingMovies, nowShowing} = require('../controllers/movies.controller')
const authMiddleware = require('../middleware/auth.middleware')

moviesRouter.get('/', allMovies)
moviesRouter.get('/upComingMovies',upComingMovies )
moviesRouter.get('/nowShowing',nowShowing )
moviesRouter.get('/:id', movieId)
moviesRouter.post('/', authMiddleware,createMovies)
moviesRouter.delete('/:id', authMiddleware, deleteMovieId )
moviesRouter.patch('/:id', authMiddleware, updateMovieId )


module.exports = moviesRouter
