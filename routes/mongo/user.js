var express = require('express');
var router = express.Router();

var User = require('../../db/mongo/user');

router.use(function timeLog (req, res, next) {
  console.log('Routing user at ', Date.now());
  console.log('User', User)
  next();
});

router.get('/', function(req, res) {

   var promise = User.find()
      .sort({'email': 1})
      .exec();

   promise
      .then(function(users) {
         res.status(200).json(users);
      })
      .catch(function(err) {
         res.status(400).send(err)
      });
});

router.get('/:_id', function(req, res) {

   if (req.params._id == 0) {

      var user = new User();
      data = {
         _id: '0',
         name: user.name,
         fullname: user.fullname,
         email: user.email,
         pass:user.pass,
         active:user.active,
         std:user.std
      }

      res.status(200).json(data);

   } else {

      var promise = User.findById(req.params._id, 'name fullname email pass active std').exec();
      promise
         .then(function(user) {
            res.status(200).json(user);
         })
         .catch(function(err) {
            res.status(400).send(err);  
         });  
   }
});

router.post('/', function (req, res) {   

   var data = {
      email: req.body.email,
      fullname: req.body.fullname,
      name: req.body.name,
      pass: req.body.pass,
      active: req.body.active,
      std: req.body.std    
   };

   var promise = User.create(data);

   promise
      .then(function() {
         res.status(200).send('ok');
      })
      .catch(function(err) {
         if (err.message) {
            res.status(400).json(err.message);
         } else {
            res.status(400).send('error');
         }
      })
});

router.put('/:_id', function (req, res) {

   var id = req.params._id;

   var data = {
      email: req.body.email,
      fullname: req.body.fullname,
      name: req.body.name,
      pass: req.body.pass,
      active: req.body.active,
      std: req.body.std    
   };

   var promise = User.findByIdAndUpdate(id, { $set: data }, {runValidators: true}).exec();

   promise
      .then(function() {
         console.log('ok');
         res.status(200).json('Ok');         
      })
      .catch(function(err) {
         if (err.message) {
            res.status(400).json(err.message);
         } else {
            res.status(400).send('error');
         }
      });  
});

router.delete('/:_id', function (req, res) {

   var id = req.params._id;

   var promise = User.remove({_id: id});
   
   promise
      .then(function() {
         res.status(200).json('Ok');         
      })
      .catch(function(err) {
         res.status(400).send(err)
      });
});

module.exports = router;