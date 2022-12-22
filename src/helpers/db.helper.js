// const { Pool } = require("pg"); //pool ini digunakan untuk mengkoneksi dengan database postgree

// const db = new Pool({
//   connectionString : "postgresql://postgres:p72PNbhuqSn#!wh@db.bgsgrtonoxhwpujndgfh.supabase.co:5432/postgres"  //connectionstring untuk mengakses database
// })
const { Pool } = require('pg')

const db = new Pool({
  host: 'db.bgsgrtonoxhwpujndgfh.supabase.co',
  port: 5432,
  user: 'postgres',
  password: 'p72PNbhuqSn#!wh',
  database: 'postgres'
})

db.connect((err) =>{
  if(err) {
    console.log(err)
    console.log('database is not connect')
  } else{
    console.log('database is connect!')
  }
})

module.exports = db
