var express = require('express');
var router = express.Router();

var query = require('../db/postgresql/recins');

router.use(function timeLog(req, res, next) {
 console.log('Routing invoices at ', new Date().toISOString());
 next();
});

router.get('/', function(req, res) {

  console.log('...getList');
  
  query.getList()
    .then(function(data) {
        res.status(200).json(data);
    })
    .catch(function(err) {
      console.log('err in routing', err);
      res.status(400).send(err);
    });

});

router.get('/:num', function(req, res) {

    console.log('...get');

    query.get(req.params.num)
      .then(function(data) {
          res.status(200).json(data);
      })
      .catch(function(err) {
        console.log('err in routing', err);
        res.status(400).send(err);
      });

})

module.exports = router;