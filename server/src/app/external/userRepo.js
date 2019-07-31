import db from './sql/db';
import trike from 'trike';

module.exports = () => ({
  getAll: async () => {
    const [err, result] = await trike(() => db.query('SELECT username,id,email,site_id,admin from bwmsusers'))

    if (err) throw err;

    return result.rows;
  },
  getById: async id => {
    const [err, result] = await trike(() => db.query('SELECT username,id,email,site_id,admin FROM bwmsusers WHERE id = $1', [id]));

    if (err) throw err;

    return result.rows;
  },
  getByUsername: async username => {
    const [err, result] = await trike(() => db.query('SELECT salt, password FROM bwmsusers WHERE username = $1', [username]))

    if (err) throw err;

    return result.rows;
  },
  create: async user => {
    const {
      username,
      salt,
      password,
      email,
      site_id,
      admin
    } = user;
    const [insErr] = await trike(() => db.query('INSERT INTO bwmsusers(username,salt,password,email,site_id,admin) VALUES($1,$2,$3,$4,$5,$6);', [username,
      salt,
      password,
      email,
      site_id,
      admin]))

    if (insErr) throw insErr;

    const [err, result] = await trike(() => db.query('SELECT username,id,email,site_id,admin from bwmsusers'))
    if (err) throw err;

    return result.rows;
  },
  edit: async user => {
    const {
      username,
      email,
      site_id,
      admin
    } = user;
    const [updateErr] = await trike(() => db.query('UPDATE bwmsusers SET username = $1, email = $2,site_id = $3, admin = $4;', [username,
      email,
      site_id,
      admin]))

    if (updateErr) throw updateErr;

    const [err, result] = await trike(() => db.query('SELECT username,id,email,site_id,admin from bwmsusers'))
    if (err) throw err;

    return result.rows;
  },
  editPassword: async user => {
    const {
      id,
      salt,
      password,
    } = user;
    const [updateErr] = await trike(() => db.query('UPDATE bwmsusers SET salt = $1, password = $2 WHERE id = $3;', [salt, password, id]))

    if (updateErr) throw updateErr;

    const [err, result] = await trike(() => db.query('SELECT username,id,email,site_id,admin from bwmsusers'))

    if (err) throw err;

    return result.rows;
  },
  destroy: async id => {
    const [deleteErr] = await trike(() => db.query('DELETE FROM bwmsusers WHERE id = $1', [id]))

    if (deleteErr) throw deleteErr;

    const [err, result] = await trike(() => db.query('SELECT username,id,email,site_id,admin from bwmsusers'))

    if (err) throw err;

    return result.rows;
  }
})
