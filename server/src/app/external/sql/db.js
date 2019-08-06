const { Pool } = require('pg');



const pool = process.env.ENV === "produciton" ? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
}) : new Pool({
  connectionString: "postgres://devansisson:01234@127.0.0.1:5432/devansisson",
});

module.exports = {
  query: (queryText, params) => pool.query(queryText, params)
}