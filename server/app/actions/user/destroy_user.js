"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const destroyUserAction = ({
  userRepo
}) => async id => await userRepo.destroy(id);

var _default = destroyUserAction;
exports.default = _default;