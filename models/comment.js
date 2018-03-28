'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ForumId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    alias: DataTypes.STRING,
    content: DataTypes.STRING,
    ParentId: DataTypes.INTEGER
  }, {});

  Comment.getChild = function(id){
    return new Promise(function(resolve, reject) {
      Comment.findAll({
        where: {
          ForumId: id
        }
      }).then(comments=>{
        let promCC = comments.map(comment=>{
          return new Promise(function(resolve, reject) {
            comment.getComments().then(innerComment=>{
              comment.comments = innerComment
              resolve(comment)
            })
            .catch(err=>{
              reject(err)
            })
          });
        })
        Promise.all(promCC).then(newComment=>{
          resolve(newComment)
        }).catch(err=>{
          reject(err)
        })
      })
    });
  }

  Comment.associate = function(models) {
    Comment.belongsTo(models.Forum)
    Comment.belongsTo(models.User)
    Comment.belongsTo(Comment,{foreignKey: 'ParentId'})
    Comment.hasMany(Comment,{foreignKey: 'ParentId'})
  };
  return Comment;
};
