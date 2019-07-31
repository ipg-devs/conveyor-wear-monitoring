import jwt from "jsonwebtoken";
import trike from "trike";

export default async (req, res, next) => {
  console.log("verifying token....");
  const [tokenErr, token] = trike(
    () => req.headers.authorization.split(" ")[1]
  );

  if (tokenErr) {
    console.error(`ERROR: ${tokenErr.message}`);
    return next(tokenErr);
  }
  const [err, result] = await trike(() =>
    jwt.verify(token, process.env.JWT_SECRET)
  );

  if (err) return next({ status: 401, message: "invalid token" });

  console.log(`token verified`);
  next();
};
