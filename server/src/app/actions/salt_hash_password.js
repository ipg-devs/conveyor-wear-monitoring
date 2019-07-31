import crypto from "crypto";

export default function saltHashPassword() {
  return ({ password, salt = randomString() }) => {
    const hash = crypto.createHmac("sha512", salt).update(password);
    return {
      salt,
      hash: hash.digest("hex")
    };
  };
}

function randomString() {
  return crypto.randomBytes(4).toString("hex");
}
