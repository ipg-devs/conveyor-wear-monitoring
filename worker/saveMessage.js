const { Client } = require('pg');
const trike = require('trike');
const moment = require('moment');

module.exports = message => {
  const clientConfig = {
    connectionString: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : "postgres://devansisson:01234@127.0.0.1:5432/devansisson"; //"postgres://USERNAME:PASSWORD@HOST:PORT/DB",
    ssl: process.env.NODE_ENV === 'production'
  }

  console.log(JSON.stringify(clientConfig))

  const [err, client] = trike(() => new Client(clientConfig));

  if (err) { console.log(err); throw err }

  client.connect();

  client.query('INSERT INTO bwmsmessages(message,timestamp,site_id) VALUES($1, to_timestamp($2), $3);', [message, moment(JSON.parse(message).timestamp).unix(), JSON.parse(message).siteid], (err, res) => {
    if (err) throw err;
    client.end();
  });
};