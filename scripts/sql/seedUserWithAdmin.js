const trike = require("trike");

module.exports = async db =>
  await trike(() =>
    db.query(`
  INSERT INTO bwmsuser(username,admin,email,salt,password,site_id)
  VALUES(
    "admin",
    true,
    "admin@ipgbelts.com",
    "1335628d",
    "67b20c4266eb7dbb1b28e7b0f0dbd1562669aa6faef2f04fe988f4c6106ffc05a3f21d91381a774002c930beb450bf90675221ec645466b990bc985243c54423",
    "{0}"
  );`));
