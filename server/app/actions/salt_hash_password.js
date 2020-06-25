"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saltHashPassword;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function saltHashPassword() {
  return ({
    password,
    salt = randomString()
  }) => {
    const hash = _crypto.default.createHmac("sha512", salt).update(password);

    return {
      salt,
      hash: hash.digest("hex")
    };
  };
}

function randomString() {
  return _crypto.default.randomBytes(4).toString("hex");
}