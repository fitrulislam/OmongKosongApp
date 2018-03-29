'use strict';
module.exports = (sequelize, DataTypes) => {
  var Forum = sequelize.define('Forum', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    detail: DataTypes.STRING
  }, {});

  Forum.prototype.getDetail = function(){
    if(this.detail.length>=45){
      let newDetail = ''
      for(let i=0; i<45; i++){
        newDetail += this.detail[i]
      }
      newDetail += '.....'
      return newDetail
    } else {
      return this.detail
    }
  }

  Forum.associate = function(models) {
    Forum.belongsToMany(models.User,{through:models.Comment})
    Forum.hasMany(models.Comment)
  };
  return Forum;
};
