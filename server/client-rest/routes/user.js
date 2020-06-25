"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _trike = _interopRequireDefault(require("trike"));

var _verifyToken = _interopRequireDefault(require("../middleware/verifyToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userRouter = new _express.Router();
userRouter.get("/", _verifyToken.default, async (req, res, next) => {
  const getAllUsers = req.scope.resolve("getAllUsers");
  const [err, result] = await (0, _trike.default)(() => getAllUsers());
  if (err) return next(err);
  return res.json(result);
}).get("/:id", _verifyToken.default, async (req, res, next) => {
  const getUserById = req.scope.resolve("getUserById");
  const [err, result] = await (0, _trike.default)(() => getUserById(req.param.id));
  if (err) return next(err);
  return res.json(result);
}).post("/create", _verifyToken.default, async (req, res, next) => {
  const [e1, createUser] = (0, _trike.default)(() => req.scope.resolve("createUser"));
  if (e1) return next(e1);
  const {
    username,
    password,
    email,
    site_id,
    admin
  } = req.body;
  const [err, result] = await (0, _trike.default)(() => createUser({
    username,
    password,
    email,
    site_id,
    admin
  }));
  if (err) return next(err);
  return res.json(result);
}).post("/update", _verifyToken.default, async (req, res, next) => {
  const updateUser = req.scope.resolve("updateUser");
  const [err, result] = await (0, _trike.default)(() => updateUser(req.body.user));
  if (err) return next(err);
  return res.json(result);
}).post("/update-password", _verifyToken.default, async (req, res, next) => {
  const {
    username,
    newPassword
  } = req.body;
  console.log(req.body);
  const updatePassword = req.scope.resolve("updatePassword");
  const [err, result] = await (0, _trike.default)(() => updatePassword({
    username,
    newPassword
  }));
  console.log(err || "no error");
  if (err) return next({
    message: "Error updating password"
  });
  console.log(result);
  res.send({
    success: true
  });
}).post("/destroy", _verifyToken.default, async (req, res, next) => {
  const destroyUser = req.scope.resolve("destroyUser");
  const {
    id
  } = req.body.userToDelete;
  const [err, result] = await (0, _trike.default)(() => destroyUser(id));
  if (err) return next(err);
  return res.json(result);
});
var _default = userRouter;
exports.default = _default;