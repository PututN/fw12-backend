const db = require('../helpers/db.helper')

const modelAllStatus = (data, cb) => {
  db.query('SELECT * FROM status', cb)
}

const modelDeleteStatus = (data, cb) => {
  const sql = `DELETE FROM status WHERE id=$1`
  const value = [data.id]
  db.query(sql, value, cb)
}

const modelUpdateStatus = (data, cb) => {
  const sql = 'UPDATE status SET "name" = $1, "updateAt" = $3 WHERE id =$2 RETURNING *'
  const value = [data.body.name, data.params.id, new Date()]
  db.query(sql,value,cb)
}

const modelCreateStatus = (data, cb) => {
  const sql = 'INSERT INTO status("name") VALUES($1) RETURNING *';
  const value = [data.name];
  db.query(sql, value, cb)

}

module.exports = {modelAllStatus, modelDeleteStatus, modelUpdateStatus, modelCreateStatus}
