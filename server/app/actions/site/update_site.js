"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _site = _interopRequireDefault(require("../../models/site"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const updateSiteAction = ({
  siteRepo
}) => async editedSite => {
  const [err, result] = _site.default.validate({
    editedSite
  });

  if (err) throw err;
  return await siteRepo.update(result);
};

var _default = updateSiteAction;
exports.default = _default;