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
   var email = req.body.email;
   var pass = req.body.pass;
   User.login(email, pass, function(err, user) {
      if(err) {
         res.status(400).send('error');
      } else if (user == null) {
         res.status(403).send('invalid');
      } else if (!user.active) {
         res.status(403).send('inactive');
      } else {
         var session = {};
         session.entity = entity;
         session.user = {
            name: user.name,
            std: user.std
         };
         session.token = cn.token;
         res.status(200).json(session);  
      }
   });
});

module.exports = router