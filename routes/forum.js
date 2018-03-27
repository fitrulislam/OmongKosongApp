const routes = require('express').Router()

routes.get('/forum',function(req,res){
  res.render('home/home.ejs')
})

module.exports = routes
