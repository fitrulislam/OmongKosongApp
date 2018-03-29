const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()
const port = process.env.PORT || 4000

app.locals.helper = require('./helpers/index')

app.set('view engine','ejs')

app.use(bodyParser.urlencoded({entended:false}))
app.use(session({
  secret: 'omong kosong',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000 }
}))

app.use('/',require('./routes'))

app.listen(port,()=>{
  console.log(`OmongKosong running in ${port}`)
})
