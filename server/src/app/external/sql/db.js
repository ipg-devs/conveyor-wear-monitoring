const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "postgres://devansisson:01234@127.0.0.1:5432/devansisson",
});

module.exports = {
  query: (queryText, params) => pool.query(queryText, params)
}