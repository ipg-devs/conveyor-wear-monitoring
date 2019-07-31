export default function() {
  const newId = () => crypto.randomBytes(18).toString("hex");

  let store = [
    {
      id: "0", // this is not generated for test so we know what it is.
      name: "Utah",
      createdDate: new Date(),
      contact: {
        person: "Steve",
        address: {
          street: "123 Any Street",
          cityAndState: "AnyTown, UT"
        }
      }
    },
    {
      id: "1",
      name: "Kentucky",
      createdDate: new Date(),
      contact: {
        person: "Steve",
        address: {
          street: "123 Any Street",
          cityAndState: "AnyTown, KY"
        }
      }
    },
    {
      id: "2",
      name: "Ohio",
      createdDate: new Date(),
      contact: {
        person: "Steve",
        address: {
          street: "123 Any Street",
          cityAndState: "AnyTown, OH"
        }
      }
    }
  ];

  return {
    getAll: () => store,
    create: site => {
      store.push({ id: newId(), ...site });
      return store;
    },
    destroy: id => {
      store = store.filter(site => site.id != id);
      return store;
    },
    edit: site => {
      store = store.reduce((sites, currSite) => {
        if (currSite.id == site.id) {
          currSite = site;
        }
        sites.push(currSite);
        return sites;
      }, []);
      return store;
    }
  };
}
