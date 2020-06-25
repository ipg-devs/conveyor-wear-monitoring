"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _trike = _interopRequireDefault(require("trike"));

var _verifyToken = _interopRequireDefault(require("../middleware/verifyToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const siteRouter = new _express.Router();
siteRouter.get("/", _verifyToken.default, async (req, res, next) => {
  const getAllSites = req.scope.resolve("getAllSites");
  const [err, result] = await (0, _trike.default)(() => getAllSites());
  if (err) return next(err);
  return res.json(result);
}).post("/create", _verifyToken.default, async (req, res, next) => {
  const [e, createSite] = (0, _trike.default)(() => req.scope.resolve("createSite"));
  if (e) return next(e);
  const {
    name,
    contact
  } = req.body;
  const [err, result] = await (0, _trike.default)(() => createSite({
    name,
    contact
  }));
  if (err) return next(err);
  return res.json(result);
}).post("/update", _verifyToken.default, async (req, res, next) => {
  const updateSite = req.scope.resolve("updateSite");
  const [err, result] = await (0, _trike.default)(() => updateSite(req.body.Site));
  if (err) return next(err);
  return res.json(result);
}).post("/:id", _verifyToken.default, async (req, res, next) => {
  const destroySite = req.scope.resolve("destroySite");
  const [err, result] = await (0, _trike.default)(() => destroySite(req.param.id));
  if (err) return next(err);
  return res.json(result);
});
var _default = siteRouter;
exports.default = _default;