"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const getAllSitesAction = ({
  siteRepo
}) => async () => await siteRepo.getAll();

var _default = getAllSitesAction;
exports.default = _default;