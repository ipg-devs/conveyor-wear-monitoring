const { Pool } = require('pg');

const DATABASE_URL = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : "postgres://devansisson:01234@127.0.0.1:5432/devansisson"; //"postgres://USERNAME:PASSWORD@HOST:PORT/DB"
const ssl = process.env.NODE_ENV === 'production'

console.log(JSON.stringify({
  databaseURL: DATABASE_URL,
  ssl: ssl
}))

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: ssl
})

module.exports = {
  query: (queryText, params) => pool.query(queryText, params)
}