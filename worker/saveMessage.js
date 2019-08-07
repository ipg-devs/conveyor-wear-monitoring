const { Client } = require('pg');
const trike = require('trike');
const moment = require('moment');

module.exports = message => {
  const [err, client] = trike(() => process.env.NODE_ENV === "produciton" ? new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }) : new Client({
    connectionString: "postgres://devansisson:01234@127.0.0.1:5432/devansisson",
  });

  if (err) {console.log(err); throw err}
  
  client.connect();
  
  client.query('INSERT INTO bwmsmessages(message,timestamp,site_id) VALUES($1, to_timestamp($2), $3);', [message, moment(JSON.parse(message).timestamp).unix(), JSON.parse(message).siteid], (err, res) => {
    if (err) throw err;
    client.end();
  });
};