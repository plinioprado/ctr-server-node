const { Pool } = require('pg');
const connectionString = process.env.APP_PG_CONNECTIONSTRING;

const pool = new Pool({
  connectionString: connectionString,
})

exports.getList = () => {

  return pool.query('SELECT * FROM "ctr001"."users";')
    .then(res => { return res.rows })
    .catch(err => { throw err });

}

exports.get = (id) => {
  
  return pool.query('SELECT * FROM "ctr001"."users" WHERE id = $1;', [id])
    .then(res => { return res.rows[0] })
    .catch(err => { throw err });

}