const errorHandler =  (err, res) => {
  console.log(err)
  if(err.message.includes('Only png,jpg and jpeg format allowed')){
    return res.status(400).json({
      success: false,
      message: "Only png, jpg and jpeg format allowed"
    })
  }
  if(err.message.includes('File too large')) {
    return res.status(400).json({
      success: false,
      message: "File too large, please upload less than 1MB"
    })

  }
  if(err.message.includes('duplicate key value violates unique constraint "email"') || err.message.includes('unique_email') ) {
    return res.status(400).json({
      success: false,
      message: "Email already exists"
    })
  } else if (err.message.includes('duplicate key value violates unique constraint "name"') || err.message.includes('unique_name')) {
    return res.status(400).json({
      success: false,
      message: "Name already exists"
    })
  }
  return res.status(500).json({
    success: false,
    message: "Something happend in our backend"
  })
}

module.exports = errorHandler
