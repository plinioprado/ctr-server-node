var express = require('express');
var router = express.Router();

router.use(function timeLog (req, res, next) {
  console.log('Routing config at ', Date.now());
  next();
});

router.get('/', function (req, res) {
  res.send('get config');
});

router.post('/', function (req, res) {
  res.send('posting config');
});

module.exports = router