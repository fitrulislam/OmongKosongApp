const routes = require('express').Router()
const {Forum,Comment,User} = require('../models')
const forAuth = require('../middleware/forAuth.js')

routes.get('/',function(req,res){
  Forum.findAll({
    where: {
      userId: req.session.user.id
    }
  }).then(forums=>{
    let obj = {
      forums:forums,
      info: req.session
    }
    res.render('forum/forum.ejs',obj)
  })
})

routes.get('/:id/detail',function(req,res){
  Forum.findOne({
    where: {
      id: req.params.id
    }
  }).then(forum=>{
    Comment.getChild(req.params.id).then(comments=>{
      let obj = {
        forum: forum,
        comments: comments,
        info: req.session
      }
      res.render('forum/detail.ejs',obj)
    })
  })
})

routes.post('/:id/detail',forAuth.isLogin,function(req,res){
  let replace = req.body.parentId
  if(req.body.parentId==''){
    replace = null
  }
  Comment.create({
    ForumId: req.body.forumId,
    UserId: req.session.user.id,
    alias: req.session.user.name,
    content: req.body.comment,
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
  Forum.create({
    name: req.body.newName,
    userId: req.body.id,
    detail: req.body.newDetail,
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
  Forum.findById(req.params.id)
  .then(forum => {
    forum.update({
      name: req.body.newName,
      detail: req.body.newDetail,
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
