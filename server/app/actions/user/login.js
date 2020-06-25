"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _trike = _interopRequireDefault(require("trike"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const login = ({
  authenticateUser,
  userRepo
}) => async user => {
  const [err, result] = await (0, _trike.default)(() => authenticateUser(user));
  if (err) throw err;

  if (!result.success) {
    let error = new Error("user not authenticated!");
    error.status = 401;
    throw error;
  }

  const [userErr, userRes] = await (0, _trike.default)(() => userRepo.getUserInfoByUsername(user));
  if (userErr) throw 'check login credentials, user or password are incorrect';
  const token = await _jsonwebtoken.default.sign({
    user: user.username
  }, process.env.JWT_SECRET, {
    expiresIn: "10h"
  });
  return {
    user: userRes,
    token
  };
};

var _default = login;
exports.default = _default;