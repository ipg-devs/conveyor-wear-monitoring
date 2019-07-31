import jwt from "jsonwebtoken";
import trike from "trike";

const login = ({ authenticateUser }) => async user => {
  const [err, result] = await trike(() => authenticateUser(user));

  if (err) throw err;
  if (!result.success) {
    let error = new Error("user not authenticated!");
    error.status = 401;
    throw error;
  }

  return await jwt.sign({ user: user.username }, process.env.JWT_SECRET, {
    expiresIn: "10h"
  });
};

export default login;
