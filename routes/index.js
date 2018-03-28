const routes = require('express').Router()
const {Forum} = require('../models')

routes.get('/',function(req,res){
  Forum.findAll().then(forums=>{
    let obj = {
      forums: forums,
      info: req.session
    }
    res.render('home/home.ejs',obj)
  })
})

routes.use('/user', require('./user'))
routes.use('/forum',require('./forum.js'))

module.exports = routes
