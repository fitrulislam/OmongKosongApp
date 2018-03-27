'use strict';
module.exports = (sequelize, DataTypes) => {
  var Forum = sequelize.define('Forum', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Forum.associate = function(models) {
    // associations can be defined here
  };
  return Forum;
};
