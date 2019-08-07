module.exports = {
  db: require('./db'),
  createBWMSMessages: require('./createBWMSMessages'),
  createBWMSSiteTable: require('./createBWMSSiteTable'),
  createBWMSUserTable: require('./createBWMSUserTable'),
  seedUserWithAdmin: require('./seedUserWithAdmin'),
  seedSite: require('./seedSite'),
  checkForSeeds: require('./checkForSeeds')
};
