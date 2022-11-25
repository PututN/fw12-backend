const db = require('../helpers/db.helper')

const modelAllMovieGenre = (data, cb) => {
  db.query('SELECT * FROM "movieGenre"', cb)
}

const modelDeleteMovieGenre = (data, cb) => {
  const sql = `DELETE FROM "movieGenre" WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelUpdateMovieGenre = (data, id, cb) => {
  const sql = `UPDATE "movieGenre" SET "movieId" = COALESCE(NULLIF($1, '')::INTEGER, "movieId"), "genreId" = COALESCE(NULLIF($3, '')::INTEGER, "genreId") WHERE id =$2 RETURNING *`
  const value = [data.movieId, id, data.genreId]
  db.query(sql,value,cb)
}

const modelCreateMovieGenre = (data, cb) => {
  const sql = 'INSERT INTO "movieGenre"("movieId", "genreId") VALUES($1, $2) RETURNING *';
  const value = [data.movieId, data.genreId];
  db.query(sql, value, cb)

}

module.exports = {modelUpdateMovieGenre, modelAllMovieGenre, modelDeleteMovieGenre, modelCreateMovieGenre}
