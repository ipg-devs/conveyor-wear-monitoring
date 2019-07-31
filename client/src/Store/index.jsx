import React, { useReducer } from "react";
export const Store = React.createContext();

function haveSessionToken() {
  const token = localStorage.getItem("token");

  return token ? token : false;
}

function checkAdmin() {
  const admin = localStorage.getItem("admin");

  return admin === "lion" ? true : false;
}

const initialState = {
  loading: false,
  loggingOut: false,
  loggedIn: haveSessionToken(),
  loggedInUser: {
    admin: checkAdmin()
  },
  tableData: {
    columns: [
      "Timetamp",
      "Site Id",
      "Target",
      "Revolutions",
      "Hours",
      "1/16",
      "1/8",
      "1/4",
      "Location",
      "Tracking",
      "Note",
      "Event"
    ],
    rows: [
      {
        Timetamp: "--/--/----",
        "Site Id": 0,
        Target: 0,
        Revolutions: 0,
        Hours: 0,
        "1/16": "yellow",
        "1/8": "yellow",
        "1/4": "yellow",
        Location: [
          "yellow",
          "yellow",
          "yellow",
          "yellow",
          "yellow",
          "yellow",
          "yellow",
          "yellow",
          "yellow",
          "yellow",
          "yellow",
          "yellow",
          "yellow",
          "yellow",
          "yellow",
          "yellow"
        ],
        Tracking: "n/a",
        Note: "n/a",
        Event: "n/a"
      }
    ]
  },
  users: [],
  sites: []
};

function reducer(state, action) {
  return { ...state, [action.field]: action.payload };
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <Store.Provider value={value}>
      {props.children /* eslint-disable-line react/prop-types */}
    </Store.Provider>
  );
}
