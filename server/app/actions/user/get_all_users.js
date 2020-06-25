"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const getAllUsersAction = ({
  userRepo
}) => async () => await userRepo.getAll();

var _default = getAllUsersAction;
exports.default = _default;