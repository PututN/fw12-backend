const movieSchedulesRouter = require('express').Router()
const {allMovieSchedules, movieScheduleId, deleteMovieSchedule, updateMovieSchedule, createMovieSchedule} = require('../controllers/movieSchedules.controller')

movieSchedulesRouter.get('/', allMovieSchedules)
movieSchedulesRouter.get('/:id', movieScheduleId)
movieSchedulesRouter.post('/', createMovieSchedule)
movieSchedulesRouter.delete('/:id', deleteMovieSchedule)
movieSchedulesRouter.patch('/:id', updateMovieSchedule )

module.exports = movieSchedulesRouter
