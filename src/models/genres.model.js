const db = require('../helpers/db.helper')

const modelGenres = (data, cb) => {
  db.query('SELECT * FROM genre', cb)
}

const modelDeleteGenre = (data, cb) => {
  const sql = `DELETE FROM genre WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelUpdateGenre = (data, cb) => {
  const sql = 'UPDATE genre SET "name" = $1, "updateAt" = $3 WHERE id =$2 RETURNING *'
  const value = [data.body.name, data.params.id, new Date()]
  db.query(sql,value,cb)
}

const modelCreateGenre = (data, cb) => {
  const sql = 'INSERT INTO genre("name") VALUES($1) RETURNING *';
  const value = [data.name];
  db.query(sql, value, cb)

}

module.exports = {modelGenres, modelDeleteGenre, modelUpdateGenre, modelCreateGenre}
