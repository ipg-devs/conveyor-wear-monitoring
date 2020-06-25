"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("../../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createUserAction = ({
  userRepo,
  saltHashPassword
}) => async ({
  username,
  password,
  email,
  site_id,
  admin
}) => {
  const {
    salt,
    hash: hashPassword
  } = saltHashPassword({
    password
  });
  const user = {
    username,
    salt,
    password: hashPassword,
    email,
    site_id,
    admin
  };

  const [err, result] = _user.default.validate(user);

  if (err) {
    throw err;
  }

  return await userRepo.create(result);
};

var _default = createUserAction;
exports.default = _default;