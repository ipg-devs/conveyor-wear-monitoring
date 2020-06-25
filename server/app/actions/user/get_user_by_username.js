"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const getUserByUsernameAction = ({
  userRepo
}) => async username => await userRepo.getByUsername(username);

var _default = getUserByUsernameAction;
exports.default = _default;