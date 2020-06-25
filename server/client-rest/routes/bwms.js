"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _trike = _interopRequireDefault(require("trike"));

var _verifyToken = _interopRequireDefault(require("../middleware/verifyToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bwmsRouter = new _express.Router();
bwmsRouter.post("/", _verifyToken.default, async (req, res, next) => {
  const {
    ids
  } = req.body;
  const getBwmsBySiteId = req.scope.resolve("getBwmsBySiteId");
  const [err, result] = await (0, _trike.default)(() => getBwmsBySiteId(JSON.parse(ids)));
  if (err) return next(err);
  return res.json(result);
}).get("/all", _verifyToken.default, async (req, res, next) => {
  const getAllBwms = req.scope.resolve("getAllBwms");
  const [err, result] = await (0, _trike.default)(() => getAllBwms());
  if (err) return next(err);
  return res.json(result);
});
var _default = bwmsRouter;
exports.default = _default;