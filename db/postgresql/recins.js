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