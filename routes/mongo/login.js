var express = require('express');
var router = express.Router()

var cn = require('../../config');
var Cnf = require('../../db/mongo/cnf');
var User = require('../../db/mongo/user');


var entity = {};

router.use(function timeLog (req, res, next) {

   console.log('Routing login at ', Date.now());

   var promise = Cnf
      .findOne({})
      .exec();

   promise
      .then(function(result) {
         entity = result.entity;
      })
      .catch(function(err) {
         res.status(400).send(err);  
      });

  next();
});

router.post('/', function(req, res) {

  var data = JSON.parse(Object.keys(req.body)[0]);

   User
    .getByLogin(data.email, data.pass)
    .then(function(user) {
      console.log('user', user)
      if (user === null) {
        res.status(403).send('invalid');
      } else if (!user.active) {
        res.status(403).send('inactive');
      } else {
        var session = {
          entity: entity,
          user: {
            name: user.name,
            std: user.std
          },
          token: cn.token
        }
        res.status(200).json(session);  
      }
    })
    .catch(function(err) {
      res.status(400).send(err);  
    });  

});

module.exports = router;