"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("../../models/user"));

var _trike = _interopRequireDefault(require("trike"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const updateUserAction = ({
  userRepo,
  saltHashPassword,
  authenticateUser
}) => async ({
  username,
  newPassword
}) => {
  const oldUser = await userRepo.getByUsername(username);
  console.log(JSON.stringify(oldUser));
  const {
    id,
    site_id,
    admin,
    email
  } = oldUser;
  const {
    salt,
    hash: hashPassword
  } = saltHashPassword({
    password: newPassword
  });
  const user = {
    username,
    id,
    site_id,
    admin,
    email,
    salt,
    password: hashPassword
  };

  const [err, result] = _user.default.validate(user);

  if (err) {
    throw err;
  }

  const [errEditPasword, users] = await (0, _trike.default)(() => userRepo.editPassword(result));
  if (errEditPasword) throw errEditPasword;

  if (authenticateUser({
    username,
    password: newPassword
  })) {
    return users;
  } else {
    const [errRevertPasword, users] = await (0, _trike.default)(() => userRepo.editPassword(oldUser));
  }
};

var _default = updateUserAction;
exports.default = _default;