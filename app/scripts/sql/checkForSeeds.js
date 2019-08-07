const trike = require('trike')

exports.user = async db => 
  async trike(() => db.query("SELECT username FROM bwmsusers WHERE username = 'admin'"))


exports.site = async db => 
  async trike(() => db.query("SELECT name FROM bwmssites WHERE name = 'IPG - Murray'"))