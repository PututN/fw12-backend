const errorHandler = require("../helpers/errorHandler.helper");
const {
  getScheduleByCityModel,
  getScheduleByMovieModel,
} = require("../models/movieDetail.model");

exports.getScheduleByCity = (req, res) => {
  getScheduleByCityModel(req.params.id, req.query.date, (err, result) => {
    if (err) {
      return errorHandler(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Data Movie Genre success loaded",
      results: result.rows,
    });
  });
};

exports.getScheduleByMovieId = (req, res) => {
  getScheduleByMovieModel(
    req.params.id,
    req.query.city,
    req.query.date,
    (err, result) => {
      if (err) {
        return errorHandler(err, res);
      }
      return res.status(200).json({
        success: true,
        message: "Schedule success loaded",
        results: result.rows,
      });
    }
  );
};
