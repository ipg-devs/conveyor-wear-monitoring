const { Pool } = require('pg');

const pool = new Pool({
  connectionString:
    "postgres://phukzmrltlgtro:ed49456f5b7df5675d186dc4e79e369bbae0f4fc0bb3f3843ca09f36fce618cb@ec2-54-159-138-67.compute-1.amazonaws.com:5432/ddm2ebtcjrije0",
    ssl: true
});

module.exports = {
  query: (queryText, params) => pool.query(queryText, params)
}