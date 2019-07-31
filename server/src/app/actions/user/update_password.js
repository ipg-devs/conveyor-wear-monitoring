import User from "../../models/user";
import trike from "trike";

const updateUserAction = ({ userRepo, saltHashPassword, authenticateUser }) => async ({
  username,
  newPassword
}) => {
  const oldUser = await userRepo.getByUsername(username);

  console.log(JSON.stringify(oldUser));

  const { id, site_id, admin, email } = oldUser;

  const { salt, hash: hashPassword } = saltHashPassword({
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

  const [err, result] = User.validate(user);

  if (err) {
    throw err;
  }

  const [errEditPasword, users] = await trike(() => userRepo.editPassword(result));

  if (errEditPasword) throw errEditPasword;

  if (authenticateUser({username, password: newPassword})) {
    return users;
  } else {
    const [errRevertPasword, users] = await trike(() => userRepo.editPassword(oldUser));

  }
};

export default updateUserAction;
