// Dependencies
const express = require('express')
const bodyParser = require('body-parser')
var fbqueries = require('../../db/firebase/fbqueries')

// Routes

const router = express.Router()

router.use(function timeLog (req, res, next) {
  console.log('Routing config in Firebase at ', Date.now());
  next();
});

router.get('/', function(req, res) {
  
  const promise = new Promise((resolve, reject) => {
      try {
        const data = fbqueries.getConfig()
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })

  promise
    .then(value => res.status(200).json(value))
    .catch(error => res.status(400).json(error))

})

module.exports = router;