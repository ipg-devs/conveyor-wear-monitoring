"use strict";

var _db = _interopRequireDefault(require("./sql/db"));

var _trike = _interopRequireDefault(require("trike"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = () => ({
  create: async ({
    name,
    contact
  }) => {
    const [createErr] = await (0, _trike.default)(() => _db.default.query('INSERT INTO bwmssites(name, contact, created_at) VALUES($1, $2, to_timestamp($3))', [name, contact, (0, _moment.default)().unix()]));
    if (createErr) throw createErr;
    const [err, {
      rows
    }] = await (0, _trike.default)(() => _db.default.query('SELECT * FROM bwmssites'));
    if (err) throw err;
    return rows;
  },
  destroy: async id => {
    const [err] = await (0, _trike.default)(() => _db.default.query('DELETE FROM bwmssites WHERE id = $1', [id]));
    if (err) throw err;
    const [e, {
      rows
    }] = await (0, _trike.default)(() => _db.default.query('SELECT * FROM bwmssites'));
    if (e) throw e;
    return rows;
  },
  getAll: async () => {
    const [err, {
      rows
    }] = await (0, _trike.default)(() => _db.default.query('SELECT * FROM bwmssites'));
    if (err) throw err;
    return rows;
  },
  update: async site => {
    const {
      id,
      name,
      created_at,
      contact
    } = site;
    const [err, {
      rows
    }] = await (0, _trike.default)(() => _db.default.query('UPDATE bwmssites SET name = $1, contact = $2 WHERE id = $3 RETURNING *', [name, contact, id]));
    if (err) throw err;
    return rows;
  }
});