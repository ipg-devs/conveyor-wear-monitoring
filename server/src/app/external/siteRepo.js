import db from './sql/db';
import trike from 'trike';
import moment from 'moment';

module.exports = () => ({
  create: async ({ name, contact }) => {
    const [createErr] = await trike(() => db.query('INSERT INTO bwmssites(name, contact, created_at) VALUES($1, $2, to_timestamp($3))', [name, contact, moment().unix()]))

    if (createErr) throw createErr;

    const [err, { rows }] = await trike(() => db.query('SELECT * FROM bwmssites'))

    if (err) throw err;
    return rows;
  },
  destroy: async (id) => {
    const [err] = await trike(() => db.query('DELETE FROM bwmssites WHERE id = $1', [id]))

    if (err) throw err;

    const [e, { rows }] = await trike(() => db.query('SELECT * FROM bwmssites'))

    if (e) throw e;

    return rows;
  },
  getAll: async () => {
    const [err, { rows }] = await trike(() => db.query('SELECT * FROM bwmssites'))

    if (err) throw err;
    return rows;
  },
  update: async (site) => {
    const { id, name, created_at, contact } = site;

    const [err, { rows }] = await trike(() => db.query('UPDATE bwmssites SET name = $1, contact = $2 WHERE id = $3 RETURNING *', [name, contact, id]))

    if (err) throw err;
    return rows;
  }
})

