const db = require('../helpers/db.helper')

const modelAllMovieCasts = (data, cb) => {
  db.query('SELECT * FROM "movieCasts"', cb)
}

const modelDeleteMovieCasts = (data, cb) => {
  const sql = `DELETE FROM "movieCasts" WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelUpdateMovieCasts = (data, id, cb) => {
  const sql = `UPDATE "movieCasts" SET "movieId" = COALESCE(NULLIF($1, '')::INTEGER, "movieId"), "castsId" = COALESCE(NULLIF($3, ''):: INTEGER, "castsId") WHERE id =$2 RETURNING *`
  const value = [data.movieId, id, data.castsId]
  db.query(sql,value,cb)
}

const modelCreateMovieCasts = (data, cb) => {
  const sql = 'INSERT INTO "movieCasts"("movieId", "castsId") VALUES($1, $2) RETURNING *';
  const value = [data.movieId, data.castsId];
  db.query(sql, value, cb)

}

module.exports = {modelUpdateMovieCasts, modelAllMovieCasts, modelDeleteMovieCasts, modelCreateMovieCasts}
