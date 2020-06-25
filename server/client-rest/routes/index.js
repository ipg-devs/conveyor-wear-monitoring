"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _bwms = _interopRequireDefault(require("./bwms"));

var _user = _interopRequireDefault(require("./user"));

var _site = _interopRequireDefault(require("./site"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const apiRouter = new _express.Router();
apiRouter.use("/bwms", _bwms.default).use("/user", _user.default).use("/site", _site.default);
var _default = apiRouter;
exports.default = _default;