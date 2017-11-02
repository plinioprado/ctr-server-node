const { Pool } = require('pg');
const connectionString = process.env.APP_PG_CONNECTIONSTRING;

const pool = new Pool({
  connectionString: connectionString,
})

exports.getList = () => {

  var query;
  //query = 'SELECT * FROM information_schema.tables;';
  query = 'SELECT * FROM "ctr001"."configs";';
  console.log('query', query);

  return pool.query(query)
    .then(res => {
      console.log('res', res);
      return res.rows;
    })
    .catch(err => {
      console.log(err, err);
      throw err
    });

}
