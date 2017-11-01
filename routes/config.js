var express = require('express');
var router = express.Router();

//var Config = require('../db/mongo/cnf');
var query = require('../db/postgresql/config');

router.use(function timeLog (req, res, next) {
  console.log('Routing config at ', new Date().toISOString());
  next();
});

router.get('/', function (req, res) {
  
    console.log('...get');
  
    query.getList()
      .then(function(data) {
        console.log('data in routing', data);
        res.status(200).json(data) })
      .catch(function(err) {
        console.log('err in routing', err);
        res.status(400).send(err) });
  
  });

module.exports = router;