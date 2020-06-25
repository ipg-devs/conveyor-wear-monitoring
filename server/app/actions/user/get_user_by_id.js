"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const getUserByIdAction = ({
  userRepo
}) => async id => await userRepo.getById(id);

var _default = getUserByIdAction;
exports.default = _default;