var express = require('express');
var cn = require('../config.json');

var router = express.Router();

var query;
if (cn.dbOption === 'firebase') {
  query = require('../db/firebase/config');
} else if (cn.dbOption === 'postgresql')  {
  query = require('../db/postgresql/config');
} else {
  query = require('../db/mongo/cnf');
}

router.use(function timeLog(req, res, next) {
  console.log('Routing config at ', new Date().toISOString());
  next();
});

router.get('/', function(req, res) {

  console.log('...get');
  query.get()
    .then(function(data) { res.status(200).json(data) })
    .catch(function(err) { res.status(400).send(err) });
  
});

router.get('/reset', function(req, res) {

  console.log('...reset');
  query.reset()
    .then(function(data) { res.status(200).json(data) })
    .catch(function(err) { res.status(400).send(err) });
  
});

module.exports = router;