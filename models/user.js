'use strict';
const crypto = require('crypto'),
   algorithm = 'aes-256-ctr',
    password = 'FitrulWika';

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
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Forum,{through:models.Comment})
    User.hasMany(models.Comment)
  };

  User.hook('beforeCreate', (user, options) => {
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(user.password,'utf8','hex')
    crypted += cipher.final('hex');

    user.password = crypted

    let nameRandom = ['apel','ayam','angsa','anjing','anoa','babi','badak','bangau','bison','cicak','curut','capung','cacing','domba','dinosaurus','entog','elang','flaminggo','gajah','harimau','hiu','ikan','itik','jaguar','jerapah','kancil','kerbau','lintah','lutung','monyet','nyamuk','oranghutan','rusa','singa','ular','zebra']
    user.name = nameRandom[Math.floor(Math.random()*nameRandom.length)];
  });

  User.hook('beforeUpdate', (user, options) => {
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(user.password,'utf8','hex')
    crypted += cipher.final('hex');

    user.password = crypted
  });

  User.changeName = function (idInput) {
    return new Promise((resolve, reject) => {
      User.findAll({
        where: {
          id: idInput
        }
      })
      .then(profile => {
        let nameRandom = ['apel','ayam','angsa','anjing','anoa','babi','badak','bangau','bison','cicak','curut','capung','cacing','domba','dinosaurus','entog','elang','flaminggo','gajah','harimau','hiu','ikan','itik','jaguar','jerapah','kancil','kerbau','lintah','lutung','monyet','nyamuk','oranghutan','rusa','singa','ular','zebra']
        let obj = {
          id: idInput,
          username: profile.username,
          password: profile.password,
          name: nameRandom[Math.floor(Math.random()*nameRandom.length)]
        }
        User.update(obj, {
          where: {
            id: idInput
          }
        })
        .then(info => {
          console.log(obj)
          resolve(obj)
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
