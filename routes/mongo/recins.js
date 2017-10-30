var express = require('express');
var router = express.Router();

var Recins = require('../../db/mongo/recins');

router.use(function timeLog (req, res, next) {
   console.log('Routing recins in mongo at ', new Date().toISOString());
   next();
});

router.delete('/:cod', function (req, res) {

  console.log('...delete');

   var cod = req.params.cod;

   var promise = Recins.remove({cod: cod});
   
   promise
      .then(function() { res.status(200).json('Ok') })
      .catch(function(err) { res.status(400).send(err) });
});

router.get('/', function(req, res) {

  console.log('...get');
   
  try {
    var query = {};
    var dt = {};
    if (req.query.dt0) dt.$gte = new Date(req.query.dt0);
    if (req.query.dtn) dt.$lte = new Date(req.query.dtn);
    if (Object.keys(dt).length !== 0) query.dt = dt;
  } catch(err) {
      res.status(400).send(err);
  }

  var promise = Recins
    .find(query)
    .sort({'cod': 1})
    .select('cod cp dt val')
    .exec();

  promise
    .then(function(list) {
      res.status(200).json(list);
    })
    .catch(function(err) {
      res.status(400).send(err);
    });

});

router.get('/:cod', function(req, res) {

   console.log('...getOne');

   if (req.params.cod == 0) {

      var recins = new Recins();
      var data = {
         cod: '',
         cp: recins.cp,
         dt: recins.dt,
         val: recins.val,
         std: recins.std,
         recList: [
         {
            dtDue:recins.dt,
            val: recins.val
         }]
      };

      res.status(200).json(data);

   } else {

      var promise = Recins
        .findOne({cod: req.params.cod},'-_id cod cp dt val std recList')
        .exec();

      promise
        .then(function(recins) { res.status(200).json(recins) })
        .catch(function(err) { res.status(400).send(err) });
   }
});

router.post('/', function (req, res) {

   console.log('...post');

   var data = {
      cod: req.body.cod,
      cp: req.body.cp,
      dt: req.body.dt,
      val: req.body.val,
      std: req.body.std,
      recList: req.body.recList
      };

   var promise = Recins.create(data);

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

router.put('/:cod', function (req, res) {

   console.log('...put');
   
   var cod = req.params.cod;
   var data = {
      cp: req.body.cp,
      dt: req.body.dt,
      val: req.body.val,
      std: req.body.std,
      recList: req.body.recList
      };

   var promise = Recins
      .findOneAndUpdate({cod: cod}, { $set: data }, {runValidators: true})
      .exec();

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

module.exports = router;