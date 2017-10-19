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
* dbOption: 'firebase' or 'mongo' (default 'mongo')
* mongooseConnectionString: 'mongodb://localhost/example'
* token: '123321'
* login: true

## Tests

1. Run using Test script
```shell
$ npm run test
```
1. Open about:inspect in Chrome
1. Click the "Open dedicated DevTools for Node" link.

The default db will be Mongo, unless dbOption in the config.json is set to 'firebase'.

# Some troubleshooting

* Mongo doesn't run
1. $ pgrep mongo
1. $ kill processId // where processId is the return in the first command

## Contribution ##

* Any suggestion or info request to:
   plinio.prado@immaginare.com.br