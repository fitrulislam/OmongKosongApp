'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: {
          args: true,
          msg: 'must Alphabetic'
        },
        isUsernameUnique(value, next){
          User.findOne({
            where: {
              username: value
            }
          })
          .then(info => {
            if(info){
              next('Username sudah digunakan')
            } else {
              next('')
            }
          })
          .catch(err => {
            next(err)
          })
        }
      }
    },
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Forum,{through:models.Comment})
    User.hasMany(models.Comment)
  };

  User.hook('beforeCreate', (user, options) => {
    let nameRandom = ['apel','ayam','angsa','anjing','anoa','babi','badak','bangau','bison','cicak','curut','capung','cacing','domba','dinosaurus','entog','elang','flaminggo','gajah','harimau','hiu','ikan','itik','jaguar','jerapah','kancil','kerbau','lintah','lutung','monyet','nyamuk','oranghutan','rusa','singa','ular','zebra']
    user.name = nameRandom[Math.floor(Math.random()*nameRandom.length)];
  });

  User.changeName = function (id) {
    return new Promise((resolve, reject) => {
      User.findById(id)
      .then(user => {
        let nameRandom = ['apel','ayam','angsa','anjing','anoa','babi','badak','bangau','bison','cicak','curut','capung','cacing','domba','dinosaurus','entog','elang','flaminggo','gajah','harimau','hiu','ikan','itik','jaguar','jerapah','kancil','kerbau','lintah','lutung','monyet','nyamuk','oranghutan','rusa','singa','ular','zebra']
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
