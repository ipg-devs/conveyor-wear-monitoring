"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _superstruct = require("superstruct");

var _default = (0, _superstruct.struct)({
  id: "string?",
  name: "string",
  contact: "object?"
});

exports.default = _default;