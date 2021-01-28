import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
  },
}));

export default function Loading({ open }) {
  const classes = useStyles();

  return (
    <Box className={classes.root} display={open ? "block" : "none"}>
      <LinearProgress color="secondary" />
    </Box>
  );
}
