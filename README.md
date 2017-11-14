# Invoice simulator server - Node (Mongo)

This application simulates a simplified portfolio of invoices and their generation of account receivables.

It's the server part of the ctr-invoice-mean project, split so can be connected to other clients and expand to other databases.

As its origin, it can be used as a demo and template of a series of finance applications developped for Immaginare Service clients since 2010.

## Scope

The REST full server application controls:

* Login (suggesting a demo company)
  * 'api/login' (POST)
* Users
  * 'api/users (POST)
* Invoices
  * 'api/recins' (POST)
* Config
  * 'api/config' (POST)
## Stack

Backend

* Node
* Express
* Mongoose
* MongoDb
* Firebase
* cors

## Set up

* If Mongodb not installed, install it

* Download files to the working folder

* Install the application and run Node
```shell
$ npm install
$ node index
```

* Open browser and create default database
```shell
localhost:4000/api/install
```
This url will reset the original database at any time

* Still in the browser, run the application
```shell
localhost:4000
```

## Configuration

Properties and defaults stored in the file config.json:
* serverPort: 4000
* dbOption: can be mongo, (default), 'postgreesl' or 'firebase'
* mongooseConnectionString: 'mongodb://localhost/example'
* token: '123321'
* loginStd: can be '0' (no token, default), '1' (token in param) or '2' (token in cookies)

## Databases

* MongoDb: Local example
* Firebase: In the account
* PostgreeSQL
* Json: for resetting with test data

### MongoDb

Running in the local NodeJS server

Some Troubleshooting 
* Mongo doesn't run
1. $ pgrep 
1. $ kill processId // where processId is the return in the first command

### Firebase

Running read only accorging /db/firebase/firebase.json

Account with the the below security setup at Firebase/RealtimeDatabase/Rules:
```
{
  "rules": {
  ".read": "true",
  ".write": "auth != null"
  }
}
```

### PostgreeSQL

Running for tests as ctr001 in www.immaginareservice.com.br test hosting

Access to be coded in the future

### Json

Available at /db/json/*.json with test data to reset other databases

## Tests

1. Run using Test script
```shell
$ npm run test
```
1. Open about:inspect in Chrome
1. Click the "Open dedicated DevTools for Node" link.

The default db will be Mongo, unless dbOption in the config.json is set to 'firebase'.


## Contribution ##

* Any suggestion or info request to:
   plinio.prado@immaginare.com.br