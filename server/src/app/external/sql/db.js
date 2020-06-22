const { Pool } = require('pg');

const poolConfig = {
  connectionString: process.env.DATABASE || 'postgres://ioshifqnkenvwd:095066a3e3ebe4b8fd6b71ebceb39d40f082476c648f23fbd5ce5d7e15acd8d7@ec2-107-20-185-16.compute-1.amazonaws.com:5432/dbefauv94j0ar',
  ssl: true
}

const pool = new Pool(poolConfig);
module.exports = {
  query: (queryText, params) => pool.query(queryText, params)
}