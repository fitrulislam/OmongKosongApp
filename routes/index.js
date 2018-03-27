const routes = require('express').Router()

routes.get('/',function(req,res){
  Forum.findAll().then(forums=>{
    let obj = {
      forums:forums
    }
    res.render('home/home.ejs',obj)
  })
})

routes.use('/forum',require('./forum.js'))

module.exports = routes
