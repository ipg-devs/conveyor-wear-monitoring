const db = require('./sql/db');
const moment = require('moment');

module.exports = () => ({
  getDataByIds: async (site_ids) => {
    const { rows } = await db.query('SELECT message from bwmsmessages WHERE timestamp > to_timestamp($1)', [moment().subtract(15, 'minutes').unix()])

    if (site_ids) {
      return rows.reduce((acc, curr) => {
        if (site_ids.includes(curr.message.site_id)) {
          acc.push(curr.message)
        }

        return acc;
      }, [])
    }

    return rows;
  },
  getAllData: async () => {
    const { rows } = await db.query('SELECT message from bwmsmessages WHERE timestamp > to_timestamp($1)', [moment().subtract(15, 'minutes').unix()]);
    return rows;
  },
  deleteData: async () => await db.query('DELETE FROM bwmsmessages WHERE id > 0')
})
