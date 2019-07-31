import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  TextField,
  Icon,
  Fab
} from "@material-ui/core";

import api from "../api";
import { withSnackbar } from "notistack";

const useStyles = makeStyles(theme => ({
  modalTitle: {
    paddingLeft: 16
  },
  container: {
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  submitButton: {
    marginTop: 32,
    marginLeft: "auto"
  }
}));

const ChangePassword = ({ togglePasswordModal, username, enqueueSnackbar }) => {
  const [newPassword, setNewPassword] = useState();

  const classes = useStyles();

  const handleSubmit = () => () => {
    if (!newPassword) {
      enqueueSnackbar("Password CANNOT be Empty", {
        variant: "error",
        preventDuplicate: true
      });
      return;
    }
    api
      .updateUserPassword({
        username,
        newPassword
      })
      .then(() => togglePasswordModal(false))
      .catch(err => {
        console.log(err);
        enqueueSnackbar("Error Changing Password", {
          variant: "error",
          preventDuplicate: true
        });
      });
  };

  const handleChange = () => event => {
    setNewPassword(event.target.value);
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <form className={classes.container} noValidate autoComplete="off">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 16
          }}
        >
          <Typography
            variant="h5"
            color="primary"
            className={classes.modalTitle}
          >
            New Password for {username || "no User ID"}
          </Typography>
          <Fab
            color="secondary"
            aria-label="Close"
            onClick={() => togglePasswordModal(false)}
          >
            <Icon>close_icon</Icon>
          </Fab>
        </div>
        <TextField
          id="outlined-password-input"
          label="New Password"
          className={classes.textField}
          onChange={handleChange()}
          type="password"
          margin="normal"
          variant="outlined"
        />
        <Button
          className={classes.submitButton}
          color="primary"
          variant="contained"
          onClick={handleSubmit()}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default withSnackbar(ChangePassword);
