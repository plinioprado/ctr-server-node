const { Pool } = require('pg');
const connectionString = process.env.APP_PG_CONNECTIONSTRING;

const pool = new Pool({
  connectionString: connectionString,
})

exports.get = () => {

  return pool.query('SELECT * FROM "ctr001"."configs";')
    .then(res => { return res.rows[0] })
    .catch(err => { throw err });

}

exports.reset = () => {

  var query1 = 'DELETE FROM "ctr001"."configs";';

  var json = require('../json/config');  
  var query2 = 'INSERT INTO "ctr001"."configs" (entity_name, entity_cod, entity_shortname, active) VALUES ($1, $2, $3, $4);';
  var values2 = [json.config.entity.name, json.config.entity.cod, json.config.entity.shortname, json.config.active];

  return pool.query(query1)
    .then(pool.query(query2, values2))
    .then(res => { return 'ok' })
    .catch(err => { throw err });

}

