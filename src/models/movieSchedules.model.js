const db = require('../helpers/db.helper')

const modelAllMovieSchedules = (data, cb) => {
  db.query('SELECT * FROM "movieSchedules"', cb)
}

const modelMovieScheduleId = (data, cb) => {
  const sql = `SELECT * FROM "movieSchedules" WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelDeleteMovieSchedule = (data, cb) => {
  const sql = `DELETE FROM "movieSchedules" WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelUpdateMovieSchedule = (data, cb) => {
  const sql = 'UPDATE "movieSchedules" SET "movieId" = $1, "cinemaId" = $2, "price" = $3, "startDate" = $4, "endDate" = $5, "updateAt" = $7 WHERE id =$6 RETURNING *'
  const value = [data.body.movieId, data.body.cinemaId, data.body.price, data.body.startDate, data.body.endDate, data.params.id, new Date()]
  db.query(sql,value,cb)
}

const modelCreateMovieSchedule = (data, cb) => {
  const sql = 'INSERT INTO "movieSchedules"("movieId", "cinemaId", "price", "startDate", "endDate") VALUES($1, $2, $3, $4, $5) RETURNING *';
  const value = [data.movieId, data.cinemaId, data.price, data.startDate, data.endDate];
  db.query(sql, value, cb)

}

module.exports = {modelAllMovieSchedules, modelMovieScheduleId, modelDeleteMovieSchedule, modelUpdateMovieSchedule, modelCreateMovieSchedule}

