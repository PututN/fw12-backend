const { Pool } = require("pg"); //pool ini digunakan untuk mengkoneksi dengan database postgree

const db = new Pool({
  connectionString : process.env.DATABASE_URL  //connectionstring untuk mengakses database
})

db.connect((err) =>{
  if(err) {
    console.log('database is not connect')
  } else{
    console.log('database is connect!')
  }
})

module.exports = db
