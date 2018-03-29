const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()
const PORT = 3000

app.locals.helper = require('./helpers/index')

app.set('view engine','ejs')

app.use(bodyParser.urlencoded({entended:false}))
app.use(session({
  secret: 'omong kosong',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.use('/',require('./routes'))

app.listen(PORT,()=>{
  console.log(`OmongKosong running in ${PORT}`)
})
