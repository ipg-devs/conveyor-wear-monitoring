import React, { useState, useContext } from "react";
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
  Typography
} from "@material-ui/core";

import { Store } from "../Store";
import TimeStamp from "../Components/TimeStamp";
import SiteContact from "../Components/SiteContact";
import CreateSite from "../Components/CreateSite";

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

const SitePanel = () => {
  const { state } = useContext(Store);
  const { sites } = state;
  const classes = useStyles();
  const [expanded, setExpanded] = useState("0");
  const [addModal, setAddModal] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const toggleAddModal = toggleTo => setAddModal(toggleTo);


  return (
    <div className={classes.root}>
      <h1>Sites</h1>
      {sites.map(site => (
        <ExpansionPanel
          key={site.id}
          expanded={expanded === site.id}
          onChange={handleChange(site.id)}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${site.id}bh-content`}
            id={`panel${site.id}bh-header`}
          >
            <Typography variant="h6" className={classes.heading}>
              {site.name} - {site.id}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            style={{ display: "flex", flexDirection: "column" }}
          >
            <SiteContact contact={site.contact} />

            <Typography>
              date created: <TimeStamp>{site.createdDate}</TimeStamp>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}

      <Fab
        color="primary"
        aria-label="Add Site"
        className={classes.fab}
        onClick={() => setAddModal(true)}
      >
        <AddIcon />
      </Fab>

      <Modal open={addModal}>
        <Card className={classes.modalBg}>
          <CreateSite toggleAddModal={b => toggleAddModal(b)} />
        </Card>
      </Modal>
    </div>
  );
};

export default SitePanel;
