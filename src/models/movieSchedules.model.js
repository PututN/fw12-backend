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

const modelUpdateMovieSchedule = (data, id, cb) => {
  const sql = `UPDATE "movieSchedules" SET "movieId" = COALESCE(NULLIF($1, '')::INTEGER, "movieId"), "cinemaId" = COALESCE(NULLIF($2, '')::INTEGER, "cinemaId"), "price" = COALESCE(NULLIF($3, '')::BIGINT, "price"), "startDate" = COALESCE(NULLIF($4, '')::DATE, "startDate"), "endDate" = COALESCE(NULLIF($5, '')::DATE, "endDate") WHERE id =$6 RETURNING *`
  const value = [data.movieId, data.cinemaId, data.price, data.startDate, data.endDate, id]
  db.query(sql,value,cb)
}

const modelCreateMovieSchedule = (data, cb) => {
  const sql = 'INSERT INTO "movieSchedules"("movieId", "cinemaId", "price", "startDate", "endDate") VALUES($1, $2, $3, $4, $5) RETURNING *';
  const value = [data.movieId, data.cinemaId, data.price, data.startDate, data.endDate];
  db.query(sql, value, cb)

}

module.exports = {modelAllMovieSchedules, modelMovieScheduleId, modelDeleteMovieSchedule, modelUpdateMovieSchedule, modelCreateMovieSchedule}

