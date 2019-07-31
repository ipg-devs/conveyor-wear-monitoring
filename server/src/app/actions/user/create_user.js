import User from "../../models/user";

const createUserAction = ({ userRepo, saltHashPassword }) => async ({
  username,
  password,
  email,
  site_id,
  admin
}) => {
  const {salt, hash: hashPassword } = saltHashPassword({ password })

  const user = {
    username,
    salt,
    password: hashPassword,
    email,
    site_id,
    admin
  }
  const [err, result] = User.validate(user);

  if (err) {
    throw err;
  }

  return await userRepo.create(result);
};

export default createUserAction;
