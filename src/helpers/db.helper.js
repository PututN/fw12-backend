const { Pool } = require("pg"); //pool ini digunakan untuk mengkoneksi dengan database postgree

const db = new Pool({
  connectionString : "postgresql://postgres:wHnovejTB1OrDAYg@db.vdvuzjwzxhxcslxaeabs.supabase.co:5432/postgres"  //connectionstring untuk mengakses database
})

db.connect((err) =>{
  if(err) {
    console.log('database is not connect')
  } else{
    console.log('database is connect!')
  }
})

module.exports = db
