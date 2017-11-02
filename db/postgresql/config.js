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

// exports.put = (data) => {

//   return pool.query('UPDATE "ctr001"."configs" SET name = $1;', [data.name])
//   .then(res => { return true })
//   .catch(err => { throw err });

// }

