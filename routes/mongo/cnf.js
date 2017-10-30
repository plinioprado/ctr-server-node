var express = require('express');
var router = express.Router();

var Config = require('../../db/mongo/cnf');

router.use(function timeLog (req, res, next) {
  console.log('Routing config in mongo at ', new Date().toISOString());
  next();
});

router.get('/', function (req, res) {

  console.log('...get');

  Config.get()
    .then(function(list) { res.status(200).json(list) })
    .catch(function(err) { res.status(400).send(err) });

});

router.get('/reset', function (req, res) {
  console.log('...reset');

  Config.reset()
    .then(function(data) { res.status(200).send(data) })
    .catch(function(err) { res.status(400).send(err) });

});

router.post('/', function (req, res) {
  console.log('...post');
  res.send('post being built');
});

module.exports = router