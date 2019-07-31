const amqp = require('amqplib/callback_api');
const saveMessage = require('./lib/saveMessage')

const CONN_URL = process.env.AMQP_URL;


  amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, ch) {
      ch.consume('cloud_conv', function (msg) {
        console.log('.....');
        saveMessage(msg.content.toString())

      }, { noAck: true }
      );
    });
  });