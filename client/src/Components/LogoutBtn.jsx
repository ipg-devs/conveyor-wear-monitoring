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
      dispatch({
        field: "loading",
        payload: true
      });
      api
        .logout()
        .then(data => {
          props.history.push("/");
          return data;
        })
        .then(data =>
          dispatch({
            field: "loggedIn",
            payload: data
          })
        )
        .then(() =>
          dispatch({
            field: "loading",
            payload: false
          })
        );
    };
  }

  return (
    <Button variant="contained" color="secondary" onClick={handleClick()}>
      Logout
    </Button>
  );
});
