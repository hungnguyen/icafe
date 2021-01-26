import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Snackbar, Paper, Slide } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loading: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  snackbar: {
    width: "40%",
    margin: "0 auto",
  },
}));

export default function Loading({ open }) {
  const classes = useStyles();
  const slideTransition = (props) => {
    return <Slide {...props} direction="down" />;
  };
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={open}
      TransitionComponent={slideTransition}
      className={classes.snackbar}
    >
      <Paper className={classes.loading}>
        <CircularProgress size={30} />
      </Paper>
    </Snackbar>
  );
}
