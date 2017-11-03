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

exports.reset = () => {
  
    var json = require('../json/user');  
    var query = 'INSERT INTO "ctr001"."users" (name, email, pass, active, std, fullname) VALUES ';
    for (i = 0; i < json.user.length; i++) {
      query += '(\'';
      query += json.user[i].name + '\',\'';
      query += json.user[i].email + '\',\'';
      query += json.user[i].pass + '\',';
      query += json.user[i].active + ',\'';
      query += json.user[i].std + '\',\'';
      query += json.user[i].fullname + '\')';
      if (i < json.user.length -1) query += ','
    }
    query += ';';
    
    return pool.query('TRUNCATE "ctr001"."users";')
      .then(res => pool.query('ALTER SEQUENCE ctr001.users_id_seq RESTART WITH 1;'))
      .then(res => pool.query(query))
      .then(res => { return 'ok' })
      .catch(err => { throw err });
  
  }