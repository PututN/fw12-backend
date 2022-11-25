const db = require('../helpers/db.helper')

const modelAllCasts = (filter, cb) => {
  const sql = `SELECT * FROM casts WHERE name LIKE $3 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $1 OFFSET $2`;
  const values = [filter.limit, filter.offset, `%${filter.search}%`]
  db.query(sql, values, cb)
}
const selectCountAllCasts = (filter, cb) => {
  const sql = `SELECT COUNT("name") AS "totalData" FROM "casts" WHERE name LIKE $1`;
  const values = [`%${filter.search}%`]
  db.query(sql, values, cb)
}

const modelDeleteCasts = (data, cb) => {
  const sql = `DELETE FROM casts WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelUpdateCasts = (data, id, cb) => {
  const sql = `UPDATE casts SET "name" = COALESCE(NULLIF($1,''), "name") WHERE id =$2 RETURNING *`
  const value = [data.name, id]
  db.query(sql,value,cb)
}

const modelCreateCasts = (data, cb) => {
  const sql = 'INSERT INTO casts("name") VALUES($1) RETURNING *';
  const value = [data.name];
  db.query(sql, value, cb)

}

module.exports = {modelAllCasts, selectCountAllCasts, modelDeleteCasts, modelUpdateCasts, modelCreateCasts}
