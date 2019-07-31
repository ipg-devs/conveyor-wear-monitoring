import React, { useContext, useRef } from "react";
import { withSnackbar } from "notistack";
import { Container, Paper, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import api from "../api";
import { Store } from "../Store";
import { Loading } from "../Components/Loading";

const useStyles = makeStyles(theme => ({
  login: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 500,
    margin: "0 auto"
  },
  loginBox: {
    marginTop: 128,
    padding: 16
  },
  loginBtn: {
    marginTop: 16
  }
}));

function Login(props) {
  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const { loading } = state;

  const handleSubmitLogin = event => {
    event.preventDefault();
    dispatch({
      field: "loading",
      payload: true
    });
    api
      .login(usernameRef.current.value, passwordRef.current.value)
      .then(res => {
        props.enqueueSnackbar("Successful login!", {
          variant: "success"
        });
        return res;
      })
      .then(({ token, user }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("admin", (user.admin ? "lion": "cheese"));
        dispatch({
          field: "loggedIn",
          payload: token
        });
        dispatch({
          field: "loggedInUser",
          payload: user
        });
      })
      .then(() => props.history.push("/dashboard"))
      .catch(err => {
        console.log(err);
        props.enqueueSnackbar("Error logging in", {
          variant: "error"
        });
        dispatch({
          field: "loading",
          payload: false
        });
      });
  };

  if (state.loggedIn) {
    props.history.push("/dashboard");
    return null;
  }

  return (
    <Container className={classes.login}>
      <Paper className={classes.loginBox}>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <h1>Login</h1>
            <form>
              <TextField
                id="username"
                label="Username"
                margin="normal"
                inputRef={usernameRef}
                variant="outlined"
              />
              <TextField
                id="password-input"
                label="Password"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
                inputRef={passwordRef}
              />
            </form>
          </div>
        )}
        <Button
          variant="contained"
          color="primary"
          disabled={loading ? true : false}
          className={classes.loginBtn}
          onClick={event => handleSubmitLogin(event)}
        >
          Login
        </Button>
      </Paper>
    </Container>
  );
}

export default withSnackbar(Login);
