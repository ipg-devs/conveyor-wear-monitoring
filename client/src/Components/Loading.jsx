import React from "react";
import ReactLoading from "react-loading";
import { Card, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  spinner: {
    margin: "auto"
  },
  loadingModal: {
    margin: "100px auto",
    padding: "32px",
    textAlign: "center",
    maxWidth: "20%"
  },
  loadingCard: {
    textAlign: "center",
    margin: "auto",
    maxWidth: "20%",
    padding: 16
  },
  loadingLabel: {
    marginTop: 32,
    color: "#015f92",
    fontWeight: 900
  }
}));

export const LoadingModal = ({ open, label }) => {
  const classes = useStyles();

  return (
    <Modal open={open}>
      <Card className={classes.loadingModal}>
        <ReactLoading
          type="spinningBubbles"
          color="#0288d1"
          height="50%"
          width="50%"
          className={classes.spinner}
        />
        <div className={classes.loadingLabel}>{label || "LOADING"}</div>
      </Card>
    </Modal>
  );
};

export const Loading = ({ label, height, width }) => {
  const classes = useStyles();

  return (
    <div className={classes.loadingCard}>
      <ReactLoading
        type="spinningBubbles"
        color="#0288d1"
        height="100%"
        width="100%"
      />
      <div className={classes.loadingLabel}>{label || "LOADING"}</div>
    </div>
  );
};

export const LoadingCard = ({ label, className }) => {
  const classes = useStyles();

  return (
    <Card className={classes.loadingCard}>
      <ReactLoading
        type="spinningBubbles"
        color="#0288d1"
        height="50%"
        width="50%"
        className={classes.spinner}
      />
      <div className={classes.loadingLabel}>{label || "LOADING"}</div>
    </Card>
  );
};
