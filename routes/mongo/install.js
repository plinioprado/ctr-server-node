var express = require('express');
var router = express.Router();

var cn = require('../../config');
var Cnf = require('../../db/mongo/cnf');
var Recins = require('../../db/mongo/recins');
var User = require('../../db/mongo/user');

router.use(function timeLog(req, res, next) {
  console.log('Routing install in mongo at ', new Date().toISOString());
  next();
});

var cb0 = function (req, res, next) {

  console.log('Reinstalling '+ cn.mongooseConnectionString);

  Recins
   .remove()
   .exec(console.log('recins cleared'));

  User
   .remove()
   .exec(console.log('user cleared'));

  next();
}

var cbCnf = function (req, res, next) {

  console.log('Config reset');
  Cnf.reset();

   next();
}
      
var cbRecins = function (req, res, next) {

   var data = [
         {
            cod: '1',
            dt: new Date('2016-01-02'),
            val: 1000,
            cp: {
               cod: '001',
               name: 'Alpha Services Ltd.',
               address: {
                  addr: '201-111 Main Street', 
                  city: 'Vancouver',
                  state: 'BC',
                  zip: 'A1A 1A1',
                  country: 'Canada'
               }
            },
            std: 'nfs',
            txt: 'Test',
            recList: [
               {
                  val: 1000,
                  dtdue: new Date('2016-02-2')
               }
            ]
         },
         {
            cod: '2',
            dt: new Date('2016-01-03'),
            val: 1500,
            cp: {
               cod: '002',
               name: 'Beta Industries Inc.',
               address: {
                  addr: '202 Main Street', 
                  city: 'Vancouver',
                  state: 'BC',
                  zip: 'A1A 1A1',
                  country: 'Canada'
               }
            },
            std: 'nfs',
            txt: 'Test2',
            recList: [
               {
                  val: 1000,
                  dtdue: new Date('2016-02-03')
               }
            ]
         },         {
            cod: '3',
            dt: new Date('2016-01-05'),
            val: 800,
            cp: {
               cod: '001',
               name: 'Alpha Services Ltd.',
                address: {
                  addr: '201-111 Main Street', 
                  neigh: 'Downtown',
                  city: 'Vancouver',
                  state: 'BC',
                  zip: 'A1A 1A1',
                  country: 'Canada'
              }
            },
            std: 'nfs',
            txt: 'Test3',
            recList: [
               {
                  val: 400,
                  dtdue: new Date('2016-02-05')
               },
               {
                  val: 400,
                  dtdue: new Date('2016-03-05')
               }
            ]
         },

      ];


    var promise = Recins.create(data);

    promise
      .then(function() {
        console.log('recins. ok');
      })
      .catch(function(err) {
        if (err.message) {
          console.log('recins error ' + err);
        } else {
          console.log('recins error');
        }
      })

   next();
}

var cbUser = function (req, res, next) {

   var array = [
      {
         "name" : "Super",
         "email" : "super@immaginare.com.br",
         "pass" : "123456",
         "active" : true,
         "std" : "super",
         "fullname" : "Suporte"
      },
      {
         "name" : "John",
         "email" : "john@example.com",
         "pass" : "123456",
         "active" : true,
         "std" : "user",
         "fullname" : "John Smith"
      },
      {
         "name" : "Mary",
         "email" : "mary@example.com",
         "pass" : "123456",
         "active" : true,
         "std" : "user",
         "fullname" : "Mary Smith"
      }
   ];

   User
      .create(array, function() {
         console.log('user ok');
      });

   next();
}

var cb = function (req, res) {
  res.status(200).send('ok');
}

router.get('/', [cb0, cbCnf, cbUser, cbRecins, cb]);


module.exports = router;

