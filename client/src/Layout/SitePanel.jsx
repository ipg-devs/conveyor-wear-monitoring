import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Fab,
  Typography
} from "@material-ui/core";

import { Store } from "../Store";
import TimeStamp from "../Components/TimeStamp";
import SiteContact from "../Components/SiteContact";

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
  }
}));

const SitePanel = () => {
  const { state } = useContext(Store);
  const { sites, users } = state;
  const classes = useStyles();
  const [expanded, setExpanded] = useState("0");

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
              {site.name}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            style={{ display: "flex", flexDirection: "column" }}
          >
            <SiteContact contact={site.contact} />

            <Typography style={{ marginTop: 16 }}>
              Users at this Site:{" "}
              {users
                .reduce((atSite, user) => {
                  if (user.site_id.includes(site.id)) {
                    atSite.push(user.username);
                  }

                  return atSite;
                }, [])
                .join(", ")}
            </Typography>

            <Typography>
              date created: <TimeStamp>{site.createdDate}</TimeStamp>
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              style={{
                width: "200px",
                marginTop: "16px",
                marginLeft: "auto"
              }}
              onClick={() => console.log("Hello")}
            >
              Say Hello!{" "}
            </Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}

      <Fab
        color="primary"
        aria-label="Add"
        className={classes.fab}
        onClick={() => alert("adding new site!")}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default SitePanel;
