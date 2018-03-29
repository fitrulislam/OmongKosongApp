const routes = require('express').Router()
const {Forum,Comment,User} = require('../models')
const forAuth = require('../middleware/forAuth.js')
const {comment,respond} = require('../helpers/email.js')

routes.get('/', forAuth.isLogin, function(req,res){
  Forum.findAll({
    where: {
      userId: req.session.user.id
    }
  })
  .then(forums=>{
    let obj = {
      forums:forums,
      info: req.session
    }
    res.render('forum/forum.ejs',obj)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
})

routes.get('/:id/detail',function(req,res){
  Forum.findOne({
    where: {
      id: req.params.id
    }
  }).then(forum=>{
    Comment.getChild(req.params.id).then(comments=>{
      User.findOne({
        where: {
          id: forum.userId
        }
      }).then(user=>{
        let obj = {
          forum: forum,
          comments: comments,
          user: user,
          info: req.session
        }
        res.render('forum/detail.ejs',obj)
      })
    })
  })
})

routes.post('/:id/detail',forAuth.isLogin,function(req,res){
  let input = req.body
  let replace
  if(input.parentId==''){
    replace = null
    comment(input.email,req.session.user.name,input.forumName)
  } else {
    replace = input.parentId
    respond(input.email,req.session.user.name,input.forumName)
  }
  Comment.create({
    ForumId: input.forumId,
    UserId: req.session.user.id,
    alias: req.session.user.name,
    content: input.comment,
    ParentId: replace,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(()=>{
    res.redirect(`/forum/${req.body.forumId}/detail`)
  }).catch(err=>{
    console.log(err.message)
  })
})

routes.get('/add',forAuth.isLogin,function(req,res){
  let obj = {
    userId: req.session.user.id,
    info: req.session
  }
  res.render('forum/add.ejs',obj)
})

routes.post('/add',forAuth.isLogin,function(req,res){
  let input = req.body
  Forum.create({
    name: input.newName,
    userId: input.id,
    detail: input.newDetail,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(()=>{
    res.redirect('/forum')
  }).catch(err=>{
    console.log(err.message)
  })
})

routes.get('/:id/edit',forAuth.isLogin,function(req,res){
  Forum.findById(req.params.id).then(forum=>{
    let obj = {
      name: forum.name,
      userId: forum.userId,
      detail: forum.detail,
      info: req.session
    }
    res.render('forum/edit.ejs',obj)
  })
})

routes.post('/:id/edit',forAuth.isLogin,function(req,res){
  let input = req.body
  Forum.findById(req.params.id)
  .then(forum => {
    forum.update({
      name: input.newName,
      detail: input.newDetail,
      updatedAt: new Date()
    }).then(()=>{
      res.redirect(`/forum`)
    }).catch(err=>{
      console.log(err.message)
    })
  })
  .catch(err=>{
    console.log(err.message)
  })
})

routes.get('/:id/delete',forAuth.isLogin,function(req,res){
  Forum.destroy({
    where: {
      id: req.params.id,
    }
  }).then(()=>{
    res.redirect('/forum')
  }).catch(err=>{
    console.log(err.message)
  })
})

module.exports = routes
