const db = require('../helpers/db.helper')

const modelMovies = (data, cb) => {
  db.query('SELECT * FROM movies', cb)
}

const modelmovieId = (data, cb) => {
  const sql = `SELECT * FROM movies WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelDeleteMovie = (data, cb) => {
  const sql = `DELETE FROM movies WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelUpdateMovie = (data, cb) => {
  const sql = 'UPDATE movies SET "title" = $1, "picture" = $2, "releaseDate" = $3, "director" = $4, "duration" = $5, "synopsis" = $6, "updateAt" = $8 WHERE id =$7 RETURNING *'
  const value = [data.body.title, data.body.picture, data.body.releaseDate, data.body.director, data.body.duration, data.body.synopsis, data.params.id, new Date()]
  db.query(sql,value,cb)
}

const modelCreateMovie = (data, cb) => {
  const sql = 'INSERT INTO movies("title", "picture", "releaseDate", "director", "duration", "synopsis") VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
  const value = [data.title, data.picture, data.releaseDate, data.director, data.duration, data.synopsis];
  db.query(sql, value, cb)

}

module.exports = {modelMovies, modelmovieId, modelDeleteMovie, modelUpdateMovie, modelCreateMovie}
