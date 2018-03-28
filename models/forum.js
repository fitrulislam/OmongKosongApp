'use strict';
module.exports = (sequelize, DataTypes) => {
  var Forum = sequelize.define('Forum', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    detail: DataTypes.STRING
  }, {});
  Forum.associate = function(models) {
    Forum.belongsToMany(models.User,{through:models.Comment})
    Forum.hasMany(models.Comment)
  };
  return Forum;
};
