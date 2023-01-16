const movieDetail = require("express").Router();
const {
  getScheduleByCity,
  getScheduleByMovieId,
} = require("../controllers/movieDetail.controller");

movieDetail.get("/:id/schedules/city", getScheduleByCity);
movieDetail.get("/:id/schedules", getScheduleByMovieId);

module.exports = movieDetail;
