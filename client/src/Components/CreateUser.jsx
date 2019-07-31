import React, { useEffect, useState, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  MenuItem,
  TextField,
  FormGroup,
  Fab,
  Input,
  Icon,
  Chip,
  Select,
  InputLabel,
  FormControlLabel,
  Checkbox,
  FormControl
} from "@material-ui/core";

import api from "../api";
import { Store } from "../Store";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

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

const CreateUser = ({ toggleAddModal }) => {
  const { state, dispatch } = useContext(Store);
  const { sites } = state;
  const classes = useStyles();
  const theme = useTheme();

  const [site, setSite] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    api.getAllSites().then(data => dispatch({ field: "sites", payload: data }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    const submitSites = sites.reduce((acc, curr) => {
      if (site.includes(curr.name)) {
        acc.push(curr.id);
      }

      return acc;
    }, []);
    return api
      .createNewUser({ ...values, admin, site_id: submitSites })
      .then(users =>
        dispatch({
          field: "users",
          payload: users
        })
      )
      .then(() => toggleAddModal(false))
      .catch(console.log);
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const toggleAdmin = () => event => (admin ? setAdmin(false) : setAdmin(true));

  const handleSelectChange = event => {
    setSite(event.target.value);
  };

  function getStyles(name, site, theme) {
    return {
      fontWeight:
        site.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium
    };
  }

  return (
    <div style={ { maxWidth: 800 } }>
      <form className={ classes.container } noValidate autoComplete="off">
        <div
          style={ {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline"
          } }
        >
          <Typography
            variant="h5"
            color="primary"
            className={ classes.modalTitle }
          >
            Create User
          </Typography>
          <Fab
            color="secondary"
            aria-label="Close"
            onClick={ () => toggleAddModal(false) }
          >
            <Icon>close_icon</Icon>
          </Fab>
        </div>
        <TextField
          id="outlined-name"
          label="Username"
          className={ classes.textField }
          value={ values.Username }
          onChange={ handleChange("username") }
          margin="normal"
          variant="outlined"
          placeholder="John Doe"
        />
        <TextField
          id="outlined-email-input"
          label="Email"
          className={ classes.textField }
          onChange={ handleChange("email") }
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          className={ classes.textField }
          onChange={ handleChange("password") }
          type="password"
          margin="normal"
          variant="outlined"
        />

        <FormGroup row className={ classes.formGroup }>
          <FormControl className={ classes.formControl }>
            <InputLabel htmlFor="select-sites-chip">Sites</InputLabel>
            <Select
              multiple
              value={ site }
              onChange={ handleSelectChange }
              input={ <Input id="select-sites-chip" /> }
              renderValue={ selected => (
                <div className={ classes.chips }>
                  { selected.map(value => (
                    <Chip key={ value } label={ value } className={ classes.chip } />
                  )) }
                </div>
              ) }
              MenuProps={ MenuProps }
            >
              { sites.map(({ name }) => (
                <MenuItem
                  key={ name }
                  value={ name }
                  style={ getStyles(name, site, theme) }
                >
                  { name }
                </MenuItem>
              )) }
            </Select>
          </FormControl>

          <FormControlLabel
            value={ values.admin }
            control={ <Checkbox color="primary" /> }
            onChange={ toggleAdmin() }
            label="Admin"
            labelPlacement="start"
            style={ { marginTop: 12, marginLeft: "auto", marginRight: 16 } }
          />
        </FormGroup>
        <Button
          className={ classes.submitButton }
          color="primary"
          variant="contained"
          onClick={ () => handleSubmit() }
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateUser;
