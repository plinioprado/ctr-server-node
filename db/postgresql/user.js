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

    var query1 = 'DELETE FROM "ctr001"."users";';
  
    var json = require('../json/user');  
    var query2 = 'INSERT INTO "ctr001"."users" (name, email, pass, active, std, fullname) VALUES ';
    for (i = 0; i < json.user.length; i++) {
      query2 += '(\'';
      query2 += json.user[i].name + '\',\'';
      query2 += json.user[i].email + '\',\'';
      query2 += json.user[i].pass + '\',';
      query2 += json.user[i].active + ',\'';
      query2 += json.user[i].std + '\',\'';
      query2 += json.user[i].fullname + '\')';
      if (i < json.user.length -1)query2 += ','
    }
    query2 += ';';

    console.log(query2);
    
    return pool.query(query1)
    .then(res => pool.query(query2))
      .then(res => { return 'ok' })
      .catch(err => { throw err });
  
  }