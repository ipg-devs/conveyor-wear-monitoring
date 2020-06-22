const { Client } = require('pg');
const trike = require('trike');
const moment = require('moment');

module.exports = message => {
  const clientConfig = {
    connectionString: process.env.DATABASE || 'postgres://ioshifqnkenvwd:095066a3e3ebe4b8fd6b71ebceb39d40f082476c648f23fbd5ce5d7e15acd8d7@ec2-107-20-185-16.compute-1.amazonaws.com:5432/dbefauv94j0ar',
    ssl: true
  }

  const [err, client] = trike(() => new Client(clientConfig));

  if (err) { console.log(err); throw err }

  client.connect();

  client.query('INSERT INTO bwmsmessages(message,timestamp,site_id) VALUES($1, to_timestamp($2), $3);', [message, moment(JSON.parse(message).timestamp).unix(), JSON.parse(message).siteid], (err, res) => {
    if (err) throw err;
    client.end();
  });
};