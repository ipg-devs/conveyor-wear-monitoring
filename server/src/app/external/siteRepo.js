const db = require('./sql/db');

module.exports = () => ({
  create: async ({name, contact}) => {
    const {rows} = await db.query('INSERT INTO bwmssites(name, contact) VALUES($1, $2) RETURNING *', [name, contact])
    return rows;
  },
  destroy: async (id) => {
    await db.query('DELETE FROM bwmssites WHERE id = $1', [id])
    const {rows} = await db.query('SELECT * FROM bwmssites')
    return rows;
  },
  getAll: async () => {
    const {rows} = await db.query('SELECT * FROM bwmssites')
    return rows;
  },
  update: async (site) => {
    const {id, name, created_at, contact} = site;

    const { rows } = await db.query( 'UPDATE bwmssites SET name = $1, contact = $2 WHERE id = $3 RETURNING *', [name, contact, id])

    return rows;
  }
})

