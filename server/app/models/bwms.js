"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _superstruct = require("superstruct");

const Model = attributes({
  timestamp: Date,
  site_id: Number,
  target: {
    type: String,
    required: true
  },
  // string
  revolutions: {
    type: String,
    required: true
  },
  // number
  hours: {
    type: String,
    required: true
  },
  // number
  "1/16": String,
  // string "green" or "red"
  "1/8": String,
  // string "green" or "red"
  "1/4": String,
  // string "green" or "red"
  location: Array,
  // [string] "green" or "yellow" or "red"
  tracking: String,
  // string
  note: String,
  // string
  event: String // string

})(BWMS);

var _default = (0, _superstruct.struct)({
  timestamp: "date",
  site_id: "any",
  target: "string",
  revolutions: "string",
  hours: "string"
});

exports.default = _default;