const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json()) //untuk parsing json
app.use(express.urlencoded({extended:true})) //untuk form encode
app.use(cors()) // untuk membuka akses ke front end

app.use('/', require('./src/routes'))


app.get('/', (request, response) => { //buat informasi kalau backend kita bisa diakses atau tidak
  return response.status(200).json({
    success: true,
    message: "Backend is running well",
  }
  )
}
)
//membuka port app
app.listen(8888, () => {
  console.log('App listening on port 8888')
})

