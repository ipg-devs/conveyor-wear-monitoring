import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  TextField,
  Fab,
  Icon,
} from "@material-ui/core";

import api from "../api";
import { Store } from "../Store";

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
  formControl: {
    minWidth: 300,
    maxWidth: 500,
    marginLeft: 16
  },
  formGroup: {
    marginTop: 8
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  menu: {
    width: 200
  },
  adminCheckbox: {
    marginLeft: 32
  },
  submitButton: {
    marginTop: 32,
    marginLeft: "auto"
  }
}));

const CreateSite = ({ toggleAddModal }) => {
  const { dispatch } = useContext(Store);
  const classes = useStyles();

  const [values, setValues] = useState({
    sitename: "",
    siteContactName: "",
    siteContactPhone: "",
    siteStreetAddress: "",
    sitesCityAndStateAddress: ""
  });

  useEffect(() => {
    api.getAllSites().then(data => dispatch({ field: "sites", payload: data }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    const {
      sitename,
      siteContactName,
      siteContactPhone,
      siteStreetAddress,
      sitesCityAndStateAddress
    } = values;

    return api
      .createNewSite({
        name: sitename,
        contact: {
          person: siteContactName,
          phone: siteContactPhone,
          address: {
            street: siteStreetAddress,
            cityAndState: sitesCityAndStateAddress
          }
        }
      })
      .then(console.log)
      .then(() => toggleAddModal(false))
      .catch(console.log);
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };


  return (
    <div style={{ maxWidth: 800 }}>
      <form className={classes.container} noValidate autoComplete="off">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline"
          }}
        >
          <Typography
            variant="h5"
            color="primary"
            className={classes.modalTitle}
          >
            Create Site
          </Typography>
          <Fab
            color="secondary"
            aria-label="Close"
            onClick={() => toggleAddModal(false)}
          >
            <Icon>close_icon</Icon>
          </Fab>
        </div>
        <TextField
          id="outlined-site-name"
          label="Site Name"
          className={classes.textField}
          value={values.sitename}
          onChange={handleChange("sitename")}
          margin="normal"
          variant="outlined"
        />

        <Typography variant="h6" color="primary" className={classes.modalTitle}>
          Contact
        </Typography>
        <TextField
          id="outlined-site-contact-name"
          label="Site Contact Name"
          className={classes.textField}
          value={values.siteContactName}
          onChange={handleChange("siteContactName")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-site-contact-Phone"
          label="Site Contact Phone"
          className={classes.textField}
          value={values.siteContactPhone}
          onChange={handleChange("siteContactPhone")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-site-street-address"
          label="Site Street address"
          className={classes.textField}
          value={values.siteStreetAddress}
          onChange={handleChange("siteStreetAddress")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-site-city-and-state-address"
          label="Site City And State"
          className={classes.textField}
          value={values.sitesCityAndStateAddress}
          onChange={handleChange("sitesCityAndStateAddress")}
          margin="normal"
          variant="outlined"
        />

        <Button
          className={classes.submitButton}
          color="primary"
          variant="contained"
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateSite;
