"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("../../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const updateUserAction = ({
  userRepo
}) => async editedUser => {
  const [err, result] = _user.default.validate(editedUser);

  if (err) throw err;
  return await userRepo.edit(result);
};

var _default = updateUserAction;
exports.default = _default;