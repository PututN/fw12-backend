const db = require('../helpers/db.helper')

const modelAllCinemas = (filter, cb) => {
  const sql = `SELECT * FROM cinemas WHERE name LIKE $3 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $1 OFFSET $2`;
  const values = [filter.limit, filter.offset, `%${filter.search}%`]
  db.query(sql, values, cb)
}
const selectCountAllCinemas = (filter, cb) => {
  const sql = `SELECT COUNT("name") AS "totalData" FROM "cinemas" WHERE name LIKE $1`;
  const values = [`%${filter.search}%`]
  db.query(sql, values, cb)
}

const modelCinemasId = (data, cb) => {
  const sql = `SELECT * FROM cinemas WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelDeleteCinemasId = (data, cb) => {
  const sql = `DELETE FROM cinemas WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelUpdateCinemasId = (data, id, cb) => {
  const sql = `UPDATE cinemas SET "picture" = COALESCE(NULLIF($1, ''), "picture"), "name" = COALESCE(NULLIF($2, ''), "name"), "address" = COALESCE(NULLIF($3, ''), "address"), "city" = COALESCE(NULLIF($4, ''), "city"), WHERE id =$5 RETURNING *`
  const value = [data.picture, data.name, data.address, data.city, id]
  db.query(sql,value,cb)
}

const modelCreateCinemas = (data, cb) => {
  const sql = 'INSERT INTO cinemas("picture", "name", "address", "city") VALUES($1, $2, $3, $4) RETURNING *';
  const value = [data.picture, data.name, data.address, data.city];
  db.query(sql, value, cb)

}

module.exports = {modelAllCinemas, modelCinemasId, modelDeleteCinemasId, modelUpdateCinemasId, modelCreateCinemas, selectCountAllCinemas}
