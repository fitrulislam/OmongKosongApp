const routes = require('express').Router()
const {Forum,Comment,User} = require('../models')

routes.get('/',function(req,res){
  Forum.findAll({
    where: {
      userId: req.session.user.id
    }
  }).then(forums=>{
    let obj = {
      forums:forums
    }
    res.render('forum/forum.ejs',obj)
  })
})

routes.get('/:id/detail',function(req,res){
  Forum.findOne({
    where: {
      id: req.params.id
    },
    include:[{
      model: Comment,
      include: User
    }]
  }).then(forum=>{
    let obj = {
      forum:forum
    }
    res.render('forum/detail.ejs',obj)
  })
})

routes.post('/:id/detail',function(req,res){
  Comment.create({
    ForumId: req.body.forumId,
    UserId: req.session.user.id,
    content: req.body.comment,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(()=>{
    res.redirect(`/forum/${req.body.forumId}/detail`)
  }).catch(err=>{
    console.log(err.message)
  })
})

routes.get('/add',function(req,res){
  let obj = {
    userId: req.session.user.id
  }
  res.render('forum/add.ejs',obj)
})

routes.post('/add',function(req,res){
  Forum.create({
    name: req.body.newName,
    userId: req.body.id,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(()=>{
    res.redirect('/forum')
  }).catch(err=>{
    console.log(err.message)
  })
})

routes.get('/:id/edit',function(req,res){
  Forum.findById(req.params.id).then(forum=>{
    let obj = {
      name: forum.name,
      userId: forum.userId
    }
    res.render('forum/edit.ejs',obj)
  })
})

routes.post('/:id/edit',function(req,res){
  Forum.update({
    name: req.body.newName,
    updatedAt: new Date()
  }).then(()=>{
    res.redirect(`/forum`)
  }).catch(err=>{
    console.log(err.message)
  })
})

routes.get('/:id/delete',function(req,res){
  Forum.destroy({
    where: {
      id: req.params.id
    }
  }).then(()=>{
    res.redirect('/forum')
  }).catch(err=>{
    console.log(err.message)
  })
})

module.exports = routes
