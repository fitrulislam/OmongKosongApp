'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };

  User.hook('beforeCreate', (user, options) => {
    let nameRandom = ['bebek', 'kucing', 'burung', 'singa', 'anjing','ikan','onta','gajah','marmut','angsa','cicak','buaya','monyet']
    user.name = nameRandom[Math.floor(Math.random()*nameRandom.length)];
  });

  return User;
};