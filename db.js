const Pool = require('pg').Pool;

const pool = new Pool({
  user :"ferdy",
  password : "873801",
  host : 'localhost',
  port : 5432,
  database : "perntodo"
})

module.exports = pool;
