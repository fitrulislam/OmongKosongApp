const routes = require('express').Router()

routes.get('/',function(req,res){

  // res.render('home/home.ejs')
  // res.send(req.session)
  let obj= {
    info: req.session
  }
  res.render('home/home.ejs', obj)
})

routes.use('/user', require('./user'))

  Forum.findAll().then(forums=>{
    let obj = {
      forums:forums
    }
    res.render('home/home.ejs',obj)
  })
})

routes.use('/forum',require('./forum.js'))


module.exports = routes
