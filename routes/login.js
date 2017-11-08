var express = require('express');
var cn = require('../config.json');

var router = express.Router();

var query;
if (cn.dbOption === 'firebase') {
  user = require('../db/firebase/user');
  config = require('../db/firebase/config');
} else if (cn.dbOption === 'postgresql')  {
  user = require('../db/postgresql/user');
  config = require('../db/postgresql/config');
} else {
  user = require('../db/mongo/user');
  config = require('../db/mongo/cnf');
}

router.use(function timeLog (req, res, next) {

  console.log('Routing login in not mongo at ', new Date().toISOString());
  next();
});

router.post('/', function(reg, res) {

  console.log('...login');
  var email = 'john@example.com';
  var pass = '123456';
  
  var userData;
  var configData;
  user.getByLogin(email, pass)
    .then(function(data) {
      userData = data;
      config.get()
        .then(data2 => {
          configData = data2;
        })
        .then(function(data) { res.status(200).json({config: configData, user: userData, token: cn.token }) })
     })
    .catch(function(err) { res.status(400).send(err) });

})

module.exports = router;