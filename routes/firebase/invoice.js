// Dependencies
const express = require('express')
const bodyParser = require('body-parser')
var fbqueries = require('../../db/firebase/fbqueries')

// Routes

const router = express.Router()


router.get('/', function(req, res) {
  
  const promise = new Promise((resolve, reject) => {
      try {
        const data = fbqueries.getInvoices()
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })

  promise
    .then(value => res.status(200).json(value))
    .catch(error => res.status(400).json(error))

})


router.get('/:id', function(req, res) {
  
  const promise = new Promise((resolve, reject) => {
      try {
        if (!req.params.id) throw 'invalid id'
        const data = fbqueries.getInvoice(req.params.id)
        resolve(data)
      } catch (error) {
        reject(error)
      }
    });

  promise
    .then(value => res.status(200).json(value))
    .catch(error => res.status(400).json(error))

})

module.exports = router