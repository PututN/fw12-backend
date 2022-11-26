const db = require('../helpers/db.helper')

const modelMovies = (filter, cb) => {
  const sql = `SELECT * FROM movies WHERE title LIKE $3 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $1 OFFSET $2`;
  const values = [filter.limit, filter.offset, `%${filter.search}%`]
  db.query(sql, values, cb)
}
const selectCountAllMovies = (filter, cb) => {
  const sql = `SELECT COUNT("title") AS "totalData" FROM "movies" WHERE title LIKE $1`;
  const values = [`%${filter.search}%`]
  db.query(sql, values, cb)
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

const modelUpdateMovie = (data, id, cb) => {
  const sql = `UPDATE movies SET "title" = COALESCE(NULLIF($1, ''), "title"), "picture" = COALESCE(NULLIF($2, ''), "picture"), "releaseDate" = COALESCE(NULLIF($3, '')::timestamptz, "releaseDate"), "director" = COALESCE(NULLIF($4, ''), "director"), "duration" = COALESCE(NULLIF($5, '')::time, "duration"), "synopsis" = COALESCE(NULLIF($6, ''), "synopsis") WHERE id =$7 RETURNING *`
  const value = [data.title, data.picture, data.releaseDate, data.director, data.duration, data.synopsis, id]
  db.query(sql,value,cb)
}

const modelCreateMovie = (data, cb) => {
  const sql = 'INSERT INTO movies("title", "picture", "releaseDate", "director", "duration", "synopsis") VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
  const value = [data.title, data.picture, data.releaseDate, data.director, data.duration, data.synopsis];
  db.query(sql, value, cb)

}

module.exports = {modelMovies, modelmovieId, modelDeleteMovie, modelUpdateMovie, modelCreateMovie, selectCountAllMovies}
