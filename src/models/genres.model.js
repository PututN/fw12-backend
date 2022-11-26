const db = require('../helpers/db.helper')

const modelGenres = (filter, cb) => {
  const sql = `SELECT * FROM genre WHERE name LIKE $3 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $1 OFFSET $2`;
  const values = [filter.limit, filter.offset, `%${filter.search}%`]
  db.query(sql, values, cb)
}
const selectCountAllGenre = (filter, cb) => {
  const sql = `SELECT COUNT("name") AS "totalData" FROM "genre" WHERE name LIKE $1`;
  const values = [`%${filter.search}%`]
  db.query(sql, values, cb)
}

const modelDeleteGenre = (data, cb) => {
  const sql = `DELETE FROM genre WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelUpdateGenre = (data, id, cb) => {
  const sql = `UPDATE genre SET "name" = COALESCE(NULLIF($1,''), "name") WHERE id =$2 RETURNING *`
  const value = [data.name, id]
  db.query(sql,value,cb)
}

const modelCreateGenre = (data, cb) => {
  const sql = 'INSERT INTO genre("name") VALUES($1) RETURNING *';
  const value = [data.name];
  db.query(sql, value, cb)

}

module.exports = {modelGenres, modelDeleteGenre, modelUpdateGenre, modelCreateGenre, selectCountAllGenre}
