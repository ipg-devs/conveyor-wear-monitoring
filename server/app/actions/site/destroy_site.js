"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const destroySiteAction = ({
  siteRepo
}) => async id => await siteRepo.destroy(id);

var _default = destroySiteAction;
exports.default = _default;