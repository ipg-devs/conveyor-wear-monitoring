export default function() {
  let store = [
    {
      timestamp: new Date(),
      site_id: 0,
      target: "1", // string
      revolutions: "18,567", // string
      hours: 891, // number
      "1/16": "green", // string "green" or "red"
      "1/8": "green", // string "green" or "red"
      "1/4": "green", // string "green" or "red"
      location: [
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green"
      ], // [string] "green" or "yellow" or "red"
      tracking: "n/a", // string
      note: "", // string
      event: "" // string
    },
    {
      timestamp: new Date(),
      site_id: 0,
      target: "2", // string
      revolutions: "18,567", // string
      hours: 891, // number
      "1/16": "red", // string "green" or "red"
      "1/8": "green", // string "green" or "red"
      "1/4": "green", // string "green" or "red"
      location: [
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "red",
        "red",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green"
      ], // [string] "green" or "yellow" or "red"
      tracking: "n/a", // string
      note: "", // string
      event: "" // string
    },
    {
      timestamp: new Date(),
      site_id: 0,
      target: "3", // string
      revolutions: "18,567", // string
      hours: 891, // number
      "1/16": "red", // string "green" or "red"
      "1/8": "red", // string "green" or "red"
      "1/4": "green", // string "green" or "red"
      location: [
        "green",
        "green",
        "red",
        "green",
        "green",
        "red",
        "red",
        "red",
        "red",
        "red",
        "red",
        "green",
        "green",
        "red",
        "green",
        "green"
      ], // [string] "green" or "yellow" or "red"
      tracking: "n/a", // string
      note: "50% Worn", // string
      event: "ALARM!" // string
    },
    {
      timestamp: new Date(),
      site_id: 0,
      target: "4", // string
      revolutions: "500", // string
      hours: 20, // number
      "1/16": "green", // string "green" or "red"
      "1/8": "green", // string "green" or "red"
      "1/4": "green", // string "green" or "red"
      location: [
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green",
        "green"
      ], // [string] "green" or "yellow" or "red"
      tracking: "n/a", // string
      note: "", // string
      event: "" // string
    }
  ];

  return {
    getAll: () => store,
    getById: id => {
      return store.filter(data => data.site_id != id);
    },
    create: dataEntry => {
      store.push(dataEntry);
      return store;
    }
  };
}
