const express = require('express')

const app = express()

app.use('/', require('./src/routes'))

app.get('/', (request, response) => {
  return response.status(200).json({
    success: true,
    message: "Backend is running well"
  }
  )
})


//membuka port app
app.listen(8888, () => {
  console.log('App listening on port 8888')
})
