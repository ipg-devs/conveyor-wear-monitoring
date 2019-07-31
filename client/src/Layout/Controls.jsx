import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import LogoutBtn from "../Components/LogoutBtn";
import { Store } from "../Store";

const ControllerWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const useStyles = makeStyles(theme => ({
  links: {
    textDecoration: "none",
    paddingRight: "8px"
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export default function ControlledExpansionPanels() {
  const classes = useStyles();
  const { state } = useContext(Store);
  const { loggedInUser } = state;
  return (
    <ControllerWrapper>
      <Link to={"/dashboard"} className={classes.links}>
        <Button color="primary" className={classes.button}>
          BWMS Dashboard
        </Button>
      </Link>
      {loggedInUser.admin ? (
        <Link to={"/admin"} className={classes.links}>
          <Button color="primary" className={classes.button}>
            admin
          </Button>
        </Link>
      ) : (
        ""
      )}
      <LogoutBtn />
    </ControllerWrapper>
  );
}
