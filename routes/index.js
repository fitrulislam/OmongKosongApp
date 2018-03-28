const routes = require('express').Router()
const {Forum} = require('../models')

routes.get('/',function(req,res){
  Forum.findAll().then(forums=>{
    forums.forEach(forum=>{
      forum.newDetail = forum.getDetail()
    })
    let obj = {
      forums: forums,
      info: req.session
    }
    res.render('home/home.ejs',obj)
    // res.send
  })
})

routes.use('/user', require('./user'))
routes.use('/forum',require('./forum.js'))

module.exports = routes
