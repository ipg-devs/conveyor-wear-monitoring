import jwt from "jsonwebtoken";
import trike from "trike";

const login = ({ authenticateUser, userRepo }) => async user => {
  const [err, result] = await trike(() => authenticateUser(user));

  if (err) throw err;
  if (!result.success) {
    let error = new Error("user not authenticated!");
    error.status = 401;
    throw error;
  }

  const [userErr, userRes] = await trike(() => userRepo.getUserInfoByUsername(user))

  const token = await jwt.sign({ user: user.username }, process.env.JWT_SECRET, {
    expiresIn: "10h"
  });

  return {
    user: userRes,
    token
  };
};

export default login;
