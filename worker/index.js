const amqp = require('amqplib/callback_api');
const saveMessage = require('./saveMessage')

const CONN_URL =
  process.env.AMQP_URL || "amqp://haeqvhio:v5m73o5450NiHZxYOtbtc2kqNMpFtz7d@shrimp.rmq.cloudamqp.com/haeqvhio";
const BELT_TOPIC = process.env.BELT_TOPIC || 'cloud_conv';

  amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, ch) {
      ch.consume(BELT_TOPIC, function (msg) {
        console.log('RECIEVING MESSAGE FROM '+ BELT_TOPIC);
        saveMessage(msg.content.toString())

      }, { noAck: true }
      );
    });
  });