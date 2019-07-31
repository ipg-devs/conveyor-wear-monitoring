import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import "./App.css";

import Login from "./Pages/Login";
import Table from "./Pages/Table";
import Admin from "./Pages/Admin";
import { ThemeProvider } from "@material-ui/styles";
import { SnackbarProvider } from "notistack";
import theme from "./theme";
import TopBar from "./Layout/TopBar";
import { StoreProvider, Store } from "./Store";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <TopBar />
            <SnackbarProvider
              autoHideDuration={3000}
              maxSnack={3}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Route path="/" exact component={Login} />
              <PrivateRoute path="/dashboard" component={Table} />
              <PrivateRoute path="/admin" component={Admin} />
            </SnackbarProvider>
          </Router>
        </ThemeProvider>
      </StoreProvider>
    </div>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  const { state } = useContext(Store);
  const { loggedIn } = state;
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default App;
