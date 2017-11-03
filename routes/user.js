var express = require('express');
var query = require('../db/postgresql/user');

var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Routing user at ', new Date().toISOString());
  next();
});

router.get('/', function(req, res) {

  console.log('...getList');
  query.getList()
    .then(function(data) { res.status(200).json(data) })
    .catch(function(err) { res.status(400).send(err) });

});

router.get('/:id', function(req, res) {
  
  console.log('...get');
  query.get(req.params.id)
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