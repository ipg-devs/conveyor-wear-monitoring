import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import { sentenceCase, titleCase } from "change-case";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";
import api from "../api";

import { LoadingModal } from "../Components/Loading";
import Cell, { wearDepths } from "../Components/Cell";
import { Store } from "../Store";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

const TablePage = ({ history, enqueueSnackbar }) => {
  const { state, dispatch } = useContext(Store);
  const { tableRows, tableColumns, tableOrder, loading, loggingOut, loggedInUser } = state;

  useEffect(() => {
    if (loggingOut) return history.push("/");
    dispatch({
      field: "loading",
      payload: true
    });
    api
      .getTableData(loggedInUser.site_id)
      .then(async data => {
        await dispatch({
          field: "tableRows",
          payload: data
        });
        await dispatch({
          field: "loading",
          payload: false
        });
      })
      .catch((err) => {
        enqueueSnackbar("Session Timed Out", {
          variant: "error",
          preventDuplicate: true
        });
        history.push("/");
        dispatch({
          field: "loggedIn",
          payload: null
        });
        dispatch({
          field: "loading",
          payload: false
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();
  return (
    <Container style={{ maxWidth: 1500, padding: 16, margin: "0 auto" }}>
      <LoadingModal open={loading} />

      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {tableColumns.map(col => (
                <TableCell key={col}>
                  {wearDepths.includes(col)
                    ? col
                    : titleCase(sentenceCase(col))}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map((row, i) => (
              <TableRow key={i}>
                {tableOrder.map(col => (
                  <TableCell key={`${col}${i}`}>
                    <Cell variant={col} value={row[col]} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default withSnackbar(withRouter(TablePage));
