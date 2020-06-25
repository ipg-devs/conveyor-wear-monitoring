"use strict";

const db = require('./sql/db');

const moment = require('moment');

module.exports = () => ({
  getDataByIds: async ids => {
    const {
      rows
    } = await db.query('SELECT message from bwmsmessages ORDER BY timestamp DESC');
    return rows.reduce((flatArray, objectRow) => {
      if (ids.indexOf(objectRow.message.siteid) > -1) {
        flatArray.push(objectRow.message);
      }

      return flatArray.splice(0, 10);
    }, []);
  },
  getAllData: async () => {
    const {
      rows
    } = await db.query('SELECT message from bwmsmessages');
    return rows.reduce((flatArray, objectRow) => {
      flatArray.push(objectRow.message);
      return flatArray;
    }, []);
  },
  deleteData: async () => await db.query('DELETE FROM bwmsmessages WHERE id > 0')
});