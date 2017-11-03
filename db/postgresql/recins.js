const { Pool } = require('pg');
const connectionString = process.env.APP_PG_CONNECTIONSTRING;

const pool = new Pool({
  connectionString: connectionString,
})

function jsonToObj(json) {
  return {
    num: json.num,
    dt: json.dt,
    val: json.val,
    cp: {
      cod: json.cp_cod,
      name: json.cp_name,
      address: {
        addr: json.cp_address_addr,
        neigh: json.cp_address_neigh,
        city: json.cp_address_city,
        state: json.cp_address_state,
        zip: json.cp_address_zip
      },
    },
    std: json.std,
    recList: JSON.parse(json.recList)
  }
};

exports.getList = () => {

  return pool.query('SELECT * FROM "ctr001"."recins";')
    .then(res => res.rows.map(item => jsonToObj(item)))
    .catch(err => { throw err });

}

exports.get = (num) => {
  
  return pool.query('SELECT * FROM "ctr001"."recins" WHERE num = $1;', [num])
    .then(res => { return res.rows[0] })
    .catch(err => { throw err });

}

exports.reset = () => {

      var query1 = 'DELETE FROM "ctr001"."recins";';
    
      var json = require('../json/recins');

      var query2 = 'INSERT INTO "ctr001"."recins" (cod, dt, val, cp_cod, cp_name, cp_address_addr, cp_address_neigh, cp_address_city, cp_address_state, cp_address_zip, std, txt, recList) VALUES ';      
      for (i = 0; i < json.recins.length; i++) {
        query2 += '(\'';
        query2 += json.recins[i].cod + '\',\'';
        query2 += json.recins[i].dt + '\',';
        query2 += json.recins[i].val + ',\'';
        query2 += json.recins[i].cp.cod + '\',\'';
        query2 += json.recins[i].cp.name + '\',\'';
        query2 += json.recins[i].cp.address.addr + '\',\'';
        query2 += json.recins[i].cp.address.neigh + '\',\'';
        query2 += json.recins[i].cp.address.city + '\',\'';
        query2 += json.recins[i].cp.address.state + '\',\'';
        query2 += json.recins[i].cp.address.zip + '\',\'';
        query2 += json.recins[i].std + '\',\'';
        query2 += json.recins[i].txt + '\',\'';
        query2 += JSON.stringify(json.recins[i].recList) + '\')';
        if (i < json.recins.length -1)query2 += ','
      }
      query2 += ';';
      
      return pool.query(query1)
      .then(res => pool.query(query2))
        .then(res => { return 'ok' })
        .catch(err => { throw err });
    
    }

