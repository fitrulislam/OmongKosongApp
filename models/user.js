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
    let nameRandom = ['ayam','angsa','anjing','anoa','babi','bangau','bison','cicak','capung','cacing','domba','dinosaurus','entok','elang','flaminggo','gajah','harimau','ikan','itik','jaguar','kancil','kerbau','lintah','lutung','monyet','nyamuk','oranghutan','rusa','singa','ular','zebra']
    user.name = nameRandom[Math.floor(Math.random()*nameRandom.length)];
  });

  User.changeName = function (id) {
    return new Promise((resolve, reject) => {
      User.findById(id)
      .then(user => {
        let nameRandom = ['ayam','angsa','anjing','anoa','babi','bangau','bison','cicak','capung','cacing','domba','dinosaurus','entok','elang','flaminggo','gajah','harimau','ikan','itik','jaguar','kancil','kerbau','lintah','lutung','monyet','nyamuk','oranghutan','rusa','singa','ular','zebra']
        let obj = {
          username: user.username,
          password: user.password,
          name: nameRandom[Math.floor(Math.random()*nameRandom.length)]
        }
        user.update(obj)
        .then(info => {
          console.log(info)
          resolve(info)
        })
        .catch(err => {
          reject(err)
        })
      })
      .catch(err => {
        reject(err)
      })
    })
  };

  return User;
};