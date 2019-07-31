import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Store } from "../Store";

import Controls from "./Controls";

const useStyles = makeStyles(theme => ({
  topBar: {
    display: "flex",
    justifyContent: "space-between"
  },
  links: {
    textDecoration: "none"
  }
}));

function TopBar() {
  const { state } = useContext(Store);
  const { loggedIn, loggedInUser } = state;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar className={classes.topBar}>
            <Typography variant="h6" color="primary">
              {loggedIn ? loggedInUser.username : "BWMS Dashboard"}
            </Typography>

          {loggedIn ? <Controls /> : ""}
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default TopBar;
