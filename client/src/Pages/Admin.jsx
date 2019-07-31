import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";
import { Container, Button } from "@material-ui/core";
import UserPanel from "../Layout/UserPanel";
import SitePanel from "../Layout/SitePanel";
import { Store } from "../Store";
import api from "../api";
import { LoadingModal } from "../Components/Loading";

const useStyles = makeStyles(theme => ({
  button: {
    width: "100%",
    marginBottom: "8px"
  },
  root: {
    display: "flex"
  },
  links: {
    textDecoration: "none"
  },
  linklist: {
    minWidth: "100px"
  }
}));

const Admin = ({ history, enqueueSnackbar }) => {
  const { state, dispatch } = useContext(Store);
  const { loading } = state;
  const classes = useStyles();
  const [selected, setSelected] = useState("users");

  useEffect(() => {
    dispatch({
      field: "loading",
      payload: true
    });

    Promise.all([api.getAllUsers(), api.getAllSites()])
      .then(([users, sites]) => {
        dispatch({ field: "users", payload: users });
        dispatch({ field: "sites", payload: sites });
      })
      .then(() => {
        dispatch({
          field: "loading",
          payload: false
        });
      })
      .catch(() => {
        history.push("/");
        enqueueSnackbar("Session Timed Out", {
          variant: "error",
          preventDuplicate: true
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (e, topic) => {
    e.preventDefault();
    setSelected(topic);
  };

  return (
    <Container
      style={{ maxWidth: 1400, minHeight: 800, padding: 16, margin: "0 auto" }}
      className={classes.root}
    >
      <LoadingModal open={loading} />
      <Container
        style={{
          maxWidth: "200px",
          display: "flex",
          flexDirection: "column",
          padding: "81px 0px 0px 0px",
          margin: "0px 16px 0px 0px"
        }}
      >
        <Button
          color="primary"
          variant={selected === "users" ? "contained" : "outlined"}
          className={classes.button}
          onClick={e => handleClick(e, "users")}
        >
          Users
        </Button>
        <Button
          color="primary"
          variant={selected === "sites" ? "contained" : "outlined"}
          className={classes.button}
          onClick={e => handleClick(e, "sites")}
        >
          Sites
        </Button>
      </Container>
      {selected === "users" ? <UserPanel /> : <SitePanel />}
    </Container>
  );
};

export default withSnackbar(withRouter(Admin));
