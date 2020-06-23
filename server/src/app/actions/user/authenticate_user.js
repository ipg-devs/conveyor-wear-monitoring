import User from "../../models/user";

const authenticateUserAction = ({ userRepo, saltHashPassword }) => async ({
  username,
  password
}) => {
  const user = await userRepo.getByUsername(username);
  if(!user) throw 'Error during authentication check credentials';
  const { salt, password: userPassword } = user;
  const { hash } = saltHashPassword({ password, salt });

  return { success: hash == userPassword };
};

export default authenticateUserAction;
