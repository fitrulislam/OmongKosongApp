const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000

app.set('view engine','ejs')

app.use(bodyParser.urlencoded({entended:false}))

app.use('/',require('./routes'))

app.listen(PORT,()=>{
  console.log(`OmongKosong running in ${PORT}`)
})
