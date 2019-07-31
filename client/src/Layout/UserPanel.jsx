import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Card,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Fab,
  Modal,
  Typography,
  Button
} from "@material-ui/core";
import CreateUser from "../Components/CreateUser";
import ChangePassword from "../Components/ChangePassword";
import { Store } from "../Store";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    textAlign: "left",
    position: "relative"
  },
  fab: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2)
  },
  heading: {
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  modalBg: {
    maxWidth: "500px",
    margin: "auto",
    [theme.breakpoints.down("sm")]:{
      marginTop: "16px"
    },
    [theme.breakpoints.up("md")]:{
      marginTop:"50px"
    },
    [theme.breakpoints.up("lg")]:{
      marginTop:"100px"
    },
    padding: "32px"
  },
  modalFAB: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1)
  }
}));

const UserPanel = ({ enqueueSnackbar, history }) => {
  const { state } = useContext(Store);
  const { users, sites } = state;
  const [expanded, setExpanded] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

  const classes = useStyles();

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const toggleAddModal = toggleTo => setAddModal(toggleTo);
  const togglePasswordModal = toggleTo => setPasswordModal(toggleTo);

  return (
    <div className={classes.root}>
      <h1>Users</h1>
      {users.map(user => (
        <ExpansionPanel
          key={user.id}
          expanded={expanded === user.username}
          onChange={handleChange(user.username)}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${user.id}bh-content`}
            id={`panel${user.id}bh-header`}
          >
            <Typography variant="h6" className={classes.heading}>
              {user.username}
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {user.admin ? "Admin" : ""}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Typography>
              sites:{" "}
              {sites
                .reduce((acc, curr) => {
                  if (user.site_id.includes(curr.id)) acc.push(curr.name);

                  return acc;
                }, [])
                .join(", ")}
            </Typography>
            <Typography>email: {user.email}</Typography>
            <Button
              variant="outlined"
              color="primary"
              style={{
                width: "200px",
                marginTop: "16px",
                marginLeft: "auto"
              }}
              onClick={() => togglePasswordModal(true)}
            >
              Change Password
            </Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}

      <Fab
        color="primary"
        aria-label="Add"
        className={classes.fab}
        onClick={() => toggleAddModal(true)}
      >
        <AddIcon />
      </Fab>
      <Modal open={addModal}>
        <Card className={classes.modalBg}>
          <CreateUser toggleAddModal={b => toggleAddModal(b)} />
        </Card>
      </Modal>

      <Modal open={passwordModal}>
        <Card className={classes.modalBg}>
          <ChangePassword username={expanded} togglePasswordModal={(b) => togglePasswordModal(b)}/>
        </Card>
      </Modal>
    </div>
  );
};

export default withSnackbar(withRouter(UserPanel));
