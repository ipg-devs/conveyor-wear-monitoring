const trike = require("trike");

const contact = {
  person: "",
  phone: "",
  address: {
    street: "",
    cityAndState: ""
  }

}

module.exports = async db =>
  await trike(() =>
    db.query('INSERT INTO bwmsuser(name,contact) VALUES($1,$2)', ["IPG - Murray", JSON.stringify(contact)]));