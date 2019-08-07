const { db,
  createBWMSMessages,
  createBWMSSiteTable,
  createBWMSUserTable,
  seedUserWithAdmin,
  seedSite,
  checkForSeeds } = require('./sql');

(async function () {
  const [errCreatingMessagesTable] = createBWMSMessages(db);
  if (errCreatingMessagesTable) {
    console.error(`ERROR: creating messages table: 
    ${errCreatingMessagesTable }`)

    throw errCreatingMessagesTable;
  }

  const [errCreatingBWMSSiteTable] = createBWMSSiteTable(db);
  if (errCreatingBWMSSiteTable) {
    console.error(`ERROR: creating site table: 
    ${errCreatingBWMSSiteTable }`)

    throw errCreatingBWMSSiteTable;
  }

  const [errCreatingUserTable] = createBWMSUserTable(db);
  if (errCreatingUserTable) {
    console.error(`ERROR: creating messages table: 
    ${errCreatingUserTable }`)

    throw errCreatingUserTable;
  }

  const [userSeedNotFound, seedUsername] = checkForSeeds.user(db);

  if (userSeedNotFound) {
    const [errSeedingUser] = seedUserWithAdmin(db);

    if (errSeedingUser) {
      console.error(`ERROR: seeding user table with admin msg: ${ errseedingUser }`)

      throw errseedingUser;
    }
  }

  console.log(`SEED username is ${ seedUsername }`)

  const [siteSeedNotFound, seedSite] = checkForSeeds.site(db)

  if (siteSeedNotFound) {
    const [errSeedingSite] = seedSite(db);

    if (errSeedingSite) {
      console.error(`ERROR: seeding site table with ipg msg: ${ errSeedingSite }`)

      throw errSeedingSite;
    }
  }


})()