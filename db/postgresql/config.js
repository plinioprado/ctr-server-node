const { Pool } = require('pg');
const connectionString = process.env.APP_PG_CONNECTIONSTRING;

const pool = new Pool({
  connectionString: connectionString,
})

exports.getList = () => {

  console.log('will do');

  return pool.query('SELECT * FROM information_schema.tables;')
    .then(res => {
      console.log('res', res);
      return res.rows;
    })
    .catch(err => {
      console.log(err, err);
      throw err
    });

}
