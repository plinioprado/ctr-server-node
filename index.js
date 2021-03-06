// Dependencies - general
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cn = require('./config.json');
var mongoose = require('mongoose');
var url = require("url");
var cors = require('cors');
var dotenv = require('dotenv');

if (cn.dbOption === 'firebase') require('./db/firebase/connection');

//Dependencies - schemas and routing
var cnf;
var login;
var recins;
var user;

if (cn.dbOption === 'mongo') {
  cnf = require('./routes/mongo/cnf');
  user = require('./routes/mongo/user');
  recins = require('./routes/mongo/recins');
  login = require('./routes/mongo/login');
} else {
  cnf = require('./routes/config');
  user = require('./routes/user');
  recins = require('./routes/recins');
  login = require('./routes/login');
}

var install = require('./routes/mongo/install');

// Db connections

var CONNECTIONSTRING;
mongoose.Promise = global.Promise;
mongoose.connect(
  cn.mongooseConnectionString,
  {
    useNewUrlParser: true
  },
  function (err, res) {
    useNewUrlParser: true
    if (err) console.log('Error when connecting to Mongodb');
  }
);
var db = mongoose.connection;

// Express
var app = express();
app.use(cors());
app.disabled('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
dotenv.config();

// Login
app.use(function (req, res, next) {
  var p = url.parse(req.path).pathname;
  var token = null;
  if (cn.loginStd === 0) {
    // No validation
    token = cn.token;
  } else if (cn.loginStd === 1) {
    // Validates token in header
    token = req.headers.authorization;
  } else if (cn.loginStd === 2) {
    // Validate token in cookie
    token = req.cookies.token;
  }
  if ( p !== '/api/login' && p !== '/api/install' && token !== cn.token) {
    res.status(400).json('no token');  
  }
  next(); 
});


// Routing
app.get('/', function (req, res) { res.status(404).send('invalid') });
app.use('/api/cnf', cnf);
app.use('/api/login', login);
app.use('/api/recins', recins);
app.use('/api/invoice', recins);
app.use('/api/user', user);
app.use('/api/install', install);

// Run
app.listen(cn.serverPort, function() {
  console.log('Server using ' + cn.dbOption + ' running on localhost:' + cn.serverPort);
});