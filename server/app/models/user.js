"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _superstruct = require("superstruct");

var _isEmail = _interopRequireDefault(require("is-email"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const struct = (0, _superstruct.superstruct)({
  types: {
    email: value => (0, _isEmail.default)(value),
    id: value => "string" === typeof value || "number" === typeof value
  }
});

var _default = struct({
  id: 'id?',
  username: 'string',
  salt: 'string',
  email: 'email',
  password: 'string',
  site_id: 'array',
  admin: 'boolean'
}, {
  admin: false
});

exports.default = _default;