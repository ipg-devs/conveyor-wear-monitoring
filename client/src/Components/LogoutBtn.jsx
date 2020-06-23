import React, { useContext } from "react";
import { withRouter } from "react-router";
import { Button } from "@material-ui/core";
import api from "../api";
import { Store } from "../Store";

export default withRouter(props => {
  const { dispatch } = useContext(Store);

  function handleClick() {
    return event => {
      event.preventDefault();
      api
        .logout()
        .then(() =>
          dispatch({
            field: "loggedIn",
            payload: false
          })
        )
    };
  }

  return (
    <Button variant="contained" color="secondary" onClick={handleClick()}>
      Logout
    </Button>
  );
});
