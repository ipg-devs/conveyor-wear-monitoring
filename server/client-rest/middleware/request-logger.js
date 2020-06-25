"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// TIMESTAMP METHOD ROUTE
var _default = (req, res, next) => {
  console.log(`${Date.now()}     ${req.method.padEnd(6)} ${req.path}`);
  next();
};

exports.default = _default;