var express = require('express');
var cn = require('../config.json');

var router = express.Router();

var query;
if (cn.dbOption === 'firebase') {
  query = require('../db/firebase/recins');
} else {
  query = require('../db/postgresql/recins');
}

router.use(function timeLog(req, res, next) {
  console.log('Routing invoices at ', new Date().toISOString());
  next();
});

router.get('/', function(req, res) {

  console.log('...getList');
  query.getList()
    .then(function(data) { res.status(200).json(data) })
    .catch(function(err) { res.status(400).send(err) });

});

router.get('/:cod', function(req, res) {

  console.log('...get');
  query.get(req.params.cod)
    .then(function(data) { res.status(200).json(data) })
    .catch(function(err) { res.status(400).send(err) });

});

router.get('/0/reset', function(req, res) {
  
  console.log('...reset');
  query.reset()
    .then(function(data) { res.status(200).json(data) })
    .catch(function(err) { res.status(400).send(err) });
    
});

module.exports = router;