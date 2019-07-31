import crypto from "crypto";

const stripAuthInfoFromUser = user => ({
  id: user["id"],
  username: user["username"],
  site_id: user["site_id"],
  admin: user["admin"],
  email: user["email"]
});

const stripAuthInfo = store => store.map(user => stripAuthInfoFromUser(user));

const saltPassword = ({ password }) => {
  const salt = crypto.randomBytes(4).toString("hex");
  const hash = crypto.createHmac("sha512", salt).update(password);
  return {
    salt,
    hash: hash.digest("hex")
  };
};

export default function () {
  const newId = () => crypto.randomBytes(18).toString("hex");
  let store = [
    {
      id: 1,
      username: "admin",
      email: "email@notdomain.com",
      salt: "1335628d",
      password:
        "67b20c4266eb7dbb1b28e7b0f0dbd1562669aa6faef2f04fe988f4c6106ffc05a3f21d91381a774002c930beb450bf90675221ec645466b990bc985243c54423", //admin
      site_id: ["0", "1", "2"],
      admin: true
    },
    {
      id: 2,
      username: "Mick",
      email: "email@notdomain.com",
      salt: "47a283bb",
      password:
        "4a950dd4bff8fe9a66dcac61da50bf73236044afb768f485f3426d7661e270db93f8bdf2a61503f8235597637c6ccdf208e6a88f02fcae1dca5aa8013df77043",
      site_id: ["1"],
      admin: false
    },
    {
      id: 3,
      username: "Perry",
      email: "email@notdomain.com",
      salt: "992e5568",
      password:
        "5c91073551ca3ececa489677a0223a276fe165c5a79304c9ba38370e88e2128347fcef9b2bf0a7352f9afa6f0864fa53a20cf7ea0b84f5d70e10405de1d3edb9",
      site_id: ["2"],
      admin: false
    },
    {
      id: 4,
      username: "Devan",
      email: "email@notdomain.com",
      salt: "2d54ca02",
      password:
        "b8e36d796246a2d900def3c8ce3fa37c959fcae44be7a5560cc4132e656922258bfb016a0b87a767b600254f3585b6fcc4b65a0a7a0a4c8a87803e063922704a",
      site_id: ["0", "2"],
      admin: true
    }
  ];

  return {
    getAll: () => stripAuthInfo(store),
    getById: id => {
      console.log(`THIS IS THE ID:
       ${id }`);
      const user = stripAuthInfoFromUser(
        store.filter(user => user.id === parseInt(id, 10))
      );
      console.log(`THIS IS THE USER: 
      ${JSON.stringify(user) }`);
      return user;
    },
    getByUsername: username => {
      const user = store.filter(user => user.username == username)[0]; // not striping because this is not called from client
      console.log(`THIS IS THE USER: ${ JSON.stringify(user) }`);
      return user;
    },
    create: user => {
      const id = newId();
      store.push({ id: id, ...user });
      return stripAuthInfo(store);
    },
    destroy: id => stripAuthInfo(store.filter(user => user.id != id)),
    edit: user => {
      store = store.reduce((users, currUser) => {
        if (currUser.id == user.id) {
          currUser = user;
        }
        users.push(currUser);
        return users;
      }, []);

      console.log(JSON.stringify(store));
      return stripAuthInfo(store);
    }
  };
}
