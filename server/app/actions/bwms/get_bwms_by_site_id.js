"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const getBWMSBysiteIdAction = ({
  bwmsRepo
}) => async ids => await bwmsRepo.getDataByIds(ids);

var _default = getBWMSBysiteIdAction;
exports.default = _default;