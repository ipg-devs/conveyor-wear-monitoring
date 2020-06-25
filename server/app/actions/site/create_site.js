"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _site = _interopRequireDefault(require("../../models/site"));

var _assert = require("assert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createSiteAction = ({
  siteRepo
}) => async ({
  name,
  contact
}) => {
  const [err, result] = _site.default.validate({
    name,
    contact
  });

  if (err) throw err;
  return await siteRepo.create(result);
};

var _default = createSiteAction;
exports.default = _default;