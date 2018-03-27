'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    ForumId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    ParentId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};