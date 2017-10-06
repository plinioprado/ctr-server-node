// Dependencies - general
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cn = require('./config.json');
var mongoose = require('mongoose');
var url = require("url");

//Dependencies - schemas
var Cnf = require('./db/mongo/cnf');
var Recins = require('./db/mongo/recins');
var User = require('./db/mongo/user');

//Dependencies - routing
var cnf = require('./routes/mongo/cnf');
var login = require('./routes/mongo/login');
var recins = require('./routes/mongo/recins');
var user = require('./routes/mongo/user');
var install = require('./routes/mongo/install');

// Mongo
mongoose.Promise = global.Promise;
mongoose.connect(
  cn.mongooseConnectionString,
  {
    useMongoClient: true
  },
  function (err, res) {
  useMongoClient: true
    if (err) console.log('Error when connecting to Mongodb');
  }
);
var db = mongoose.connection;

// Express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disabled('x-powered-by');

// Routing
app.use(cookieParser());
app.use(function (req, res, next){
  if (cn.login) {
   var p = url.parse(req.path).pathname;
   if (
      p.substr(0,5) == '/api/' &&
      p != '/api/login' &&
      p != '/api/install' &&
      req.cookies.token != cn.token &&
      cn.login
    ) {
      res.status(400).json('no token');  
   } else {
      next();      
   }    
  }

});
app.get('/', function (req, res) { res.status(404).send('invalid') });
app.use('/api/cnf', cnf);
app.use('/api/login', login);
app.use('/api/recins', recins);
app.use('/api/user', user);
app.use('/api/install', install);

// Run
app.listen(cn.serverPort, function() {
  console.log('Server running on localhost:' + cn.serverPort);
});