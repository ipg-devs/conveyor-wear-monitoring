import User from "../../models/user";

const updateUserAction = ({ userRepo }) => async editedUser => {
  const [err, result] = User.validate(editedUser);

  if (err) throw err;

  return await userRepo.edit(result);
};

export default updateUserAction;
