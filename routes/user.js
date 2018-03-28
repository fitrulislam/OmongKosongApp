const routes = require('express').Router()
const models = require('../models')
const forAuth = require('../middleware/forAuth.js')

routes.get('/signup', (req, res) => {
  let obj = {
    info: req.session,
    err: req.query.err
  }
  res.render('./user/signup',obj)
})

routes.post('/signup', (req, res) => {
  let obj = {
    username: req.body.username,
    password: req.body.password
  }

  models.User.create(obj)
    .then(profile => {
      req.session.user = {
        id: profile.id,
        name: profile.name,
        username: profile.username,
        password: profile.password,
      }
      req.session.status = true
      res.redirect('/')
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/user/signup?err=${err.message}`)
    })
})

routes.get('/profile', forAuth.isLogin, (req, res) => {
  let obj= {
    heads: ['Username', 'Password', 'Name Alias'],
    info: req.session
  }
  // res.send(req.session)
  res.render('user/readProfile', obj)
})

routes.get('/:id/editProfile', forAuth.isLogin, (req, res) => {
  models.User.findById(req.params.id)
  .then(data => {
    let obj = {
      user: data,
      info: req.session
    }
    res.render('user/editProfile', obj)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
})

routes.post('/:id/editProfile', forAuth.isLogin, (req, res) => {
  // res.send(req.body)
  let obj = {
    username: req.body.username,
    password: req.body.password
  }
  req.session.user.username= req.body.username,
  req.session.user.password= req.body.password

  req.session.status = true
  models.User.findById(req.params.id)
  .then(data => {
    data.update(obj)
    then(info => {
      res.redirect('/')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
})

routes.get('/logout', forAuth.isLogin, (req, res) => {
  req.session.destroy(function(err) {
    res.redirect('/')
  })
})

routes.get('/login',(req, res) => {
  let obj = {
    info: req.session,
    err: ''
  }
  res.render('./user/login',obj)
})

routes.post('/login',(req, res) => {
  models.User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(profile => {
    if(!profile) {
      let obj = {
        info: req.session,
        err: 'username salah'
      }
      res.render('./user/login',obj)
    } else {
      if(profile.password != req.body.password) {
        let obj = {
          info: req.session,
          err: 'password salah'
        }
        res.render('./user/login',obj)
      } else {
        models.User.changeName(profile.id)
        .then(profile => {
          req.session.user = {
            id: profile.id,
            name: profile.name,
            username: profile.username,
            password: profile.password,
          }
          req.session.status = true
          res.redirect('/')
        })
        .catch(err => {
          console.log(err)
          res.redirect('/')
        })
      }
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
})

module.exports = routes
