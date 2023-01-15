const errorHandler =require('../helpers/errorHandler.helper')
const {getScheduleByCityModel} = require('../models/movieDetail.model')


exports.getScheduleByCity = (req, res) => {
  console.log(req.params.id)
  getScheduleByCityModel(req.params.id, req.query.date, (err, result) => {
    if(err) {
      return errorHandler(err,res)
  }
  return res.status(200).json({
    success: true,
    message: "Data Movie Genre success loaded",
    results: result.rows
  }
  )
});
};
