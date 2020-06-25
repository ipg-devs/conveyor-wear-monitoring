"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _trike = _interopRequireDefault(require("trike"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async (req, res, next) => {
  console.log("verifying token....");
  const [tokenErr, token] = (0, _trike.default)(() => req.headers.authorization.split(" ")[1]);

  if (tokenErr) {
    console.error(`ERROR: ${tokenErr.message}`);
    return next(tokenErr);
  }

  const [err, result] = await (0, _trike.default)(() => _jsonwebtoken.default.verify(token, process.env.JWT_SECRET));
  if (err) return next({
    status: 401,
    message: "invalid token"
  });
  console.log(`token verified`);
  next();
};

exports.default = _default;