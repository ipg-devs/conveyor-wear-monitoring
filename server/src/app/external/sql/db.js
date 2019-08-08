const { Pool } = require('pg');

const poolConfig = process.env.NODE_ENV === 'production' ?
{
  connectionString: process.env.DATABASE_URL,
  ssl: true
} : {
  connectionString: "postgres://devansisson:01234@127.0.0.1:5432/devansisson"
}

const pool = new Pool(poolConfig);

module.exports = {
  query: (queryText, params) => pool.query(queryText, params)
}