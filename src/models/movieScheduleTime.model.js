const db = require('../helpers/db.helper')

const modelAllMovieScheduleTime = (data, cb) => {
  db.query('SELECT * FROM "movieScheduleTimes"', cb)
}

const modelDeleteMovieScheduleTime = (data, cb) => {
  const sql = `DELETE FROM "movieScheduleTimes" WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelUpdateMovieScheduleTime = (data, cb) => {
  const sql = 'UPDATE "movieScheduleTimes" SET "time" = $1, "movieScheduleId" = $4, "updateAt" = $3 WHERE id =$2 RETURNING *'
  const value = [data.body.time, data.params.id, new Date(), data.body.movieScheduleId]
  db.query(sql,value,cb)
}

const modeCreateMovieScheduleTime = (data, cb) => {
  const sql = 'INSERT INTO "movieScheduleTimes"("time", "movieScheduleId") VALUES($1, $2) RETURNING *';
  const value = [data.time, data.movieScheduleId];
  db.query(sql, value, cb)

}

module.exports = {modelUpdateMovieScheduleTime, modelAllMovieScheduleTime, modelDeleteMovieScheduleTime, modeCreateMovieScheduleTime}
