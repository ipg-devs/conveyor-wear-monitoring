"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const getAllBWMSAction = ({
  bwmsRepo
}) => async () => await bwmsRepo.getAllData();

var _default = getAllBWMSAction;
exports.default = _default;