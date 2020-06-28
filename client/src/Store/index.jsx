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
    admin: checkAdmin(),
  },
  tableOrder: [
    "timestamp",
    "siteid",
    "section",
    "target",
    "revolutions",
    "hours",
    "sixteenth",
    "eigth",
    "quarter",
    "location",
    "tracking",
    "note",
    "event",
  ],
  tableColumns: [
    "Timestamp",
    "Site Id",
    "Section",
    "Target",
    "Revolutions",
    "Hours",
    "1/16",
    "1/8",
    "1/4",
    "Location",
    "Tracking",
    "Note",
    "Event",
  ],
  tableRows: [],
  users: [],
  sites: [],
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
