"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("../../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authenticateUserAction = ({
  userRepo,
  saltHashPassword
}) => async ({
  username,
  password
}) => {
  const user = await userRepo.getByUsername(username);
  if (!user) throw 'Error during authentication check credentials';
  const {
    salt,
    password: userPassword
  } = user;
  const {
    hash
  } = saltHashPassword({
    password,
    salt
  });
  return {
    success: hash == userPassword
  };
};

var _default = authenticateUserAction;
exports.default = _default;